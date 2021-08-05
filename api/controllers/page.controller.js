/** importing dependencies */


// home page
export const home = async (req, res) =>{
    console.log(req.sessionID)
    res.render('index.ejs', {title: 'Home page'})
}
// login page
export const login = async (req, res) =>{
    res.render('login.ejs', {title: 'Login page'})
}
// dashboard page
export const dashboard = async (req, res) =>{
    res.render('dashboard.ejs', {title: 'Dashboard', email: req.payload})
}
// register page
export const signUp = async (req, res) =>{
    res.render('sign-up.ejs', {title: 'sign up page'})
}
// verify Account
export const verifyAccount = async(req, res) =>{
    res.render('verify-account.ejs', {title: 'Verify Account'})
}
// error page
export const errorPage = async(req, res) =>{
    res.render('error.ejs', {title: 'Error page'})
}
