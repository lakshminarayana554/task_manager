require('../src/db/mongoose')
const User =require('../src/models/user')

// User.findByIdAndUpdate('61f4ed45bfc2c93f7c754202',{age:1}).then((user)=>{
//   console.log(user)
//   return User.countDocuments({age:1})
// }).then((result)=>{
//  console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const UpdateAndCount = async (id,age)=>{
     const user = await User.findByIdAndUpdate(id,{age})
     const count = await User.countDocuments({age})
     return count
}


UpdateAndCount('61f4ed911b1b9727445a6628',22).then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})


