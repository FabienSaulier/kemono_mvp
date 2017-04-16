import { Meteor } from 'meteor/meteor';
import './accounts/email-templates';
import './browser-policy';
import './fixtures';
import './api';
import './mail-url.js';

const imageStore = new FS.Store.S3("images", {
  region: "eu-central-1",
  accessKeyId: Meteor.settings.private.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.private.AWS_SECRET_ACCESS_KEY,
  bucket: Meteor.settings.private.S3_BUCKET
});

Images = new FS.Collection("Images", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
  insert: function() { return true; },
  update: function() { return true; }
});

export default Images;
