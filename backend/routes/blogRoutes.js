import { Router } from 'express';
import { createBlogPost, deleteBlogPost, getBlogById, getBlogs, updateBlogPost } from '../controllers/blogController.js';

const router = Router();

router.get('/', getBlogs);
router.post('/', createBlogPost);
router.get('/:id', getBlogById);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;
