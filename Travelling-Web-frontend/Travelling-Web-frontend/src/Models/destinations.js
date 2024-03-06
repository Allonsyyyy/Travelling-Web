import { Schema} from 'mongoose';

const destination = new Schema({
    _id: {type:Number},
    name: {type:String},
    image: {type:String},
    price: {type:Number},
    nearHotel: {type:Array},
})

export default destination;