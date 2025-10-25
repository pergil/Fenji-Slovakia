#!/usr/bin/env python3
"""
Backend API Testing for FENJI Slovakia Contact Form
Tests the POST /api/contact and GET /api/contact endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://eu-delivery.preview.emergentagent.com/api"

def test_contact_api():
    """Test the contact form API endpoints"""
    print("=" * 60)
    print("TESTING FENJI SLOVAKIA CONTACT FORM API")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print()
    
    test_results = {
        "passed": 0,
        "failed": 0,
        "tests": []
    }
    
    # Test 1: Valid submission with phone
    print("TEST 1: Valid submission with phone")
    print("-" * 40)
    valid_data = {
        "name": "Ján Novák",
        "email": "jan.novak@example.com",
        "phone": "+421901234567",
        "message": "Dobrý deň, potrebujem informácie o preprave tovaru z Bratislavy do Košíc. Ďakujem."
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=valid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "Vaša správa bola úspešne odoslaná" in data.get("message", ""):
                print("✅ PASSED: Valid submission with phone")
                test_results["passed"] += 1
                test_results["tests"].append({"test": "Valid submission with phone", "status": "PASSED"})
            else:
                print("❌ FAILED: Response format incorrect")
                test_results["failed"] += 1
                test_results["tests"].append({"test": "Valid submission with phone", "status": "FAILED", "reason": "Response format incorrect"})
        else:
            print("❌ FAILED: Non-200 status code")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Valid submission with phone", "status": "FAILED", "reason": f"Status code: {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Valid submission with phone", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 2: Valid submission without phone
    print("TEST 2: Valid submission without phone")
    print("-" * 40)
    valid_data_no_phone = {
        "name": "Mária Svobodová",
        "email": "maria.svobodova@example.com",
        "message": "Zdravím, zaujíma ma preprava nábytku. Môžete mi poslať cenník? Ďakujem pekne."
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=valid_data_no_phone, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "Vaša správa bola úspešne odoslaná" in data.get("message", ""):
                print("✅ PASSED: Valid submission without phone")
                test_results["passed"] += 1
                test_results["tests"].append({"test": "Valid submission without phone", "status": "PASSED"})
            else:
                print("❌ FAILED: Response format incorrect")
                test_results["failed"] += 1
                test_results["tests"].append({"test": "Valid submission without phone", "status": "FAILED", "reason": "Response format incorrect"})
        else:
            print("❌ FAILED: Non-200 status code")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Valid submission without phone", "status": "FAILED", "reason": f"Status code: {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Valid submission without phone", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 3: Missing name
    print("TEST 3: Missing name (should fail)")
    print("-" * 40)
    missing_name_data = {
        "email": "test@example.com",
        "message": "This should fail because name is missing."
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=missing_name_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Validation error
            print("✅ PASSED: Missing name correctly rejected")
            test_results["passed"] += 1
            test_results["tests"].append({"test": "Missing name validation", "status": "PASSED"})
        else:
            print("❌ FAILED: Should have returned 422 for missing name")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Missing name validation", "status": "FAILED", "reason": f"Expected 422, got {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Missing name validation", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 4: Invalid email format
    print("TEST 4: Invalid email format (should fail)")
    print("-" * 40)
    invalid_email_data = {
        "name": "Test User",
        "email": "invalid-email-format",
        "message": "This should fail because email format is invalid."
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=invalid_email_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Validation error
            print("✅ PASSED: Invalid email correctly rejected")
            test_results["passed"] += 1
            test_results["tests"].append({"test": "Invalid email validation", "status": "PASSED"})
        else:
            print("❌ FAILED: Should have returned 422 for invalid email")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Invalid email validation", "status": "FAILED", "reason": f"Expected 422, got {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Invalid email validation", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 5: Message too short
    print("TEST 5: Message too short (< 10 characters, should fail)")
    print("-" * 40)
    short_message_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Short"  # Only 5 characters
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=short_message_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Validation error
            print("✅ PASSED: Short message correctly rejected")
            test_results["passed"] += 1
            test_results["tests"].append({"test": "Short message validation", "status": "PASSED"})
        else:
            print("❌ FAILED: Should have returned 422 for short message")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Short message validation", "status": "FAILED", "reason": f"Expected 422, got {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Short message validation", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 6: Message too long
    print("TEST 6: Message too long (> 1000 characters, should fail)")
    print("-" * 40)
    long_message = "A" * 1001  # 1001 characters
    long_message_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": long_message
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=long_message_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Validation error
            print("✅ PASSED: Long message correctly rejected")
            test_results["passed"] += 1
            test_results["tests"].append({"test": "Long message validation", "status": "PASSED"})
        else:
            print("❌ FAILED: Should have returned 422 for long message")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Long message validation", "status": "FAILED", "reason": f"Expected 422, got {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Long message validation", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 7: Invalid phone format
    print("TEST 7: Invalid phone format (should fail)")
    print("-" * 40)
    invalid_phone_data = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "123456789",  # Invalid format
        "message": "This should fail because phone format is invalid."
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=invalid_phone_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:  # Custom validation error
            print("✅ PASSED: Invalid phone format correctly rejected")
            test_results["passed"] += 1
            test_results["tests"].append({"test": "Invalid phone validation", "status": "PASSED"})
        else:
            print("❌ FAILED: Should have returned 400 for invalid phone")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "Invalid phone validation", "status": "FAILED", "reason": f"Expected 400, got {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "Invalid phone validation", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Test 8: GET endpoint test
    print("TEST 8: GET /api/contact endpoint")
    print("-" * 40)
    
    try:
        response = requests.get(f"{BACKEND_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}...")  # Show first 200 chars
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ PASSED: GET endpoint returned list with {len(data)} messages")
                test_results["passed"] += 1
                test_results["tests"].append({"test": "GET contact messages", "status": "PASSED"})
            else:
                print("❌ FAILED: GET endpoint should return a list")
                test_results["failed"] += 1
                test_results["tests"].append({"test": "GET contact messages", "status": "FAILED", "reason": "Response is not a list"})
        else:
            print("❌ FAILED: Non-200 status code")
            test_results["failed"] += 1
            test_results["tests"].append({"test": "GET contact messages", "status": "FAILED", "reason": f"Status code: {response.status_code}"})
    except Exception as e:
        print(f"❌ FAILED: Exception - {str(e)}")
        test_results["failed"] += 1
        test_results["tests"].append({"test": "GET contact messages", "status": "FAILED", "reason": str(e)})
    
    print()
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    print()
    
    if test_results["failed"] > 0:
        print("FAILED TESTS:")
        for test in test_results["tests"]:
            if test["status"] == "FAILED":
                reason = test.get("reason", "Unknown")
                print(f"  - {test['test']}: {reason}")
    
    print()
    return test_results

if __name__ == "__main__":
    results = test_contact_api()
    
    # Exit with error code if any tests failed
    if results["failed"] > 0:
        sys.exit(1)
    else:
        print("🎉 All tests passed!")
        sys.exit(0)