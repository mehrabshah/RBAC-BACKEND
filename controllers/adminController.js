const createAdminProfile =(req,res)=>{
     try{

        console.log("subuhi",req)
        res.json({ msg: "Admin Profile Created Successfully" });
     }   
     catch(error){
        console.error(err.message);
        res.status(500).send("Server error");    
     }
}

module.exports = { createAdminProfile };
