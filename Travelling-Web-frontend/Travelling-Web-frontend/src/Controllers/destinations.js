import destinationService from '../Services/destinations.js';
import hotelsService from '../Services/hotels.js';
import ResponseObj from '../ResponseObj/index.js';
import Valid from "../Valid/valid.js";

const destinationController = {
    getAllDestinations: async () => {
        return ResponseObj(200, "success", await destinationService.getAllDestinations());
    },

    getDestinationById: async (id) => {
        let rs = await destinationService.getDestinationById(id);
        if(rs === null || rs.length === 0) {
            return ResponseObj(404, "Destination not found", rs);
        }
        return ResponseObj(200, "success", rs);
    },

    getDestinationDetail: async (id) => {
        let result = await destinationService.getDestinationById(id);
        if (result === null || result.length === 0) {
            return ResponseObj(404, "Destination not found", result);
        }
        await hotelsService.getAllHotels().then((res) => {
            let listHotel = []
            result.nearHotel.forEach(element => {
                res.forEach(hotel => {
                    if (hotel._id === element.hotelId) {
                        const data = {
                            "hotelId": hotel._id,    
                            "name": hotel.name,
                            "image": hotel.image,
                            "price": hotel.price,
                            "address": hotel.address,
                            "rating": hotel.rating,
                            "distance": element.distance
                        }
                        listHotel.push(data);
                    }
                });
            });
            result.nearHotel = listHotel;
        });
        return ResponseObj(200, "success", result);
    },
    createDestination: async (destination) => {
        if(Valid.Empty(destination.name) || Valid.Empty(destination.image) || Valid.Empty(destination.price) || Valid.Empty(destination.nearHotel)) {
            return ResponseObj(400, "Invalid data", null);
        }
        try{
            await destinationService.createDestination(destination);
            return ResponseObj(200, "success", destination);
        }
        catch(err) {
            return ResponseObj(500, "Server error", null);
        }
    },

    updateDestination: async (id, destination) => {
        if(Valid.Empty(destination.name) || Valid.Empty(destination.image) || Valid.Empty(destination.price) || Valid.Empty(destination.nearHotel)) {
            return ResponseObj(400, "Invalid data", null);
        }
        let preDestination = await destinationService.getDestinationById(id);
        if (preDestination === null || preDestination.length === 0) {
            return ResponseObj(404, "Destination not found", preDestination);
        }
        if(destination.name == preDestination.name && destination.image == preDestination.image && destination.price == preDestination.price && destination.nearHotel == preDestination.nearHotel) {    
            return ResponseObj(400, "No change", null);
        }
        return ResponseObj(200, "success", await destinationService.updateDestination(id, destination));
    },

    deleteDestination: async (id) => {
        return ResponseObj(200, "success", await destinationService.deleteDestination(id));
    }
}

export default destinationController;