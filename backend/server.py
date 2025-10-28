from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend Email Configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SMTP_FROM_EMAIL', 'info@fenjislovakia.eu')
RECIPIENT_EMAIL = os.environ.get('SMTP_TO_EMAIL', 'info@fenjislovakia.eu')

# Initialize Resend
resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Message Models
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=1000)
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Meno nemôže byť prázdne')
        return v.strip()
    
    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        if v is not None and v.strip():
            # International phone number format validation
            # Accepts: +X to +XXX (country code) followed by 4-15 digits
            phone_pattern = r'^\+\d{1,3}\d{4,15}$'
            if not re.match(phone_pattern, v.strip()):
                raise ValueError('Neplatný formát telefónneho čísla. Použite medzinárodný formát (napr. +421912345678)')
            return v.strip()
        return v
    
    @field_validator('message')
    @classmethod
    def validate_message(cls, v):
        if not v.strip():
            raise ValueError('Správa nemôže byť prázdna')
        return v.strip()

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")  # new, read, responded

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Email sending function using Resend
async def send_email_notification(contact_data: ContactMessage):
    """Send email notification when a new contact form is submitted using Resend"""
    try:
        # Create HTML email body
        html_body = f"""
        <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }}
                    .content {{ background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; }}
                    .field {{ margin-bottom: 15px; }}
                    .label {{ font-weight: bold; color: #555; }}
                    .value {{ color: #333; margin-top: 5px; }}
                    .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0; color: #333;">Nová správa z kontaktného formulára</h2>
                        <p style="margin: 5px 0 0 0; color: #666;">FENJI Slovakia s.r.o.</p>
                    </div>
                    
                    <div class="content">
                        <div class="field">
                            <div class="label">Meno:</div>
                            <div class="value">{contact_data.name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value"><a href="mailto:{contact_data.email}">{contact_data.email}</a></div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Telefón:</div>
                            <div class="value">{contact_data.phone if contact_data.phone else 'Neuvedené'}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Správa:</div>
                            <div class="value" style="white-space: pre-wrap;">{contact_data.message}</div>
                        </div>
                        
                        <div class="footer">
                            <p>Dátum prijatia: {contact_data.created_at.strftime('%d.%m.%Y %H:%M:%S')}</p>
                            <p>ID správy: {contact_data.id}</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Send email using Resend
        params = {
            "from": f"FENJI Slovakia <{SENDER_EMAIL}>",
            "to": [RECIPIENT_EMAIL],
            "subject": f"Nová správa z kontaktného formulára - {contact_data.name}",
            "html": html_body,
        }
        
        email = resend.Emails.send(params)
        
        logger.info(f"Email notification sent successfully to {RECIPIENT_EMAIL} via Resend. ID: {email.get('id', 'N/A')}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email notification via Resend: {str(e)}")
        # Don't fail the entire request if email fails
        return False

# Contact Form Endpoints
@api_router.post("/contact")
async def create_contact_message(input: ContactMessageCreate):
    try:
        # Create ContactMessage object
        contact_dict = input.model_dump()
        contact_obj = ContactMessage(**contact_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into MongoDB
        result = await db.contact_messages.insert_one(doc)
        
        logger.info(f"New contact message received from {contact_obj.email}")
        
        # Send email notification (async, don't wait for it to complete)
        try:
            await send_email_notification(contact_obj)
        except Exception as email_error:
            logger.error(f"Email notification failed but message was saved: {str(email_error)}")
        
        return {
            "success": True,
            "message": "Vaša správa bola úspešne odoslaná. Ozveme sa vám čoskoro!",
            "id": contact_obj.id
        }
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail={
            "success": False,
            "message": f"Chyba: {str(e)}"
        })
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail={
            "success": False,
            "message": "Chyba servera. Skúste to prosím znova."
        })

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    try:
        # Exclude MongoDB's _id field from the query results
        messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for msg in messages:
            if isinstance(msg['created_at'], str):
                msg['created_at'] = datetime.fromisoformat(msg['created_at'])
        
        return messages
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail={
            "success": False,
            "message": "Chyba pri načítaní správ"
        })

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()