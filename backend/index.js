const express= require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors'); 

require('./config/database');


//settings
app.set('port', process.env.PORT || 3000)

app.use(cors());
app.use(express.json()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', require('./routes/index'));




app.listen(app.get('port'));
console.log('Server on port', app.get('port'));