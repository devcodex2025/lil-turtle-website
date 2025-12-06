from PIL import Image

# Open the logo
logo = Image.open('public/LilTurtleLogo.png').convert('RGBA')

# Create a white background for ICO (since ICO doesn't support transparency well)
def create_favicon_ico(size=32):
    # Resize logo
    resized = logo.copy()
    resized.thumbnail((size, size), Image.Resampling.LANCZOS)
    
    # Create white background
    bg = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    
    # Calculate position to center the logo
    x = (size - resized.width) // 2
    y = (size - resized.height) // 2
    
    # Paste logo on background
    bg.paste(resized, (x, y), resized)
    
    return bg.convert('RGB')

# Create PNG favicons with transparency
def create_favicon_png(size):
    resized = logo.copy()
    resized.thumbnail((size, size), Image.Resampling.LANCZOS)
    
    # Create transparent background
    bg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Calculate position to center the logo
    x = (size - resized.width) // 2
    y = (size - resized.height) // 2
    
    # Paste logo on background
    bg.paste(resized, (x, y), resized)
    
    return bg

# Generate favicons
print("Generating favicons...")

# ICO file (16x16 and 32x32 combined)
favicon_16 = create_favicon_ico(16)
favicon_32 = create_favicon_ico(32)
favicon_16.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32)])
print("✓ Generated favicon.ico")

# PNG favicons
favicon_16_png = create_favicon_png(16)
favicon_16_png.save('public/favicon-16x16.png', 'PNG')
print("✓ Generated favicon-16x16.png")

favicon_32_png = create_favicon_png(32)
favicon_32_png.save('public/favicon-32x32.png', 'PNG')
print("✓ Generated favicon-32x32.png")

favicon_96_png = create_favicon_png(96)
favicon_96_png.save('public/favicon-96x96.png', 'PNG')
print("✓ Generated favicon-96x96.png")

# Apple touch icon (180x180)
apple_icon = create_favicon_png(180)
apple_icon.save('public/apple-touch-icon.png', 'PNG')
print("✓ Generated apple-touch-icon.png")

# Web app manifest icons
manifest_192 = create_favicon_png(192)
manifest_192.save('public/web-app-manifest-192x192.png', 'PNG')
print("✓ Generated web-app-manifest-192x192.png")

manifest_512 = create_favicon_png(512)
manifest_512.save('public/web-app-manifest-512x512.png', 'PNG')
print("✓ Generated web-app-manifest-512x512.png")

print("\n✅ All favicons generated successfully!")
