
module.exports.outlook={

    id: "f96ad221-16b4-4522-ae92-bcb9f72f19e3",
    secret:"acxKU72$_ekalDUPEE719*$",
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token',
    redirectUri : "http://localhost:1337/api/outlook/open",
    APP_SCOPES : "openid profile offline_access User.Read Mail.Read Calendars.Read Contacts.Read",
    //credentials : credentials,
    //oauth2 :

}
