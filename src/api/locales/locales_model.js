import {Schema,model} from 'mongoose'
import moment from 'moment'

const LocalesSchema = new Schema({
    _id: Number,
    name: String,
    symbol: String,
    direction: {type: String, default:'ltr'}
}, { versionKey:false })

export const LocalesModel = model('Locales', LocalesSchema);