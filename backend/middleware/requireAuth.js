const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    
    if (req.method === 'OPTIONS') {
        // bypass preflight request tanpa cek token
        return res.sendStatus(200);
      }

    // verify authentication
    const { authorization } = req.headers
    if(!authorization) {
        return res.status(404).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(404).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth
