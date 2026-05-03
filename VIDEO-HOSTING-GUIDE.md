# Video Hosting Guide

Your videos are too large for GitHub (55MB + 41MB). Here are the best options:

## Option 1: Cloudinary (Recommended - FREE)

1. Sign up at https://cloudinary.com (Free tier: 25GB storage)
2. Upload your videos:
   - Go to Media Library
   - Click "Upload"
   - Upload `ghumaudulau.mp4` and `sajilotravel.mp4`
3. Get the video URLs:
   - Click on each video
   - Copy the "Secure URL"
4. Update `components/Projects.tsx`:
   ```typescript
   video: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/ghumaudulau.mp4'
   ```

## Option 2: Vercel Blob Storage

1. Install Vercel Blob:
   ```bash
   npm install @vercel/blob
   ```
2. Upload via Vercel Dashboard:
   - Go to your project → Storage → Create Database → Blob
   - Upload videos
   - Get URLs

## Option 3: YouTube (Easiest)

1. Upload videos to YouTube (can be unlisted)
2. Use YouTube embed instead of video modal
3. Update Projects component to use iframe

## Option 4: Google Drive

1. Upload to Google Drive
2. Make shareable (Anyone with link can view)
3. Get direct download link
4. Use in your project

## Recommended: Cloudinary

It's free, fast, and optimized for video delivery with automatic format conversion and CDN.

After uploading, update the video URLs in `components/Projects.tsx`.
