const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require("./models/tasks")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000



// app.use((req,res,next) => {
//         res.status(503).send("site is under maintainence. plase visit some time later")
//     }
// )




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

















app.listen(port,()=>{
    console.log('server is up on port '+port)
})