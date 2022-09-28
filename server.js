require("dotenv").config();
const express = require("express");
const appRoutes = require('./routes/routes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require("mongoose")
const path = require("path")

const app = express();

app.use(express.json()); 
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, "./client/build")))

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

app.use('/api/routes', appRoutes);
app.use('/api/userRoutes', userRoutes);
  


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");

    app.listen(process.env.PORT, function(){
        console.log(`port running on port ${process.env.PORT}`)
    });
   
}).catch( (err) => {console.log(err)})

