const router = require("express").Router();
const bcrypt = require('bcryptjs');
const Users = require("../models/usersModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();


//build out a register and login endpoint
router.post('/register', (req, res) => {
    const user= req.body;
    const hash = bcrypt.hashSync(user.password, 14); 
    user.password = hash;
    Users.add(user)
    .then(saved => {
        res.status(200).json(saved)
    })
    .catch(error => res.status(500).json(error))
    
})

router.post('/login', (req,res) =>{
    const user = req.body;
    

    Users.findByUsername(user.username)
    .then(happyjoy => {
        if(happyjoy && bcrypt.compareSync(user.password, happyjoy.password)){
            const token = generateJwtToken(happyjoy);
            res.status(200).json({
                message:'welcome!',
                token,
                username: happyjoy.username
            })
        } else {
            res.status(400).json({
                message:'invalid credentials'
            });
        }
    })
    .catch(error => res.status(500).json(error))
})
//use jsonwebtoken for auth

function generateJwtToken(user){
    const payload = {
        subject:user.id,
        username:user.username,
    }

    const secret = process.env.JWT_SECRET

    const options = {
        expiresIn: '1hr'
    }
  return  jwt.sign(payload, secret, options);
}


module.exports = router;