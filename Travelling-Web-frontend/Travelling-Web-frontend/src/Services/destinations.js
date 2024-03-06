import destinationsModel from '../Models/destinations.js';
import {model, Types} from 'mongoose';

const destinations = model('destinations', destinationsModel);

const destinationsService = {
    getAllDestinations: () => {
        return destinations.find();
    },
    getDestinationById: (id) => {
        try{
            return destinations.findById(id);
        }
        catch(err){
            return null;
        }
    },
    createDestination: (destination) => {
        try{
            return destinations.create(destination);
        }
        catch(err){
            return null;
        }
    },
    updateDestination: (id, destination) => {
        try{
            return destinations.findByIdAndUpdate(id, destination);
        }
        catch(err){
            return null;
        }
    },
    deleteDestination: (id) => {
        try{
            return destinations.findByIdAndDelete(id);
        }
        catch(err){
            return null;
        }
    }
}

export default destinationsService;