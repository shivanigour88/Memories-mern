import express from "express";
const router = express.Router();
import {getPostsBySearch , getPosts, createPost , updatePost ,deletePost , likePost ,getPost} from "../controllers/posts.js";
import auth from '../middleware/auth.js';

router.get('/search' ,getPostsBySearch);
router.get('/' ,getPosts);
router.get('/:id', getPost);
router.post('/' ,auth ,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id', auth ,deletePost);
router.patch('/:id/likePost', auth ,likePost);

export default router;