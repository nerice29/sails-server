
const nodemailer = require('nodemailer');


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
       transporterError:{
           description:'could not created transporter'
       },
        sendMailError:{
           description:'error happened when trying to send the gmail'
        }
    },
    fn:async function(inputs,exits){

       let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:inputs.senderMail,
                pass:inputs.senderPassword
            }
        });
       if(!transporter){throw 'transporterError'}

       let mailOptions = {
           from: inputs.senderMail,
           to: inputs.receiverMail,
           subject: inputs.subject,
           text:inputs.body
       };

        let res = await transporter.sendMail(mailOptions);

        if(!res){ throw 'sendMailError'}

        //save mail sending info
        await Mail.create({
            service:'gmail',
            subject:mailOptions.subject,
            from:mailOptions.from,
            to:mailOptions.to,
            content:mailOptions.text
        })
        return exits.success(res)

    }
}