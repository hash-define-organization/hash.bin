const router = require("express").Router();
const ms = require('ms');
const Doc = require("../models/doc");
const { nanoid } = require("nanoid");

router.post("/api/v1/saveCode", async (req, res) => {

    let { language, code, customUrl, expiryDate } = req.body;

    // code = Buffer.from(code).toString('base64');

    if (code === undefined) {
        return res.status(404).json({ error: "No code provided" });
    }

    language === (undefined || language.length === 0) ? (language = "text") : (language = language);
    expiryDate === undefined ? (expiryDate = "72h") : (expiryDate = expiryDate);

    expiryDate = Date.now() + ms(expiryDate.toString());

    if(!expiryDate) {
        return res.status(400).json({ error: "No expiry date provided" });
    }

    console.log(new Date(expiryDate), expiryDate);

    if (customUrl && customUrl.length <= 4) {
        return res
        .status(400)
        .json({ error: "Custom url must be at least 5 characters long" });
    }

    try {
        if (customUrl !== undefined) {
        let url = await Doc.findOne({ customUrl }).exec();

        if (url)
            return res.status(400).json({ error: "Custom url already exists" });
        }

        else {
          customUrl = await nanoid(5);
        }

        const doc = new Doc({
            code: code,
            language: language,
            customUrl: customUrl,
            expireAt: expiryDate
        });

        await doc.save();
    }

    catch (err) {
        console.log(err);
    }

    res.status(200).send("Successfully created new document");
});

module.exports = router;
