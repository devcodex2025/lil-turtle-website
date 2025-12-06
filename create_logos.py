from PIL import Image
import os

# Paths
artifacts_dir = r"C:\Users\karbi\.gemini\antigravity\brain\a647973a-0067-4437-9886-1eae26725090"
public_dir = r"c:\Users\karbi\Desktop\Lil Turte\lil-turtle-website\public"

# Load images
logo_path = os.path.join(artifacts_dir, "turtle_logo_svg_1765032370666.png")
favicon_path = os.path.join(artifacts_dir, "favicon_512_1765032388514.png")

# Create logo.png
logo = Image.open(logo_path)
logo = logo.resize((512, 512), Image.Resampling.LANCZOS)
logo.save(os.path.join(public_dir, "logo.png"), "PNG")

# Create favicons
favicon = Image.open(favicon_path)

# Apple touch icon (512x512)
apple_icon = favicon.resize((512, 512), Image.Resampling.LANCZOS)
apple_icon.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")

# 32x32 favicon
favicon_32 = favicon.resize((32, 32), Image.Resampling.LANCZOS)
favicon_32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")

# 16x16 favicon
favicon_16 = favicon.resize((16, 16), Image.Resampling.LANCZOS)
favicon_16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")

# Create .ico file with multiple sizes
favicon.save(
    os.path.join(public_dir, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)]
)

print("✅ All logo and favicon files created successfully!")
