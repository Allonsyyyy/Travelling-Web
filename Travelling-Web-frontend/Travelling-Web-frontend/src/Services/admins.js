import AdminsModel from '../Models/admins.js';
import {model, Types} from 'mongoose';

const Admins = model('Admins', AdminsModel);

const adminsService = {
    getAllAdmins: () => {
        return Admins.find();
    },
    getAdminById: async (id) => {
        try{
            return await Admins.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    getAdminByEmail: (email) => {
        try{
            return Admins.findOne({email: email});
        }
        catch(err) {
            return null;
        }
    },
    createAdmin: (user) => {
        return Admins.create(user);
    },
    updateAdmin: (id, user) => {
        return Admins.findByIdAndUpdate(id, user);
    },
    deleteAdmin: (id) => {
        return Admins.findByIdAndDelete(id);
    },
    updateToken: async (id, token) => {
        return Admins.findByIdAndUpdate(id, {token: token});
    },
    deleteToken: (id) => {
        return Admins.findByIdAndUpdate(id, {token: ""});
    }
}

export default adminsService;