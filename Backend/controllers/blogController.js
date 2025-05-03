import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;

    let imageData = null;
    if (image) {
      // image is expected to be base64 string or url
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: 'blog_images',
      });
      imageData = {
        url: uploadedResponse.secure_url,
        public_id: uploadedResponse.public_id,
      };
    }

    const blog = new Blog({
      title,
      content,
      image: imageData,
      author: req.user._id,
    });

    const createdBlog = await blog.save();
    const blogPopulated = await createdBlog.populate('author', 'name');
    res.status(201).json(blogPopulated);
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const { title, content, image } = req.body;

    if (title) blog.title = title;
    if (content) blog.content = content;

    // If new image provided, delete old one and upload new
    if (image) {
      if (blog.image && blog.image.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }
      const uploadResp = await cloudinary.uploader.upload(image, {
        folder: 'blog_images',
      });
      blog.image = {
        url: uploadResp.secure_url,
        public_id: uploadResp.public_id,
      };
    }

    const updatedBlog = await blog.save();
    const updatedBlogPopulated = await updatedBlog.populate('author', 'name');
    res.json(updatedBlogPopulated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    // Delete image from Cloudinary if present
    if (blog.image?.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    // Use deleteOne instead of remove
    await Blog.deleteOne({ _id: blog._id });

    res.json({ message: 'Blog removed' });
  } catch (error) {
    next(error);
  }
};


export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
