require('dotenv').config();
const express = require('express');
var https = require('https');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/getWeather', (req, res) => {
    res.send({hello:"hello world"});
});


let transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port : 587,
    secure: false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

app.post('/adding', async (req,res)=>{
    const name = req.body.name;
    try{
        
        let info = await transporter.sendMail({
            from: `"Fred Foo 👻" <${process.env.EMAIL}>`, // sender address
            to: name, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `${name}`, // plain text body
            html: "<b>Hello world? , your name is "+name+"</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }catch(error){
        console.log(error)
    }
    
})

app.listen(port, () => {
    console.log('server started')
})