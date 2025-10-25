# API Contracts - FENJI Slovakia Landing Page

## Backend Implementation Plan

### 1. Mock Data to Replace
**File:** `/app/frontend/src/mock.js`
- `mockContactFormSubmit()` - Contact form submission function
- Currently stores data in localStorage

### 2. MongoDB Schema

**Collection:** `contact_messages`

**Fields:**
```
{
  id: UUID (auto-generated)
  name: String (required)
  email: String (required, validated)
  phone: String (optional)
  message: String (required)
  created_at: DateTime (auto-generated)
  status: String (default: "new") // new, read, responded
}
```

### 3. Backend API Endpoints

#### POST /api/contact
**Purpose:** Submit contact form message

**Request Body:**
```json
{
  "name": "Peter Novák",
  "email": "peter@example.sk",
  "phone": "+421123456789",
  "message": "Dobrý deň, rád by som sa informoval..."
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Vaša správa bola úspešne odoslaná. Ozveme sa vám čoskoro!",
  "id": "uuid-here"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Chyba: Neplatné údaje"
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "message": "Chyba servera. Skúste to prosím znova."
}
```

#### GET /api/contact (Optional - for admin)
**Purpose:** Retrieve all contact messages (for future admin panel)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Peter Novák",
    "email": "peter@example.sk",
    "phone": "+421123456789",
    "message": "Message text...",
    "created_at": "2025-10-25T18:30:00Z",
    "status": "new"
  }
]
```

### 4. Frontend Integration

**File to Update:** `/app/frontend/src/pages/Home.jsx`

**Change:**
- Remove import of `mockContactFormSubmit` from mock.js
- Replace with actual API call to backend

**API Call Example:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    
    if (response.data.success) {
      toast({
        title: "Úspech!",
        description: response.data.message,
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  } catch (error) {
    toast({
      title: "Chyba",
      description: error.response?.data?.message || "Niečo sa pokazilo. Skúste to prosím znova.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### 5. Backend Files to Create/Modify

**New Files:**
- None (using existing server.py)

**Files to Modify:**
- `/app/backend/server.py` - Add ContactMessage model and endpoints

### 6. Validation Rules

**Backend Validation:**
- name: Required, 2-100 characters
- email: Required, valid email format
- phone: Optional, if provided must be valid format (+421...)
- message: Required, 10-1000 characters

### 7. Error Handling

**Backend:**
- Validate all inputs
- Handle MongoDB connection errors
- Return appropriate HTTP status codes

**Frontend:**
- Show user-friendly error messages
- Handle network errors
- Maintain form state on error

### 8. Testing Checklist

- [ ] Backend endpoint accepts valid data
- [ ] Backend validates input correctly
- [ ] Data is saved to MongoDB
- [ ] Frontend successfully calls API
- [ ] Success message displayed to user
- [ ] Form clears after successful submission
- [ ] Error handling works correctly
- [ ] Network error handling works
