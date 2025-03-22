const { verifyJwtToken } = require("../../utils/jwtManager")

const init = (async(req,res)=>{
    try{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(400).json({Message:"Token Required"})
        }  
        const token = authorization.split(' ')[1]

        let verification = verifyJwtToken(token)
        if(verification === false){
            return res.status(401).json({Message:"Unauthorized"})
        }
        return res.status(200).json({Message:"Ok"})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error"})
    }
})

module.exports = init