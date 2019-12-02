import { model, Schema } from 'mongoose';
import { LocaledObject } from './../../helpers/localedObject'

export const TranslationModel = model('Translation', new Schema({
  page: String,
  tag: String,
  ...LocaledObject
}, { versionKey:false }))