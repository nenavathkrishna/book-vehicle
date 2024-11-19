const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const db = require('./models/index');

const PORT = process.env.PORT 

console.log("what is Port", process.env.PORT)


const app = express();

// Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Error connecting to the database:', err));



// imports routers
const vehicleRouter = require('./routes/vehicle')
const bookingRouter = require('./routes/booking')

// middelwares
app.use(cors());
app.use(express.json());


// Routings

app.get('/', (req, res)=>{
    res.send("Welcome to home")
})

app.use('/api/vehicle', vehicleRouter)
app.use('/api/book', bookingRouter)


app.listen(PORT, ()=>{
    console.log(`server is rinning on ${PORT}`)
})
