import mongoose from 'mongoose'
import vCard from 'vcards-js'
import { LocaledObject } from '../../helpers/localedObject'

const dayHours = {
  from:Date,
  to:Date,
}

const weekDays = {
  sunday:[dayHours],
  monday:[dayHours],
  tuesday:[dayHours],
  wednesday:[dayHours],
  thursday:[dayHours],
  friday:[dayHours],
  saturday:[dayHours],
}

const Location = {
  streetname: LocaledObject,
  streetnumber: '',
  postcode: '',
  name: LocaledObject,
  role: LocaledObject,
  accessibility: Boolean,
  city: LocaledObject,
  country: LocaledObject,
  mobile: '',
  email: '',
  activityTime: { type: weekDays },
  comment: LocaledObject
}


const Certification = {
  institute: LocaledObject,
  degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree' },
  degreeName: LocaledObject,
  end: '',
  comment: LocaledObject,
}

const Button = {
  data:[],
  checked:false
}

const Language = {
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  level: String,
}

const Buttons = {

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

}

const UserSchema = mongoose.Schema({

    username: { type: String, unique: true, lowercase: true, trim:true},
    email: { type: String, lowercase: true, trim:true},
    password: String,
    firstname: LocaledObject,
    lastname: LocaledObject,
    mobile: String,
    description: LocaledObject,
    gender: {type: String, lowercase: true, enum: ['male', 'female', '']},

    title: { type: mongoose.Schema.Types.ObjectId, ref: 'Title' },
    mainSpeciality: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' },
    specialities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }],
    languages: [Language],
    hmos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HMO' }],

    images: [String],

    certifications: [Certification],
   
    locations: [Location],

    about: LocaledObject,

    buttons: Buttons,

    vcard: [],

    searchable: { type: Boolean, default:true },
    active: { type: Boolean, default:true }, //toggled by user
    inactive: { type: Boolean, default: false }, //toggled by admin
    payment: { type: Boolean },
    deleted: { type: Boolean, default:false },
    verified: { type: Boolean, default:true },
    forgotpassMailSent: { type: Number, default:0 },
    type: {type: String},
    authorized: { type: [String] },
},{
  versionKey: false,
  timestamps: true
});

export const UserModel = mongoose.model('User', UserSchema);