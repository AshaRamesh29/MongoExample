const express = require('express');
const Uesr = require('../models/user')
require('../db/mongoose')
const router = new express.Router();
router.post('/users', async (req, res) => {
    console.log('req.body ', req.body);
    const user = new Uesr(req.body);

    try {
        var userInfo = await user.save();
        console.log('user info', userInfo)
        res.send(userInfo);
    } catch (e) {
        res.status(400)
        console.log("error", e)
    }
});
router.get('/users', (req, res) => {
    var userId = req.query.id
    console.log('userId', userId)
    Uesr.findById(userId).then((result) => {
        console.log('result..', result)
        res.send(result)
    }).catch((e) => {
    console.log('error',e)
    })
})

module.exports = router;
