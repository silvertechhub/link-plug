const { OAuth2Client } = require('google-auth-library')
const Users = require('../model/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


// custom signup
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'1d'})
}

// google Signup
const  googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`
})



// login
const userLogin = async (req, res) => {
    const {email, password}  = req.body

    try{
        const user = await Users.login(email, password)
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
        const user = await Users.signup(email, password, username, phoneNumber)
        const token = createToken(user._id)
        res.status(200).json({email, token, username, phoneNumber, id: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// Google Signup/login
const googleAuth = async ( req, res ) => {
    const { token } = req.body;
    try{
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audient: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
       
        let user = await Users.findOne({email: payload.email })
        if(!user){
            user = await Users.create({ 
                email: payload.email,
                username:payload.name,
                avatar: payload.picture
            })
            await user.save();
        }
        const googleToken = createToken(user._id)
        res.status(200).json({user, token: googleToken})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "this user does not exist"})
     }

     const delUser = await Users.findOneAndDelete({_id: id})

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

     const updateProfile = await Users.findOneAndUpdate({_id: id}, {
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
    googleAuth, 
    deleteUser,
    editProfile
}