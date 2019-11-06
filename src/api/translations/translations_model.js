import { model, Schema } from 'mongoose';
import { LocaledObject } from '../../../src/models/localedObject';

export const TranslationModel = model('Translation', new Schema({
  page: String,
  source: String,
  locales: [LocaledObject],
}, { versionKey:false }))