import { model,Schema } from 'mongoose';

export const LanguageModel = model('Language', new Schema({
  name: String,
  symbol: String,
}, { versionKey:false }));