const userModel = require('../model/userModel')

const createUser = async function(req,res){

    try {
         let data = req.body
         let user = await userModel.create(data)
         return res.status(201).send({status:true , data:user})


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createUser= createUser


