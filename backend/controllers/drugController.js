const { searchDrug, getDrugRecalls } = require('../services/fdaService');

async function searchDrugs(req, res) {
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    try {
        const drugs = await searchDrug(query);

        if (!drugs || drugs.length == 0) {
            return res.status(404).json({ message: 'No drugs found' });
        }

        res.json({drugs, count: drugs.length})
    }

    catch (error){
        console.error('Search error: ' + error);
        res.status(500).json({ error: 'Failed to search drugs' });
    }
}

async function getRecalls(req, res) {
    const { drugName } = req.params;

    if (!drugName || drugName.trim().length < 2) {
        return res.status(400).json({ error: 'Drug name must be at least 2 characters' });
    }

    try {
        const recalls = await getDrugRecalls(drugName);

        if (!recalls || recalls.length == 0) {
            return res.status(404).json({ message: 'No recalls found' });
        }

        res.json({recalls, count: recalls.length})
    }

    catch (error){
        console.error('Recalls error: ' + error);
        res.status(500).json({ error: 'Failed to search recalls' });
    }

}

module.exports = {searchDrugs, getRecalls}

