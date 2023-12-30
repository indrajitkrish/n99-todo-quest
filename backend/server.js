
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login"
})

let useremail, userpassword;

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login_table WHERE `email` = ? AND `password` = ? ";
    useremail = req.body.email;
    userpassword = req.body.password;
    db.query(sql, [  req.body.email, req.body.password], (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        if(data.length > 0)
        {
            return res.json("Success");
        }
        else{
            return res.json("Failed");
        }
    })
})

app.get('/username', (req,res) => {
    const sql = "SELECT name FROM login_table WHERE `email` = ? AND `password` = ? ";
    //console.log(req.body.email)
    db.query(sql, [ useremail, userpassword], (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        res.send(data);
        
    })
})

app.get('/message', (req,res) => {
    const sql = "SELECT * FROM message_table";
    db.query(sql, (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        res.send(data);
    })
})

app.post('/discussion/newmessage', (req,res) => {
    const sql = "INSERT INTO message_table (user, message) VALUES (?, ?)";
    //console.log(req);
    db.query(sql, [req.body.user, req.body.message], (err, data) => {
        if(err)
        {
        console.log(err);
        }
        res.send(data);
    })
})

app.post('/discussion/deletemessage', (req,res) => {
    const sql = "DELETE FROM message_table WHERE id = ? ";
   // console.log(req.body.userid);
    db.query(sql, [req.body.userid], (err, data) => {
        if(err)
        {
        console.log(err);
        }
        res.send(data);
    })
})

app.put('/discussion/updatemessage', (req,res) => {
    const sql = "UPDATE message_table SET message = ? WHERE id = ? ";
   // console.log(req.body.userid);
    db.query(sql, [req.body.updatedMessage, req.body.userid], (err, data) => {
        if(err)
        {
        console.log(err);
        }
        res.send(data);
    })
})



app.listen(8080, ()=> {
    console.log("listening 8080");
})