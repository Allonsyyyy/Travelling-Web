import { Schema} from 'mongoose';

const hotel = new Schema({
    _id: {type:Number},
    name: {type:String},
    image: {type:String},
    price: {type:Number},
    address: {type:String},
    rating: {type:Number},
})

export default hotel;