const router = require("express").Router();
const ms = require('ms');
const Doc = require("../models/doc");
const { nanoid } = require("nanoid");

router.post("/api/v1/takeCode", async (req, res) => {

    let { language, code, customUrl, expiryDate } = req.body;

    // code = Buffer.from(code).toString('base64');

    if (code === undefined) {
        return res.status(404).json({ error: "No code provided" });
    }

    language === (undefined || language.length === 0) ? (language = "text") : (language = language);
    expiryDate === undefined ? (expiryDate = "1h") : (expiryDate = expiryDate);

    expiryDate = Date.now() + ms(expiryDate.toString());
    console.log(new Date(expiryDate), expiryDate);

    if (customUrl.length <= 4) {
        return res
        .status(401)
        .json({ error: "Custom url must be at least 5 characters long" });
    }

    try {
        if (customUrl !== undefined) {
        let url = await Doc.findOne({ customUrl }).exec();

        if (url) 
            return res.status(401).json({ error: "Custom url already exists" });
        }

        else {
          customUrl = await nanoid(5);
        }
        
        const doc = new Doc({
            language,
            code,
            customUrl,
            expiryDate
        });

        await doc.save();
    } 
    
    catch (err) {
        console.log(err);
    }

    res.status(201).send("Successfully created new document");
});

module.exports = router;
