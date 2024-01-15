const Task = require('../src/models/tasks')
require('../src/db/mongoose')


// Task.findByIdAndRemove('61f4e32cb0d8191a74f951d6').then((task)=>{
//     console.log(task)
//         return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteTaskAndCount = async(id,completed)=>{
    const task = Task.findByIdAndDelete(id)
    const count = Task.countDocuments({completed:false})
    return count
}


deleteTaskAndCount("61f4e36bf121460538b3365f").then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
