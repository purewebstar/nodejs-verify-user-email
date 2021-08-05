'use strict'
/** importing dependencies */
import bcrypt from 'bcrypt'

/** importing models */
import {userAccount} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {sendMail} from '../../api/config/email-config.js'

/** Creating user account */
export const createUser = async (req, res) =>{
   // accepting request data's
   const fullName = req.body.fullName
   const email = req.body.email
   const password = req.body.password
   
   // checking if the user exists
   let isExist = await userAccount.findOne({email})
   if(isExist){
       return res.json({message: 'user email exists!'})
   }
   const encryptPass = await bcrypt.hash(password, 10)
   const registerUser = {
       fullName,
       email,
       password: encryptPass
   }
   const payload = {
      email : email
   }
   // generate token
   const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '5m'})
   const cookieToken = jwt.sign(registerUser, process.env.SECRET_KEY, {expiresIn: '5m'})
   res.cookie('temp_data', cookieToken, {maxAge: 5*60*1000, httpOnly: true})

   const from = 'abrilojson@gmail.com',
         to = email,
         subject= 'Verify your Account',
         text= '',
         html = `<a href='http://localhost:4000/api/verify-user/${token}' target='_blank' '>Verify My Account</a>`
   
         // sending verification to user email
         sendMail(from, to,subject, text, html)

   res.redirect('/verify-account')


}

/** reading user account */
export const readUser = async (req, res, next) =>{
     
     const {email, password} = req.body
     const payload = { email: email }

     let isExist = await userAccount.findOne({email})
     if(!isExist) return res.sendStatus(404)
     //
     let isMatch = await bcrypt.compare(password, isExist.password)
     if(isMatch){
        // generate access token
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, {expiresIn: '5m'})
        // generate refresh token
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {expiresIn: '3h'})
        // setting access token on header
        res.setHeader('Authorization', 'Bearer ' + accessToken)
        // setting refresh token on cookie
        res.cookie('jwtToken',  refreshToken, {maxAge: 3*60*60*1000, httpOnly: true})
        //----------
        res.redirect('/dashboard')

     }
     else return res.redirect('/error')
}

/** Verify User Account */
export const verifyUser = async (req, res) =>{
   const token = req.params.token
   const cookie_token = req.cookies.temp_data
   // verifying user token
   jwt.verify(token, process.env.SECRET_KEY, async (err, payload) =>{
      if(err) res.sendStatus(403)
      jwt.verify(cookie_token, process.env.SECRET_KEY, async (err, userData) =>{
         if(err) res.sendStatus(403)
         let newUser = new userAccount(userData)
         // Register user / Create user account
         try{
            await newUser.save()
         }catch(err){
            res.json({message: err.message})
         }
         // next
         res.redirect('/sign-in')
      })
   })

}

      