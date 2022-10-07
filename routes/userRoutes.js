const express = require('express')
const {userLogin, userSignup, googleAuth,  deleteUser, editProfile} = require('../controller/userControl')
const requireAuth = require('../middleware/requireAuth')

const Router = express.Router()

// login 
Router.post('/login', userLogin ) 

// signup
Router.post('/signup', userSignup )

// google login
Router.post('/googleLogin', googleAuth)
// delete user
Router.delete('/:id', requireAuth, deleteUser)

// update profile
Router.patch('/:id', requireAuth, editProfile)

module.exports = Router