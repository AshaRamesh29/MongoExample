const user =  require('../models/user')

    const auth = async (req,res,next)=>{
        try{
            var query ={}
            query.email = req.headers.email;
            query.password = req.headers.password ;
            console.log('query',query)
            const userInfo = await user.findOne(query)
            console.log("userInfo",userInfo)
            if(!userInfo){
               throw new Error()
            }
            req.userInfo = userInfo
            next();
        }catch(e){
            res.status(401).send({error:'Please authenticate'})
        }
    }
    module.exports= auth


