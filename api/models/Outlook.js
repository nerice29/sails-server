

module.exports = {

    attributes:{

        refreshToken : {
            type : 'string'
        },
        token : {
            type : 'string'
        },
        owner: {
            model: 'person',
            required: true,
        },
        tokenExpireDate: {

            type : 'number'
        },

        idToken : {
            type : 'string'
        }
    }
}
