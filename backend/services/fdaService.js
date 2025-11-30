const axios = require('axios');

const fdaAPI = axios.create({
    baseURL: 'https://api.fda.gov',
    timeout: 10000
});

async function searchDrug(drugName) {
    try {
        const response = await fdaAPI.get('/drug/label.json', {
            params: {
                search: `openfda.brand_name:"${drugName}"+openfda.generic_name:"${drugName}"`,
                limit: 1 
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return null;  
        }

        return response.data.results.map(drug => ({
            brandName: drug.openfda?.brand_name?.[0] || 'Not available',
            genericName: drug.openfda?.generic_name?.[0] || 'Not available',
            manufacturer: drug.openfda?.manufacturer_name?.[0] || 'Not available',
            purpose: drug.purpose?.[0] || 'Not available',
            warnings: drug.warnings?.[0] || 'Not available',
            sideEffects: drug.adverse_reactions?.[0] || 'Not available',
            dosage: drug.dosage_and_administration?.[0] || 'Not available',
            activeIngredient: drug.active_ingredient?.[0] || 'Not available',
            contraindications: drug.contraindications?.[0] || 'Not available'
        }));

    } catch (error) {
        console.error('Error fetching drug:', error.message);
        return null;
    }
}

async function getDrugRecalls(drugName) {
    try {
        const response = await fdaAPI.get('/drug/enforcement.json', {
            params: {
                search: `openfda.brand_name:"${drugName}"`,
                limit: 10
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return [];  
        }

        return response.data.results.map(recall => ({
            recallDate: recall.recall_initiation_date,
            reason: recall.reason_for_recall,
            status: recall.status,
            classification: recall.classification,
            company: recall.recalling_firm
        }));

    } catch (error) {
        console.error('Error fetching recalls:', error.message);
        return [];  
    }
}

module.exports = { 
    searchDrug, 
    getDrugRecalls 
};