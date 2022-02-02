const router = require('express').Router();
const Doc = require('../models/doc');

router.post('/api/v1/editcode', async (req, res) => {
    let { language, code, customUrl } = req.body;

    // code = Buffer.from(code).toString('base64');

    if (code === undefined) {
        return res.status(400).json({ error: "No code provided" });
    }

    language == undefined ? (language = "text") : (language = language);

    if(customUrl){
        try{
            let doc = await Doc.findOne({ customUrl }).exec();

            doc.code = code;
            doc.language = language;   
            await doc.save();
            res.status(200).send("Successfully updated document");
        }
        catch(err){
            console.log(err);
        }
    }
    
    else{
        return res.status(404).json({ error: "No custom url found in db!" });
    }
})

module.exports = router;