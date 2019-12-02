import { model,Schema } from 'mongoose';
import { LocaledObject } from '../../helpers/localedObject';

export const SpecialityModel = model('Speciality', new Schema({
    parent_id: { type: Schema.Types.ObjectId, ref:'Speciality' },
    name: LocaledObject,
    createdBy: {type: Schema.Types.ObjectId, ref:'User' },
  }, { 
    versionKey:false,
    timestamps:true
  })
);
