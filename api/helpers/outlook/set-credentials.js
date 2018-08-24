module.exports = {


    friendlyName: 'Create or update data',


    description: 'Create outlook data',


    inputs: {

        token : {
            type : 'string',
            required : true
        },
        tokenExpireDate: {
            type : 'string',
            required : true
        },

        idToken : {
            type : 'string'
        },
        refreshToken : {
            type : 'string',
            required :true
        },
        clientId : {
            type:'string',
            required:true
        },
        tokenIsExpired : {
            type: 'boolean',
            defaultsTo: false,
        }
    },

    exits: {

    },


    fn: async function (inputs, exits) {

        let outlook = await Outlook.findOne({owner: inputs.clientId });

        if(!outlook){
            outlook = await Outlook.create({..._.omit(inputs,'clientId'),owner: inputs.clientId }).fetch()

        }else{
            outlook = await Outlook.update({owner: inputs.clientId },{..._.omit(inputs,'clientId '),owner: inputs.clientId }).fetch()
            outlook = outlook[0]
        }

        exits.success(outlook)

    }


};
