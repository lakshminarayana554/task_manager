const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/tasks')


router.post('/tasks',auth,async(req,res)=>{
    const task = new Task({
        ...req.body,
    owner:req.user._id
    })
    
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})






// READ task

router.get('/tasks',async(req,res)=>{
   
   try{
        const task = await Task.find({})
        res.send(task)
   }catch(e){
        res.status(400).send()
   }
   
   
   
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)

    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

router.get('/tasks/:id',async (req, res) => {
    const _id = req.params.id
 try{
    const task = await Task.findById(_id)
    if (!task) {
        return res.status(404).send()
    }

    res.send(task)
 }catch(e){
        res.status(500).send(e)
 }

//     if (_id.length != 24) {
//         res.status(404).send()
//     } else {
//         Task.findById(_id).then((task) => {
//             if (!task) {
//                 return res.status(404).send()
//             }
//             res.send(task)
//         }).catch((e) => {
//             res.status(500).send(e)
//         })
//     }
 })



//UPDATE 



router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description','completed']
    const isValidoperation = updates.every((update)=>allowedUpdate.includes(update))

    if(!isValidoperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{

        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update]=req.body[update])

        await task.save()

       // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        if(!task){
            res.status(404).send()
        }res.send(task)
    }catch(e){
        res.status(400).send()
    }


})

//DELETE





router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }res.send(task)
    }catch(e){
            res.status(500).send()
    }
})


module.exports = router