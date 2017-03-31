import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Pets = new Mongo.Collection('Pets');
export default Pets;

Pets.schema = new SimpleSchema({
  name: {
    type: String
  },
  picture: {
    type: String,
    optional: true
  },
  type: {
    type: String
  },
  sex: {
    type: String,
    allowedValues: ['male', 'female']
  },
  birthday: {
    type: String,
    regEx: /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/
  },
  origin: {
    type: String
  },
  sterilized: {
    type: Boolean
  },
  vaccines: {
    type: Boolean,
    label:'vaccines up to date'
  },
  vaccinesPics: {
    type: String
  }
});

Pets.attachSchema(Pets.schema);
