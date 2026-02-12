# BharathCare Backend API Documentation

Base URL (local):
http://localhost:5000

All APIs use JSON.
Authentication is done using JWT tokens.

For protected routes, include this header:
Authorization: Bearer <JWT_TOKEN>

---

## Authentication

### POST /auth/register

Registers a new user.

**Auth Required:** No  
**Roles:** patient, doctor, pharmacy, admin

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456",
  "role": "patient"
}
// Success Response
// {
//   "message": "User registered successfully"
// }

POST /auth/login

Logs in a user and returns JWT token.

Auth Required: No

Request Body:

{
  "email": "john@test.com",
  "password": "123456"
}

Success Response:

{
  "token": "JWT_TOKEN",
  "role": "patient"
}


👉 Save.

---

# 🪜 STEP 4 — DOCUMENT MEDICINES API

Add next section:

```md
---

## Medicines

### GET /medicines/search

Search or list medicines.

**Auth Required:** Yes  
**Roles:** All logged-in users

**Query Params (optional):**
- `query` – medicine name search

**Example:**

GET /medicines/search?query=para


**Success Response:**
```json
[
  {
    "_id": "MEDICINE_ID",
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma",
    "prescriptionRequired": false
  }
]


Save.

---

# 🪜 STEP 5 — DOCUMENT PHARMACIES API

```md
---

## Pharmacies

### GET /pharmacies/nearest

Returns nearest pharmacies based on user location.

**Auth Required:** Yes  
**Roles:** All logged-in users

**Query Params:**
- `lat` – latitude
- `lng` – longitude

**Example:**

GET /pharmacies/nearest?lat=12.96&lng=77.60


**Success Response:**
```json
[
  {
    "_id": "PHARMACY_ID",
    "name": "City Care Pharmacy",
    "address": "Main Road",
    "distance": 2.1
  }
]


Save.

---

# 🪜 STEP 6 — DOCUMENT ORDERS API

```md
---

## Orders

### POST /orders/create

Creates a new order.

**Auth Required:** Yes  
**Roles:** patient

**Request Body:**
```json
{
  "pharmacyId": "PHARMACY_ID",
  "items": [
    {
      "medicineId": "MEDICINE_ID",
      "quantity": 2
    }
  ]
}
Success Response:

{
  "_id": "ORDER_ID",
  "status": "created"
}

PATCH /orders/update

Updates order status.

Auth Required: Yes
Roles: pharmacy

Request Body:

{
  "orderId": "ORDER_ID",
  "status": "accepted"
}


Allowed transitions:

created → accepted

accepted → delivered


Save.

---

# 🪜 STEP 7 — DOCUMENT DOCTORS API

```md
---

## Doctors

### GET /doctors/availability

Returns doctors and their availability.

**Auth Required:** Yes  
**Roles:** All logged-in users

**Success Response:**
```json
[
  {
    "doctorName": "Dr Rao",
    "specialization": "Cardiology",
    "available": true,
    "availability": [
      {
        "day": "Mon",
        "from": "09:00",
        "to": "13:00"
      }
    ]
  }
]


Save.

---

# 🪜 STEP 8 — DOCUMENT PRESCRIPTIONS API

```md
---

## Prescriptions

### POST /prescriptions/create

Creates a prescription.

**Auth Required:** Yes  
**Roles:** doctor

**Request Body:**
```json
{
  "patientId": "PATIENT_ID",
  "medicines": [
    {
      "medicineId": "MEDICINE_ID",
      "dosage": "1 tablet twice a day"
    }
  ],
  "notes": "After food"
}

GET /prescriptions/my

Returns prescriptions for logged-in patient.

Auth Required: Yes
Roles: patient

Success Response:

[
  {
    "medicines": [
      {
        "medicineId": {
          "name": "Paracetamol"
        },
        "dosage": "1 tablet twice a day"
      }
    ],
    "notes": "After food"
  }
]





