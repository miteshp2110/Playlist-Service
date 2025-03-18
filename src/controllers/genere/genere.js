const {pool} = require('../../config/db')

async function addGenere(req,res){
   try{

        const {name} = req.body
        if(!name){
            return res.status(400).json({Message:"Invalid Body"})
        }
        await pool.query('INSERT INTO genere (name) values (?)',[name])

        return res.status(201).json({Message:"Added new Genere"})
   }
   catch(err){
    if(err.code === "ER_DUP_ENTRY"){

        return res.status(500).json({Message:"Genere already exists."})
    }
    console.error(err)
    return res.status(500).json({Message:"Some Error Occured"})
   }

}


async function getGenere(req,res){
    try{

        const [result] = await pool.query("SELECT * FROM genere")
        res.status(200).json(result)
    }
    catch(err){
        console.error(err)
        return res.status(500).json({Message:"Some Error Occured"})
    }
}

module.exports = {addGenere, getGenere}