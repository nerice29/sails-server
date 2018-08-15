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

module.exports.bootstrap = async function(done) {

    // Don't seed fake data when running in production.
    if (process.env.NODE_ENV === 'production') {
        return done();
    }


   if(await  User.count() > 0){return done()}

   let user = await User.create({
       lastName:'HOUNSA',
       firstName:'Nérice',
       password:'pwd29',
       sex:'M',
       email:'nericeeno@gmail.com',
       profession:'developer',
       phoneNumber:'+229 96 82 01 90'
   }).fetch()

    console.log("fake user created => ", user)

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
