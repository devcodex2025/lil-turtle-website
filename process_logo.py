from PIL import Image

# Open the logo
img = Image.open('public/LilTurtleLogo.png').convert('RGBA')
width, height = img.size
pixels = img.load()

# Find the actual content bounds (non-transparent pixels)
min_x, min_y = width, height
max_x, max_y = 0, 0

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 10:  # Not fully transparent
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

# Crop to content with small padding
padding = 10
crop_box = (
    max(0, min_x - padding),
    max(0, min_y - padding),
    min(width, max_x + padding + 1),
    min(height, max_y + padding + 1)
)

# Crop the image
cropped = img.crop(crop_box)

# Remove any background by making low-opacity pixels fully transparent
cropped_pixels = cropped.load()
for y in range(cropped.height):
    for x in range(cropped.width):
        r, g, b, a = cropped_pixels[x, y]
        # If pixel is mostly transparent or close to white/gray background, make it fully transparent
        if a < 200 or (r > 200 and g > 200 and b > 200):
            cropped_pixels[x, y] = (r, g, b, 0)

# Save the processed logo
cropped.save('public/LilTurtleLogo.png', 'PNG')
print(f"Logo processed successfully!")
print(f"Original size: {width}x{height}")
print(f"Cropped size: {cropped.width}x{cropped.height}")
