//=====================Importing Module and Packages=====================//
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Chanchal25-DB:gFTcvqSDyVwmFSO9@cluster0.ypi01as.mongodb.net/group4Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is Connected."))
    .catch(error => console.log(error))



//===================== Global Middleware for Route =====================//
app.use('/', route)

//===================== It will Handle error When You input Wrong Route =====================//
app.use(function (req, res) {
    var err = new Error("Not Found.")
    err.status = 400
    return res.status(400).send({ status:false, msg: "Path not Found." })
})



app.listen(process.env.PORT || 3001, function () {
    console.log('Express App Running on Port: ' + (process.env.PORT || 3000))
});