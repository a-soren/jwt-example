const router = require("express").Router();


const Users = require("../models/usersModel");

//Build endpoints for CRUD functionality here


router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => res.status(500).json(error))
})



module.exports = router;
