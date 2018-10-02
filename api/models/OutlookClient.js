
module.exports = {

    attributes:{

        clientRedirectUrl : {
            type : 'string',
            required :true
        },
        owner: {
            model: 'user',
        },
        response : {
            type : 'json'
        }
    }
}