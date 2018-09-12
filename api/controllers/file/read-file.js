



module.exports={

    friendlyName:'',
    description:'',
    inputs:{

    },
    exits:{

    },
    fn:async function(inputs,exits){

        let data = await sails.helpers.fs.readFile()

        if(!data){return exits.error("api cannot read file")}

        return exits.success(data)
    }
}