

module.exports={

    attributes:{
        subject:{
            type: 'string',
            limit: 200,
            required:true
        },
        from : {
            type : 'string',
            limit : 255,
            required:true
        },
        to:{
            type: 'string',
            limit: 255,
            required:true
        },
        service:{
            type:'string',
            required:true
        },
        cc: {
            type: 'string',
            limit: 255
        },
        bcc:{
            type: 'text'
        },
        content: {
            type: 'ref'
        },
        attachments: {
            type: 'ref',
        },
        sendInfo: {
            type: 'ref'
        },
        fullName: {
            type : 'string'
        }
    }

}