/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const jwt = require('jsonwebtoken');
const schedule= require('node-schedule');
module.exports.bootstrap = async function(done) {

    // Don't seed fake data when running in production.
    if (process.env.NODE_ENV === 'production') {
        return done();
    }

   // schedule.scheduleJob(sails.helpers.job.key,await sails.helpers.job())

   Object.keys(sails.config.crontab).forEach(async function(key){
      let val = await  sails.config.crontab[key]
      schedule.scheduleJob(key,val)
   })
   if(await  Person.count() > 0){return done()}

   let person = await Person.create({
       lastName:'HOUNSA',
       firstName:'Nérice',
       password:'pwd29',
       sex:'M',
       email:'nericeeno@gmail.com',
       profession:'developer',
       phoneNumber:'+229 96 82 01 90'
   }).fetch()

    //console.log("fake person created => ", person)

    let user=await User.create({
        lastName:person.lastName,
        firstName:person.firstName,
        password:'admin29',
        sex:person.sex,
        email:person.email,
        profession:person.profession,
        phoneNumber:person.phoneNumber,
        status:'ADMIN'
    }).fetch()

    //console.log("fake admin user => ", user)
    let expireDate= Math.floor(Date.now() / 1000) + (60 * 60) //1 heure
    let token = await jwt.sign({exp:expireDate,data:user},'_secret')
    if(!token){exits.error("user authorization failed")}

    let credential=await Token.create({
        owner: user.id,
        token: token,
        tokenExpireDate:expireDate
    }).fetch()
    //console.log("bootstrap:::credential=>",credential)

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
