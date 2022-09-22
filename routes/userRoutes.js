const express = require('express')
const {userLogin, userSignup, deleteUser, editProfile} = require('../controller/userControl')
const requireAuth = require('../middleware/requireAuth')

const Router = express.Router()

// login 
Router.post('/login', userLogin ) 

// signup
Router.post('/signup', userSignup )

// delete user
Router.delete('/:id', requireAuth, deleteUser)

// update profile
Router.patch('/:id', requireAuth, editProfile)

module.exports = Router