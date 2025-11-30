# MedInfo (FDA Drug Information API)

RESTful API for retrieving FDA drug information and safety alerts.

## About

This API helps users access medication information from the FDA's OpenFDA database, including drug labels, warnings, side effects, and recall alerts.

**My Role:** I built the entire backend as part of a healthcare web application developed with teammates. This repo contains only my backend work - the API architecture, FDA integration, and data processing logic.

## Tech Stack

- Node.js + Express.js
- FDA OpenFDA API (Drug Label & Enforcement)
- Axios for HTTP requests

## Installation
```bash
npm install
npm start
```

Server runs on `http://localhost:5001`

## API Endpoints

### Search Drugs
```
GET /api/drugs/search?query=lipitor
```

Returns drug information: brand name, warnings, side effects, dosage, etc.

### Get Recalls
```
GET /api/drugs/recalls/metformin
```

Returns FDA recall and enforcement data for a medication.

## Example Response
```json
{
  "drugs": [
    {
      "brandName": "Lipitor",
      "genericName": "Atorvastatin",
      "warnings": "May cause liver problems...",
      "sideEffects": "Muscle pain, headache...",
      "dosage": "Take once daily..."
    }
  ],
  "count": 1
}
```

## Architecture
```
├── server.js              # Express setup
├── routes/drugs.js        # API routes  
├── controllers/           # Request handlers
└── services/              # FDA API integration
```

**Key Decisions:**
- Service layer pattern separates API logic from HTTP handling
- Data transformation reduces FDA's 50+ fields to 8 essential ones
- Search both brand and generic names for better coverage
- Optional chaining handles inconsistent FDA data structure

## Testing
```bash
# Should return results
curl "http://localhost:5001/api/drugs/search?query=advil"

# Should return 404
curl "http://localhost:5001/api/drugs/search?query=nonexistentdrug"

# Should return 400 (too short)
curl "http://localhost:5001/api/drugs/search?query=a"
```

## Links

- [FDA OpenFDA Docs](https://open.fda.gov/apis/)
- [Original Full-Stack Project](https://github.com/isakpeder/medicationinfo)

