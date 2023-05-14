const mongoose = require('mongoose');
const {mongodb} = require('./keys'); 

mongoose.set('strictQuery', false);

mongoose.connect(mongodb.URI, {})
.then(db => console.log('Database is connected'))
.catch(err => console.error(err));