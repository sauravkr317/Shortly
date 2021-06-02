import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const urlSchema = new Schema({
    long_url: {type: String, required: true},
    short_id: {type: String, required: true},
    short_url: {type: String, required: true}
},{timestamps: true});

export default mongoose.model('url', urlSchema, 'urls');
