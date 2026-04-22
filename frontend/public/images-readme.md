# Hero Section Images

## Current Images:
- `jntu-logo.jpeg` - JNTUK official logo used in the right panel
- `student.webp` - Student image used as background in light theme

## Usage:
- **Dark Theme**: Uses external Unsplash image for background
- **Light Theme**: Uses local `student.webp` for background
- **Logo Panel**: Always uses `jntu-logo.jpeg`

## Theme-based Image Loading:
The Hero component dynamically switches between:
1. **Dark Mode**: External campus/student images with dark overlays
2. **Light Mode**: Local student.webp with light overlays

## Recommended Image Specifications:
- Background images: 2000x1200px minimum
- Logo images: 400x400px minimum
- Format: WebP for better compression, JPEG as fallback