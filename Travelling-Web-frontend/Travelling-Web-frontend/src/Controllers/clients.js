import clientsService from "../Services/clients.js";
import blogsService from "../Services/blogs.js"
import commentsService from "../Services/comments.js"
import ResponseObj from "../ResponseObj/index.js";
import TokenService from "../Services/token.js";
import Valid from "../Valid/valid.js";

const clientsController = {
    login: async (user) => {
        const client = await clientsService.getClientByEmail(user.email);
        if(client === null) return ResponseObj(300, "User not found", null);
        if(client.password !== user.password) return ResponseObj(300, "Password is not correct", null);
        const token = TokenService.createToken(client._id);
        const rs = {
            "_id": client._id,
            "userName": client.userName,
            "image": client.image,
            "email": client.email,
            "token": token
        }
        await clientsService.updateToken(client._id, token);
        return ResponseObj(200, "success", rs);
    },

    loginByToken: async (body) => {  
        
        if(Valid.Empty(body.token)) return ResponseObj(300, "Token is not found", null);
        const id = body.token.split(".")[0];
        const client = await clientsService.getClientById(id);
        if(client === null) return ResponseObj(300, "User not found", null);
        if(client.token !== body.token) return ResponseObj(300, "Token is not correct", null);
        if(!TokenService.checkTokenExpiry(body.token)) return ResponseObj(300, "Token is expired", null);
        const rs = {
            "_id": client._id,
            "userName": client.userName,
            "image": client.image,  
            "email": client.email,
            "token": body.token
        }
        return ResponseObj(200, "success", rs);
    },

    logout: async (body) => {
        if(body.id == null) return ResponseObj(300, "Id is not found", null);
        const client = await clientsService.getClientById(body.id);
        if(client === null) return ResponseObj(300, "User not found", null);
        await clientsService.deleteToken(body.id);
        return ResponseObj(200, "success", null);
    },

    getAllClients: async () => {
        return ResponseObj(200, "success", await clientsService.getAllClients());
    },

    getClientById: async (id) => {
        let result = await clientsService.getClientById(id);
        if (result === null) {
            return ResponseObj(404, "User not found", null);
        }
        return ResponseObj(200, "success", result);
    },

    getClientByEmail: async (email) => {
        let result = await clientsService.getClientByEmail(email);
        if (result === null) {
            return ResponseObj(404, "User not found", null);
        }
        return ResponseObj(200, "success", result);
    },

    createClient: async (user) => {
        if(Valid.Empty(user.userName)) return ResponseObj(300, "Username is not valid", null)
        if(Valid.Empty(user.email)) return ResponseObj(300, "Email is not valid", null)
        if(Valid.Empty(user.password)) return ResponseObj(300, "Password is not valid", null)
        try{
            await clientsService.createClient(user);
            return ResponseObj(200, "success", user);
        }
        catch(err){
            return ResponseObj(300, Object.keys(err.keyPattern)[0] + " is exist", null);
        }
    },

    updateClient: async (id,user) => {
        let preUser = await clientsService.getClientById(id);
        if(preUser === null) return ResponseObj(300, "User not found", null);
        
        if(Valid.Empty(user.userName) || Valid.Empty(user.email) || Valid.Empty(user.password)) return ResponseObj(300, "Invalid data", null);

        let check = await clientsService.getClientByEmail(user.email);
        if(check !== null && String(check._id) !== String(id)) return ResponseObj(300, "Email is already existed", null);

        if(user.password === preUser.password && user.userName === preUser.userName && user.email === preUser.email && user.image === preUser.image) return ResponseObj(300, "Nothing change", null);

        try{
            await clientsService.updateClient(id, user);
            return ResponseObj(200, "success", user);
        }
        catch(err){  
            return ResponseObj(300, "can't update user", null);
        }
    },

    deleteClient: async (id) => {
        try{
            await clientsService.deleteClient(id);
            await blogsService.deleteBlogByAuthorId(id);
            await commentsService.deleteCommentByAuthorId(id);
            return ResponseObj(200, "success", null);
        }
        catch(err){
            return ResponseObj(300, "User not found", null);
        }
    }
}

export default clientsController;