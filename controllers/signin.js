
const signinhandler = (req,res,knex,bcrypt) =>{

const {email,password} = req.body;
if(!email || !password)
return res.status(400).json("inappropriate information")

knex.select('email','hash').from('login')
	.where('email','=', req.body.email )//check requested email with email in db
	.then(data=>{
	const isvalid=bcrypt.compareSync(req.body.password, data[0].hash);//check if pw are equal
	if(isvalid)
	{
   return  knex.select('*').from('users')
     .where('email','=',req.body.email)
     .then(user=>{
     	res.json(user[0])
     })
     .catch(err=>res.status(400).json('unable to get user'))
	}
	else
		res.status(400).json('wrong credentials')

})
  .catch(err=>res.status(400).json('wrong credentials'))
}

module.exports={
	signinhandler:signinhandler
}