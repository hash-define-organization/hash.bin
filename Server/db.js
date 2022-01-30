require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));
