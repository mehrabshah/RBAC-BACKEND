
const createDoctorProfile =(req,res)=>{
    try{
       res.json({ msg: "Docotr Profile Created Successfully" });
    }   
    catch(error){
       console.error(err.message);
       res.status(500).send("Server error");    
    }
}

module.exports = {  createDoctorProfile };
