
const registerhandler=(req,res,knex,bcrypt)=>{



const { email,password,name }=req.body;

if(!email || !password || !name)
return res.status(400).json("inappropriate information")
const hash = bcrypt.hashSync(password);

//bcrypt.compareSync("bacon", hash); // true
//bcrypt.compareSync("veggies", hash); // false

knex.transaction(trx=>{
	trx.insert({
		hash:hash,
		email:email
	})
	.into('login')
	.returning('email')
	.then(loginemail=>{
     
    return  trx('users')
.returning('*')
.insert({
	email:loginemail[0],
	name:name,
	joined:new Date()
}).then(user=>
{
res.json(user[0]);
})
})
.then(trx.commit)
.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('unable to register'))
}

module.exports={
	registerhandler:registerhandler
}