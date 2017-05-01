import mp2 from 'mangopay2-nodejs-sdk';

/**
doc: https://github.com/Mangopay/mangopay2-nodejs-sdk
**/
export  const MangoPayApi = new mp2({
    clientId: Meteor.settings.private.MANGOPAY_CLIENT_ID,
    clientPassword: Meteor.settings.private.MANGOPAY_CLIENT_PWD,
    debugMode:false,
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    baseUrl: Meteor.settings.private.BASE_URL,
});
