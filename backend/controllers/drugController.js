const { searchDrug, getDrugRecalls } = require('../services/fdaService');

// handles drug search requests from client
async function searchDrugs(req, res) {
    const { query } = req.query;

    // validates query length to prevent empty or single character searches
    if (!query || query.trim().length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    try {
        const drugs = await searchDrug(query);

        // returns 404 if no matches found
        if (!drugs || drugs.length == 0) {
            return res.status(404).json({ message: 'No drugs found' });
        }

        // sends drug data with count for frontend convenience
        res.json({drugs, count: drugs.length})
    }

    catch (error){
        console.error('Search error: ' + error);
        // returns 500 for server or FDA API errors
        res.status(500).json({ error: 'Failed to search drugs' });
    }
}

// handles recall lookup requests from client
async function getRecalls(req, res) {
    const { drugName } = req.params;

    // validates drug name length
    if (!drugName || drugName.trim().length < 2) {
        return res.status(400).json({ error: 'Drug name must be at least 2 characters' });
    }

    try {
        const recalls = await getDrugRecalls(drugName);

        // returns 404 if no recalls exist for this drug
        if (!recalls || recalls.length == 0) {
            return res.status(404).json({ message: 'No recalls found' });
        }

        // sends recall data with count
        res.json({recalls, count: recalls.length})
    }

    catch (error){
        console.error('Recalls error: ' + error);
        res.status(500).json({ error: 'Failed to search recalls' });
    }

}

module.exports = {searchDrugs, getRecalls}