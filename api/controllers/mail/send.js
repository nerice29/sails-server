

module.exports={

    friendlyName:'',

    description:'',

    inputs:{
        senderMail:{
            type:'string',
            required:true
        },
        senderPassword:{
            type:'string',
            required:true
        },
        receiverMail:{
            type:'string',
            required:true
        },
        subject:{
            type:'string',
            required:true
        },
        body:{
            type:'string',
            required:true
        }
    },
    exits:{

    },
    fn:async function(inputs,exits){

        let res = await sails.helpers.gmail.send.with(
            {
                senderMail:inputs.senderMail,
                senderPassword:inputs.senderPassword,
                receiverMail:inputs.receiverMail,
                subject:inputs.subject,
                body:inputs.body
            }
        ).intercept('transporterError',()=>{
            return new Error('Transporter error.');
        })
         .intercept('sendMailError',()=>{
             return new Error('Sending error.');
         })

        return exits.success(res)
    }
}