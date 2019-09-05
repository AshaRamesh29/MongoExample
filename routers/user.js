const express = require('express');
const Uesr = require('../models/user')
const auth = require('../middleware/auth')
require('../db/mongoose')
const Address = require('../models/address')
const router = new express.Router();
router.post('/users', async (req, res) => {
    try {
        
    console.log('req.body ', req.body);
    const user = new Uesr(req.body);
    var address = new Address({
        name:"bangalore"
    });
    await address.save();
    user.address = address
        var userInfo = await user.save();
        console.log('user info', userInfo)
        res.send(userInfo);
    } catch (e) {
       // var error = e.validatesync().errors.name.message
        console.log("errorqqqqqqqqqqq", e.errors)
        
        res.status(400).send(e.errors);

       
    }
});
router.get('/users/:id', async (req, res) => {
    var userId = req.params.id
    console.log('userId', userId)
    // Uesr.findById(userId).then((result) => {
    //     console.log('result..', result)
    //     res.send(result)
    // }).catch((e) => {
    // console.log('error',e)
    // })
    try{
        var result = await Uesr.findById('5d7100834eecfd291c8c20e3').populate('address')
        console.log('result',result)
        res.send(result);
      

    }catch(e){
    console.log('inside the catch block!!',e)
    }
})

router.delete('/users/:id',async(req,res)=>{
     var userIdToDelete =req.params.id
     try{
       var deletedResult =  await Uesr.findById(userIdToDelete).remove();
        res.send(deletedResult);

     }catch(e){
        console.log('error occured',res.status(500).send())
     }
})

router.put('/user/:id',async(req,res)=>{
    var userIdToUpdate =req.params.id
    var updateInfo = req.body;
    try{
      var updatedUserInfo = await Uesr.update({password:updateInfo.password},{name : '55'})
      console.log('updatedUserInfo',updatedUserInfo)

        res.send(updateInfo);
 
    }catch(e){
        console.log(res.status(500).send(),e) 
    }
})

router.post('/login',auth,async(req,res)=>{

// try{
//     console.log('query',query)
//     var loginResult = await Uesr.find(query);
//     if(loginResult.length > 0){
//         return res.send('login !!')
//     }
//         return res.send({msg:'no login !!'})
    
    
// }catch(e){
//     console.log('error',e)
// }
return res.send(req.userInfo)

})
module.exports = router;
