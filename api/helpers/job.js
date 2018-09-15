
module.exports={

    friendlyName:'',
    description:'',
    inputs:{

    },
    exits:{

    },
    fn: async function(inputs,exits){

        let person =await Person.find()

        if(!person){return exits.notFound()}

        console.log('person=>',person)

       return exits.success(person)
    }
}