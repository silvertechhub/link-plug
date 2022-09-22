const auth = require('../model/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { findOneAndDelete } = require('../model/users')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'1d'})
}

// login
const userLogin = async (req, res) => {
    const {email, password}  = req.body

    try{
        const user = await auth.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token, id: user._id, username: user.username, phoneNumber: user.phoneNumber })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup
const userSignup = async (req, res) => {
    const {email, password, username, phoneNumber}  = req.body

    try{
        const user = await auth.signup(email, password, username, phoneNumber)
        const token = createToken(user._id)
        res.status(200).json({email, token, username, phoneNumber, id: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "this user does not exist"})
     }

     const delUser = await auth.findOneAndDelete({_id: id})

     if (!delUser){
        return res.status(404).json({error: "no user found"})
    }

    res.status(200).json(delUser)
}

const editProfile = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "this user does not exist"})
     }

     const updateProfile = await auth.findOneAndUpdate({_id: id}, {
        ...req.body
     })

     if (!updateProfile){
        return res.status(404).json({error: "no user found"})
    }

    res.status(200).json(updateProfile)
}


module.exports = {
    userLogin,
    userSignup, 
    deleteUser,
    editProfile
}