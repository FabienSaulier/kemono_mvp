import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Pets = new Mongo.Collection('Pets');
export default Pets;


Pets.schema = new SimpleSchema({
  _id:{
    type:String,
    regEx:SimpleSchema.RegEx.Id
  },
  name: {
    type: String,
    min:3
  },
  type: {
    type: String,
    allowedValues: ['DOG', 'CAT', 'NAC']
  },
  sex: {
    type: String,
    allowedValues: ['MALE', 'FEMALE']
  },
  birthday: {
    type: Date
  },
  origin: {
    type: String,
    allowedValues: ['BREEDING', 'SHELTER', 'HOSTFAMILY', 'GIVEN', 'FOUND', 'OTHER']
  },
  race: {
    type: String,
    optional:true
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
  },
  healthProblem: {
    type: Boolean
  },
  healthProblemDesc: {
    type: String,
    optional:true
  },
  picture: {
    type: String,
    optional: true
  },
  livingArea: {
    type: String,
    allowedValues: ['INSIDE_AND_OUTSIDE', 'INSIDE_ONLY', 'OUTSIDE_ONLY']
  },
  description: {
    type: String,
    optional:true
  }
});

Pets.attachSchema(Pets.schema);
