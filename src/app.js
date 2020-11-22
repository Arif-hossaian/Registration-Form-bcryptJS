const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const bcrypt = require("bcryptjs")
require("./db/conn")

const Register = require("./models/registers")

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
const port = process.env.PORT || 7000


app.use(express.json())
app.use(express.urlencoded({ extended: false}))



app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)



app.get("/", (req,res) =>{
    res.render("home.hbs")
})

app.get("/index", (req,res) =>{
    res.render("index.hbs")
})

app.get("/register", (req,res) =>{
    res.render("register")
})

app.get("/login", (req,res) =>{
    res.render("login")
})

app.get("/loginSucces", (req,res) =>{
    res.render("loginSucces")
})

//create a new database
app.post("/register", async(req,res) =>{

    try{
        
        const password = req.body.password
        const cpassword = req.body.confirmpassword


        if( password === cpassword ){

            const registerEmploy = new Register({

                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : password,
                confirmpassword : cpassword,
            })

            const registered = await registerEmploy.save()
            res.status(201).render("index")
        }
        else{
            res.send("Password are not matched")
        }
    }
    catch(e){
        res.status(400).send("Same data has already been exits by others.. Your Email and phone number should be  unique. Try again..Thank you")
    }
    
})


//login check

app.post("/login", async(req,res) =>{
    try {
        
        const email = req.body.email;
        const password = req.body.password

        const useremail = await Register.findOne({email : email})

        const isMatch = await bcrypt.compare(password, useremail.password)
        
        if( isMatch ){
            res.status(201).render("loginSucces")
        }
        else{
            res.send("Invalid Password details")
        }
    } catch (error) {
        res.status(400).send("Invalid Login details")
    }
})


app.listen(port, () =>{
    console.log(`server is running at port number ${port}`)
})