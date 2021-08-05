'use strict'
/** Importing dependencies */
import jwt from 'jsonwebtoken'

/** authenticating user token */
export const isAuthenticated = (req, res, next) => {

    // getting refresh token from cookie
    const refreshToken = req.cookies.jwtToken   
    //
    if(refreshToken == null) return res.sendStatus(401)
    /**
     *   Verifying Refresh Token
     */
    jwt.verify(refreshToken, process.env.SECRET_REFRESH, (err, user) =>{
        if(err) res.sendStatus(403)
        next()
    })


}
