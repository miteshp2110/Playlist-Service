const { verifyJwtToken } = require("../utils/jwtManager");

const checkUser =(role)=> async(req,res,next)=>{
    try{
        if(role === "any"){
            next()
            return
        }
        const {authorization} = req.headers
        if(!authorization){
            return res.status(400).json({Message:"Token Required"})
        }  
        const token = authorization.split(' ')[1]

        let verification = verifyJwtToken(token,role)
        if(verification === false){
            return res.status(401).json({Message:"Unauthorized"})
        }
        req.user = verification.email
        next()

    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
}

module.exports=checkUser