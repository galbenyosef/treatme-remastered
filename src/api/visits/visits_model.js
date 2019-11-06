import { model,Schema } from 'mongoose';
import moment from 'moment'

export const VisitModel = model('Visit', new Schema({
  ipaddress: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type:Date, default:moment.now() },
}, { versionKey:false }))