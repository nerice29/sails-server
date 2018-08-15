
module.exports={

    friendlyName:'register',

    description : 'register person',

    inputs : {
        lastName: {
            type: 'string',
            required: true
        },
        firstName: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        sex: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string'
        },
        profession: {
            type: 'string',
        },
        phoneNumber: {
            type: 'string',
            allowNull: true
        },
    },
    exits : {

    },

    fn : async function(inputs,exits){

        let person=await Person.create(inputs).fetch()

        if(! person){return exits.error("cannot create person ! ")}

        //TODO : send confirmation mail to person when he confirm register him as user

        let user = await User.create({
            lastName:person.lastName,
            firstName:person.firstName,
            password:person.password,
            sex:person.sex,
            email:person.email,
            profession:person.profession,
            phoneNumber:person.phoneNumber,
            status:'PARTICULAR'
        }).fetch()

        return exits.success(user)
    }
}