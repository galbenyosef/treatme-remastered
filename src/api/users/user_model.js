import mongoose from 'mongoose'
import vCard from 'vcards-js'
import { LocaledObject } from '../../../src/models/localedObject';
import { createMultipleLocaledObject } from '../../../src/models/multipleLocaledObject';

const dayHours = mongoose.Schema({
  from:Date,
  to:Date,
},{ _id: false})

const weekDays = mongoose.Schema({
  sunday:[dayHours],
  monday:[dayHours],
  tuesday:[dayHours],
  wednesday:[dayHours],
  thursday:[dayHours],
  friday:[dayHours],
  saturday:[dayHours],
},{ _id: false})

const Location = mongoose.Schema({
  streetname: '',
  streetnumber: '',
  postcode: '',
  name: '',
  position: '',
  accessibility: Boolean,
  city: '',
  country: '',
  mobile: '',
  email: '',
  daily_operations: { type: weekDays },
  comment: ''
},{ _id: false})


const Certification = mongoose.Schema({
  institute: '',
  degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree' },
  degreeName: '',
  end: '',
  comment: '',
},{ _id: false})

const Button = mongoose.Schema({
  data:[],
  checked:false
},{ _id: false})

const Language = mongoose.Schema({
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  level: String,
}, { _id: false});

const Buttons = mongoose.Schema({

  call: Button,
  facebook: Button,
  gmail: Button,
  googleplus: Button,
  instagram: Button,
  linkedin: Button,
  messenger: Button,
  pinterest: Button,
  sms: Button,
  snapchat: Button,
  skype: Button,
  telegram: Button,
  twitter: Button,
  whatsapp: Button,
  website: Button,
  waze: Button,
  youtube: Button,

},{ _id: false})

const UserSchema = mongoose.Schema({

    username: { type: String, unique: true, lowercase: true},
    email: { type: String, lowercase: true},
    password: String,
    firstname: { type: [LocaledObject], lowercase: true},
    lastname: { type: [LocaledObject], lowercase: true},
    mobile: String,
    description: { type: [LocaledObject], lowercase: true},
    gender: {type: String, lowercase: true, enum: ['male', 'female', '']},

    title: [createMultipleLocaledObject({ type: mongoose.Schema.Types.ObjectId, ref: 'Title' })],
    mainSpeciality: [createMultipleLocaledObject({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' })],
    specialities: [createMultipleLocaledObject({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' })],
    languages: [Language],
    hmos: [createMultipleLocaledObject({ type: mongoose.Schema.Types.ObjectId, ref: 'HMO' })],

    images: [String],

    certifications: [createMultipleLocaledObject(Certification)],
   
    locations: [createMultipleLocaledObject(Location)],

    about: [LocaledObject],

    buttons: Buttons,

    vcard: [createMultipleLocaledObject({})],

    searchable: { type: Boolean, default:true },
    active: { type: Boolean, default:true }, //toggled by user
    inactive: { type: Boolean, default: false }, //toggled by admin
    payment: { type: Boolean },
    deleted: { type: Boolean, default:false },
    verified: { type: Boolean, default:false },
    forgotpassMailSent: { type: Number, default:0 },
    createdDate: { type: Date, default: Date.now},
    type: {type: String},
    authorized: { type: [String] },
},{
  versionKey: false,
});

export const UserModel = mongoose.model('User', UserSchema);