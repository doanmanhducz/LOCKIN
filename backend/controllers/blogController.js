import { asyncHandler } from '../middleware/asyncHandler.js';
import { createBlog, deleteBlog, getBlog, listBlogs, updateBlog } from '../models/repositories.js';
import { blogSchema } from '../models/schemas.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = listBlogs({ search: req.query.search || '', tag: req.query.tag || '' });
  res.json({ success: true, data: blogs });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = getBlog(Number(req.params.id));
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  res.json({ success: true, data: blog });
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const parsed = blogSchema.safeParse({ ...req.body, tags: Array.isArray(req.body.tags) ? req.body.tags : String(req.body.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean) });
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }

  const blog = createBlog(parsed.data);
  res.status(201).json({ success: true, data: blog, message: 'Blog created successfully' });
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const parsed = blogSchema.safeParse({ ...req.body, tags: Array.isArray(req.body.tags) ? req.body.tags : String(req.body.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean) });
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }

  const blog = updateBlog(Number(req.params.id), parsed.data);
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  res.json({ success: true, data: blog, message: 'Blog updated successfully' });
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const removed = deleteBlog(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  res.json({ success: true, message: 'Blog deleted successfully' });
});
