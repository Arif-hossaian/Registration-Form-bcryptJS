const mongoose = require("mongoose")

mongoose.connect( process.env.MONGODB_URI  || "mongodb://localhost:27017/LoginRegistration", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("Connetion sucessfull.....")
}).catch((e) =>{
    console.log("No connection....")
})