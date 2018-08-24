
module.exports={

    attributes:{
        owner:{
            model:'user',
            required:true
        },
        token:{
            type:'string',
            required:true
        },
        tokenExpireDate:{
            type:'string',
            required:true
        }
    }
}
