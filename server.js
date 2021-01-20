const express = require('express');
const bodyparser = require('body-parser');
const app= express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'manik123',
    database : 'smartbrain'
  }
});

knex.select('*').from(('users')).then(data=>{
	console.log(data);
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.post('/signin',(req,res)=>{signin.signinhandler(req,res,knex,bcrypt);})
app.post('/register',(req,res)=>{

	register.registerhandler(req,res,knex,bcrypt);
})



app.get('/profile/:id',(req,res)=>{

profile.profilehandler(req,res,knex);

})


app.put('/image',(req,res)=>{
image.imagehandler(req,res,knex);
});

/*
bcrypt.hash(password, null, null, function(err, hash) {
	
    console.log(hash);
    // Store hash in your password DB.
});
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3001,()=>{
	console.log("done");
})