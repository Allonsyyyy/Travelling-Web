import clientsModel from '../Models/clients.js';
import {model, Types} from 'mongoose';

const clients = model('clients', clientsModel);

const clientsService = {
    getAllClients: () => {
        return clients.find();
    },
    getClientById: async (id) => {
        try{
            return await clients.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    getClientByEmail: (email) => {
        try{
            return clients.findOne({email: email});
        }
        catch(err) {
            return null;
        }
    },
    createClient: (user) => {
        return clients.create(user);
    },
    updateClient: (id, user) => {
        return clients.findByIdAndUpdate(id, user);
    },
    deleteClient: (id) => {
        return clients.findByIdAndDelete(id);
    },
    updateToken: async (id, token) => {
        return clients.findByIdAndUpdate(id, {token: token});
    },
    deleteToken: (id) => {
        return clients.findByIdAndUpdate(id, {token: ""});
    }
}

export default clientsService;