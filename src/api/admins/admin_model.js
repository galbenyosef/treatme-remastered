import { Schema,model } from 'mongoose';

export const AdminModel = model('Admin', new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { versionKey:false }))