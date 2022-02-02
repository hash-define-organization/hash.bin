const router = require('express').Router();
const Doc = require('../models/doc');

router.get('/api/v1/:getCode', async(req, res) => {
    const { getCode } = req.params;
    
    try{
        const doc = await Doc.findOne({ customUrl: getCode }).exec();

        if(!doc){
            return res.status(404).json({ error: 'No document found'});
        }

        // doc.code = Buffer.from(doc.code, 'base64').toString('utf-8');
        return res.status(200).json(doc);
    }

    catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;