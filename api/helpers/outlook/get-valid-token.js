const moment = require('moment')

module.exports = {


    friendlyName: 'Get valid token',


    description: '',


    inputs: {
        owner:{
            type: 'string'
        }
    },


    exits: {

        success: {
            outputFriendlyName: 'Valid token',
            outputType: 'ref'
        },

    },


    fn: async function (inputs, exits) {
        // retry access of account outlook
        let account = await Outlook.find({owner:inputs.owner}).limit(1)
        if(!account.length){
            return exits.error('Customer never auth')
        }
        account = account[0]
        // Get valid token.
        const FIVE_MINUTES = 30000;
        let tokenExpire = moment(account.tokenExpireDate - FIVE_MINUTES);
        // when access is expired we will take another
        console.log('account Start',moment().toJSON(),'>>>', moment(account.tokenExpireDate).toJSON(),moment().isAfter(tokenExpire))
        if(moment().isAfter(tokenExpire)){

            let {token} = await sails
                .authOutlook()
                .accessToken
                .create({
                    refresh_token: account.refreshToken
                })
                .refresh();

                account = await sails
                .helpers
                .outlook
                .setCredentials
                .with({
                    refreshToken: token.refresh_token,
                    token: token.access_token,
                    clientId: inputs.owner,
                    tokenExpireDate: token.expires_at.getTime(),
                    idToken: token.access_token
                });
        }

        console.log('New account => ',account)
        // Send back the result through the success exit.
        return exits.success(account);

    }


};

