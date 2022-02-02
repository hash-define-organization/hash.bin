const cron = require("node-cron");
const Doc = require("../models/doc");

const scheduleExpiryJobs = () => {
    cron.schedule("0 0 * * * *", () => {
        Doc.find({}, (err, docs) => {
            if (err) return console.log(err);

            docs.forEach((doc) => {
                if (doc.expiryDate < Date.now()) {
                    Doc.deleteOne({ _id: doc._id }, (err) => {
                        if (err) return console.log(err);
                        console.log("Document expired");
                    });
                }
            });
        });
    });
};

module.exports = scheduleExpiryJobs;
