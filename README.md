LEI-Based Merchant Payments PoC

Overview
A Proof-of-Concept (PoC) demonstrating merchant payments using Legal Entity Identifiers (LEI) with QR code technology, developed for the Mojaloop Foundation's financial inclusion initiatives.

Features
Merchant Management
✅ LEI validation against GLEIF database

✅ Merchant registration with business details

✅ QR code generation for each merchant

✅ Merchant directory listing

Payment Processing
💳 QR code scanning for payment initiation

🔄 Real-time payment status tracking

📜 Complete payment history

💱 Multi-currency support (USD, EUR, GBP, KES)

Technical Highlights
🌐 RESTful API backend

⚛️ React frontend with Material-UI

🔐 Secure payment processing

📱 Fully responsive design

graph TD
    A[Frontend] -->|API Calls| B[Backend]
    B -->|LEI Validation| C[GLEIF API]
    B -->|Payment Processing| D[Mojaloop Switch]
    B --> E[(MongoDB)]

Prerequisites
Node.js 16+

MongoDB 4.4+

Yarn or npm

Git

Installation
Backend Setup

# Clone repository
git clone https://github.com/your-repo/lei-merchant-payments.git
cd lei-merchant-payments/backend

# Install dependencies
npm install

# Configure environment (copy and edit)
cp config/default.example.json config/default.json

# Start server
node index.js

Frontend Setup

cd ../frontend

# Install dependencies
npm install

# Start development server
npm start

Configuration
Backend (config/default.json)

{
  "server": {
    "port": 3000,
    "host": "0.0.0.0"
  },
  "mojaloop": {
    "dfspId": "merchantdfsp",
    "currency": "USD",
    "endpoint": "http://localhost:4000",
    "oauthToken": "your-oauth-token"
  },
  "lei": {
    "validationEndpoint": "https://leilookup.gleif.org/api/v2/leirecords",
    "cacheTTL": 86400
  },
  "database": {
    "url": "mongodb://localhost:27017/lei-merchant-payments"
  }
}

