import { Meteor } from 'meteor/meteor';



export const testMail = new ValidatedMethod({
  name: 'mails.testMail',
  validate: null,
  run() {
    console.log("test mail server meth");

    Email.send({
      to: "fsaulier@gmail.com",
      from: "noreply@kemono.fr",
      subject: "Example Email",
      text: "The contents of our email in plain text.",
    });

  },
});
