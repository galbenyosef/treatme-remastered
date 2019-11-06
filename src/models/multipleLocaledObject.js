import mongoose , {Schema} from 'mongoose'

export const createMultipleLocaledObject = (object) => mongoose.Schema({

  localeId:{type: Number, ref: 'Locales'},
  value:[object]

},{ _id: false})