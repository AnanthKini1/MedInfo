const express = require('express');
const router = express.Router();

const { searchDrugs, getRecalls } = require('../controllers/drugController');

// GET /api/drugs/search?query=lipitor
router.get('/search', searchDrugs);

// GET /api/drugs/recalls/lipitor
router.get('/recalls/:drugName', getRecalls)

// simple test endpoint to verify router is connected
router.get('/test', (req, res) => {
    res.json({ message: 'Router is working!' });
});

module.exports = router;