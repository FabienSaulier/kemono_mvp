import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

Schema = {};

AddressSchema = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  country: {
    type: String
  },
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode
  }
});

VetSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  phone:{
    type: String
  },
  adress:{
    type:AddressSchema
  }
})

Schema.UserProfile = new SimpleSchema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    sex:{
      type:String,
      allowedValues: ['male', 'female']
    },
    birthday:{
      type: Date,
      optional: true
    },
    picture:{
      type: String,
      optional: true
    },
    phone:{
      type: String
    },
    address: {
      type: String,
      max: 100
    },
    city: {
      type: String,
      max: 50
    },
    country: {
      type: String
    },
    zipCode: {
      type: String,
      regEx: SimpleSchema.RegEx.ZipCode
    },
    description:{
      type:String,
      optional:true
    },
    vet:{
      type:VetSchema,
      optional:true
    }
});

Schema.MangoP = new SimpleSchema({
    user_id:{
      type:String,
      optional:true
    },
    wallet_id:{
      type:String,
      optional:true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    pets_id:{
      type: [String],
      optional: true
    },
    mangop:{
      type: Schema.MangoP,
      optional:true
    }
});

Meteor.users.attachSchema(Schema.User);
