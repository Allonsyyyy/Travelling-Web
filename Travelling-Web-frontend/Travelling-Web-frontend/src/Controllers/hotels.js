import HotelsService from "../Services/hotels.js";
import ResponseObj from "../ResponseObj/index.js";
import Valid from "../Valid/valid.js";

const HotelsController = {
    getAllHotels: async () => {
        return ResponseObj(200, "success", await HotelsService.getAllHotels());
    },

    getHotelById: async (id) => {
        let result = await HotelsService.getHotelById(id);
        if (result === null) {
            return ResponseObj(404, "Hotel not found", null);
        }
        return ResponseObj(200, "success", result);
    },

    createHotel: async (Hotel) => {
        if(Valid.Empty(Hotel.name) || Valid.Empty(Hotel.image) || Valid.Empty(Hotel.price) || Valid.Empty(Hotel.address) || Valid.Empty(Hotel.rating)) return ResponseObj(400, "Invalid data", null);
        try{
            await HotelsService.createHotel(Hotel);
            return ResponseObj(200, "success", Hotel);
        }
        catch(err){
            return ResponseObj(300, err, null);
        }
    },

    updateHotel: async (id,Hotel) => {
        if(Valid.Empty(Hotel.name) || Valid.Empty(Hotel.image) || Valid.Empty(Hotel.price) || Valid.Empty(Hotel.address) || Valid.Empty(Hotel.rating)) return ResponseObj(400, "Invalid data!", null);

        let preHotel = await HotelsService.getHotelById(id);
        if(preHotel === null) return ResponseObj(300, "Hotel not found", null);
        
        if(Hotel.name == preHotel.name && Hotel.image == preHotel.image && Hotel.price == preHotel.price && Hotel.address == preHotel.address && Hotel.rating == preHotel.rating) return ResponseObj(400, "Nothing change!", null);
    
        try{
            await HotelsService.updateHotel(id, Hotel);
            return ResponseObj(200, "success", Hotel);
        }
        catch(err){
            return ResponseObj(300, "Can't update Hotel", null);
        }
    
    },

    deleteHotel: async (id) => {
        try{
            await HotelsService.deleteHotel(id);
            return ResponseObj(200, "success", null);
        }
        catch(err){
            return ResponseObj(300, "Hotel not found", null);
        }
    },
}

export default HotelsController;