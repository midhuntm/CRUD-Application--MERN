const express = require('express');
const users = require('../models/userSchema');
const router = express.Router();


router.get('/getdata',async(req,res) => {
    const getData = await users.find({});
    res.status(201).json(getData);

})
router.post('/register',async(req,res) => {
    const {name,email,age,mobile,work,add,desc} = req.body;
    if(!name || !email || !age || !mobile || !work || !add || !desc)
    {
        res.status(422).json('Please fill the data');
        console.log('Please fill the data');
    }
    else
    {
        try
        {
            const alreadyLogin = await users.findOne({email : email});
            if(alreadyLogin){
                res.status(404).send({result : 'This email exists'});
            }
            else
            {
                const addUser = new users({
                    name: name,email:email,age : age,mobile : mobile,work : work,add : add,desc : desc
                })
                await addUser.save();       
                res.status(201).json({users : addUser});    
            }
        }
        catch(error)
        {
            res.status(404).json(error.message);
        }
    }
    
})
router.post('/read',async(req,res) => {
    const name = req.body.name;
    const getUser = await users.findOne({name : name})
    res.status(201).json({data : getUser});
    console.log(name);
})
router.get('/view/:id',async(req,res) => {
    try{
        const {id} = req.params;
    const getIndividual = await users.findById({_id : id});
    res.status(201).json(getIndividual);
    }
    catch(error)
    {
        res.status(422).json(error);
    }
})
router.put('/edit/:id',async(req,res) => {

    try{
        const {id} = req.params;
    const updateUser = await users.findByIdAndUpdate(id,req.body,{
    
    });
    res.status(201).json(updateUser);
    }
    catch(error)
    {
        res.status(422).json(error);
    }

})

router.delete('/delete/:id',async(req,res) => {
    try{
        const {id} = req.params;
    const deleteUser = await users.findByIdAndDelete({_id : id})
    console.log(deleteUser);
    res.status(201).json(deleteUser);
    }
    catch(error)
    {
        res.status(422).json(error);
    }
    
})

module.exports = router;