const {Post} = require('../models/Post') 
const {User} = require('../models/User') 

exports.addPost = async (req,res) => {
    try {
        const { description } = req.body;
        const { userId } = req.params;
        const image =req.file ? req.file.filename : '';
        // console.log(req.file);
        const newPost = new Post({
            description,
            userId,
            image
        });
        const savedPost = await newPost.save();
        res.status(201).json({
            message: 'Post added successfully',
            post: savedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
exports.getPosts = async (req,res) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({userId : id}).sort({ createdAt: -1 });
    
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.changeProfile = async (req, res) => {
    const userId = req.params.id;
    const image =req.file ? req.file.filename : '';    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { photoProfile : image },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

