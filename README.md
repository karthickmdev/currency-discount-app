# Currency Exchange and Discount Calculation App

## Description

A Node.js application that integrates with a third-party currency exchange API to retrieve real-time exchange rates. It calculates the total payable amount for a bill in a specified currency after applying applicable discounts.

## Features

- **Third-Party API Integration:** Fetches real-time currency exchange rates.
- **Discount Logic:** Applies various discounts based on user type and tenure.
- **Authentication:** Secures endpoints using JWT.
- **API Endpoint:** `/api/calculate` to calculate payable amounts.
- **Caching:** Implements caching for exchange rates to reduce API calls.
- **Testing:** Includes unit tests with coverage reports.

## Technologies Used

- **Node.js & Express.js**
- **Axios:** For making HTTP requests.
- **JWT:** For authentication.
- **Jest & Supertest:** For testing.
- **ESLint & Prettier:** For code quality and formatting.

## Setup Instructions

### **Prerequisites**

- Node.js installed on your machine.
- An API key from [Open Exchange Rates](https://open.er-api.com/) or any other preferred currency exchange API.

### **Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/currency-discount-app.git
   cd currency-discount-app
   ```

### \*\*\* Login:

    Endpoint: /auth/login
    Method: POST
    Body:
      {
         "username": "employee1",
         "password": "password123"
      }


    Response:
      {
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlclR5cGUiOiJFTVBMT1lFRSIsInRlbnVyZSI6MSwiaWF0IjoxNzI2ODM3NjI4LCJleHAiOjE3MjY4NDEyMjh9.0KEjdXND6HFXiXkfs0nuDcV2lYvr_tLexRoz_tAmCu4"
      }

### \*\*\*Calculate Payable Amount:

    Endpoint: /api/calculate
    Method: POST
    Headers:
       Authorization: Bearer your_jwt_token
    Body:
       [
          { "category": "groceries", "price": 200 },
         { "category": "electronics", "price": 300 }
        ]

    Response:
      {
        "originalAmount": 500,
        "discountApplied": 35,
        "amountAfterDiscount": 465,
        "targetCurrency": "EUR",
        "payableAmount": "390.00"
       }
