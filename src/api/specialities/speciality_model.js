import { model,Schema } from 'mongoose';
import { LocaledObject } from '../../../src/models/localedObject';
import moment from 'moment'

export const SpecialityModel = model('Speciality', new Schema({
    parent_id: { type: Schema.Types.ObjectId, ref:'Speciality' },
    locales: [LocaledObject],
    created: { type:Date, default:moment.now() },
    by: {type: Schema.Types.ObjectId, ref:'User' },
    new: {type: Boolean, default:false}
  }, { versionKey:false })
);
