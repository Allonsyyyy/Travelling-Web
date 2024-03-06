import hotelsModel from '../Models/hotels.js';
import {model, Types} from 'mongoose';

const hotels = model('hotels', hotelsModel);

const hotelsService = {
    getAllHotels: () => {
        return hotels.find();
    },
    getHotelById: async (id) => {
        try{
            return await hotels.findById(id)
        }
        catch(err){
            return null;
        }
    },
    createHotel: (user) => {
        return hotels.create(user);
    },
    updateHotel: (id, user) => {
        return hotels.findByIdAndUpdate(id, user);
    },
    deleteHotel: (id) => {
        return hotels.findByIdAndDelete(id);
    },
}

export default hotelsService;