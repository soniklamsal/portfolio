# Convert Videos for Web Compatibility

Your videos need to be converted to H.264 codec for better browser support.

## Option 1: Using FFmpeg (Recommended)

Install FFmpeg: https://ffmpeg.org/download.html

Then run these commands in your `public` folder:

```bash
# Convert ghumaudulau.mp4
ffmpeg -i ghumaudulau.mp4 -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k ghumaudulau_web.mp4

# Convert sajilotravel.mp4
ffmpeg -i sajilotravel.mp4 -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k sajilotravel_web.mp4
```

Then rename the files:
```bash
mv ghumaudulau_web.mp4 ghumaudulau.mp4
mv sajilotravel_web.mp4 sajilotravel.mp4
```

## Option 2: Using Online Converter

1. Go to https://cloudconvert.com/mp4-converter
2. Upload your video
3. Select output format: MP4
4. Click "Convert"
5. Download and replace the original file

## Video Requirements for Web:
- Codec: H.264 (x264)
- Audio: AAC
- Container: MP4
- Max file size: 100MB (for better loading)

## After Converting:
1. Replace the videos in the `public` folder
2. Commit and push to GitHub
3. Vercel will automatically redeploy
