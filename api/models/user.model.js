/** importing dependencies */
import mongoose from 'mongoose'

/** reusable code pieces */
const reqString = {
    type: String,
    required: true
}
// user account schema
const userSchema = mongoose.Schema({
    fullName: reqString,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: reqString
},{
    timestamps: true
})

export const userAccount = mongoose.model('users', userSchema)