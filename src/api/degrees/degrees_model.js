import { model,Schema } from 'mongoose';
import { LocaledObject } from '../../helpers/localedObject';

export const DegreeModel = model('Degree', new Schema({
  name: LocaledObject,
  createdBy: {type: Schema.Types.ObjectId, ref:'User'},
}, { 
  versionKey:false,
  timestamps:true
}));