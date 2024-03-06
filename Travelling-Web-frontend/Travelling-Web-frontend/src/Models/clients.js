import { Schema, Types } from 'mongoose';

const client = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    image: {type:String, default:""},
    userName: {type:String},
    email: {type:String, unique: true},
    password: String,
    token: {type:String, default:""},
    createdAt: {type:Date,default:Date.now},
})

export default client;