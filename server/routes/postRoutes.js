import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()

// Configure Cloudinary to use API from .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// GET all posts
router.route('/').get(async (req, res) => {
    console.log('searching posts')
    try {
        const posts = await Post.find({})
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

})
// CREATE a post
router.route('/').post(async (req, res) => {
    try {
        // get data sent from frontend
        const { name, prompt, photo } = req.body

        // upload photo url to cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo)

        // create new post
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

export default router