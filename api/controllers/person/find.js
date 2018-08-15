

module.exports={

    friendlyName:'find',

    description:'find a person',

    inputs : {

    },

    exits:{

        notFound: {
            description: 'The specified person was found in the database.',
            responseType: 'notFound'
        }
    },

    fn:async function (inputs,exits){

        let persons = await Person.find()

        if(!persons){return exits.notFound()}

        return exits.success(persons)
    }
}