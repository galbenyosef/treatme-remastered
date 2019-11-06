import mongoose, { Schema } from 'mongoose'

export const LocaledObject = mongoose.Schema({

  localeId:{type: Number, ref: 'Locale'},
  value:String

},{ _id: false})