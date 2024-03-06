import CommentsModel from '../Models/comments.js';
import {model, Types} from 'mongoose';

const Comments = model('Comments', CommentsModel);

const CommentsService = {
    getAllComments: () => {
        return Comments.find();
    },
    
    getCommentById: async (id) => {
        try{
            return await Comments.findById(id);
        }
        catch(err) {
            return null;
        }
    },

    getCommentByAuthorId: async (id) => {
        try{
            return await Comments.find({authorId: id});
        }
        catch(err) {
            return null;
        }
    },

    getCommentByBlogId: async (id) => {
        try{
            return await Comments.find({blogId: id});
        }
        catch(err) {
            return null;
        }
    },

    getCommentByReplyId: async (id) => {
        try{
            return await Comments.find({replyId: id});
        }
        catch(err) {
            return null;
        }
    },

    createComment: (user) => {
        return Comments.create(user);
    },
    updateComment: (id, user) => {
        return Comments.findByIdAndUpdate(id, user);
    },
    deleteComment: (id) => {
        return Comments.findByIdAndDelete(id);
    },
    deleteCommentInList: (listId) => {
        return Comments.deleteMany({_id: {$in: listId}});
    },
    deleteCommentByAuthorId: (id) => {
        return Comments.deleteMany({authorId: id});
    },
    deleteCommentByBlogId: (id) => {
        return Comments.deleteMany({blogId: id});
    },
    deleteCommentByReplyId: (id) => {
        return Comments.deleteMany({replyId: id});  
    },
    updateReactions: (id, reactions) => {
        return Comments.findByIdAndUpdate(id, {reactions: reactions});
    },
}

export default CommentsService;