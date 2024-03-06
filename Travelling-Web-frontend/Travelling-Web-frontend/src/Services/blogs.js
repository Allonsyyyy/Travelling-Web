import BlogsModel from '../Models/blogs.js';
import {model, Types} from 'mongoose';

const Blogs = model('Blogs', BlogsModel);

const BlogsService = {
    getAllBlogs: () => {
        return Blogs.find();
    },
    getBlogById: async (id) => {
        try{
            return await Blogs.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    createBlog: (blog) => {
        return Blogs.create(blog);
    },
    updateBlog: (id, blog) => {
        return Blogs.findByIdAndUpdate(id, blog);
    },
    deleteBlog: (id) => {
        return Blogs.findByIdAndDelete(id);
    },
    deleteBlogByAuthorId: (id) => {
        return Blogs.deleteMany({authorId: id})
    },
    updateReactions: (id, reactions) => {
        return Blogs.findByIdAndUpdate(id, {reactions: reactions});
    },
}

export default BlogsService;