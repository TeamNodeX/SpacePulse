"""
SpacePulse QR Code Generator
Team NodeX - University of Moratuwa

Generates high-resolution branded QR codes for SpacePulse:
- assets/images/spacepulse_qr.png (1024px PNG with center emblem)
- assets/images/spacepulse_qr.svg (Scalable vector format)
"""

import sys
import os
import qrcode
import qrcode.image.svg
from PIL import Image, ImageDraw

DEFAULT_URL = "https://teamnodex.github.io/SpacePulse/"

def generate_qr(target_url=DEFAULT_URL):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, "assets", "images")
    os.makedirs(assets_dir, exist_ok=True)
    
    png_path = os.path.join(assets_dir, "spacepulse_qr.png")
    svg_path = os.path.join(assets_dir, "spacepulse_qr.svg")
    icon_path = os.path.join(assets_dir, "app_icon.png")
    if not os.path.exists(icon_path):
        icon_path = os.path.join(assets_dir, "logo.jpeg")
    
    print(f"Generating SpacePulse QR codes for URL: {target_url}")
    
    # 1. Generate High-Res PNG with Embedded Logo
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # 30% error recovery for logo overlay
        box_size=20,
        border=3,
    )
    qr.add_data(target_url)
    qr.make(fit=True)
    
    # SpacePulse signature dark navy color #0b1528
    qr_img = qr.make_image(fill_color="#0b1528", back_color="white").convert("RGBA")
    width, height = qr_img.size
    
    if os.path.exists(icon_path):
        try:
            logo = Image.open(icon_path).convert("RGBA")
            # Safe logo size: 21% of QR width
            logo_size = int(width * 0.21)
            logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
            
            # Badge background padding
            padding = int(logo_size * 0.12)
            badge_size = logo_size + padding * 2
            badge = Image.new("RGBA", (badge_size, badge_size), (255, 255, 255, 0))
            draw = ImageDraw.Draw(badge)
            
            # Outer subtle border and clean white background
            draw.rounded_rectangle(
                [0, 0, badge_size, badge_size],
                radius=int(badge_size * 0.28),
                fill=(255, 255, 255, 255),
                outline=(11, 21, 40, 230),
                width=max(2, int(badge_size * 0.025))
            )
            
            # Rounded corner mask for the logo itself
            mask = Image.new("L", (logo_size, logo_size), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.rounded_rectangle(
                [0, 0, logo_size, logo_size],
                radius=int(logo_size * 0.22),
                fill=255
            )
            
            badge.paste(logo, (padding, padding), mask)
            
            # Center the badge
            pos = ((width - badge_size) // 2, (height - badge_size) // 2)
            qr_img.paste(badge, pos, badge)
        except Exception as e:
            print(f"Warning: Could not overlay logo: {e}")
            
    qr_img.save(png_path, "PNG", quality=100)
    print(f" Saved PNG: {png_path} ({qr_img.size[0]}x{qr_img.size[1]})")
    
    # 2. Generate Scalable SVG
    factory = qrcode.image.svg.SvgPathImage
    svg_qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
        image_factory=factory
    )
    svg_qr.add_data(target_url)
    svg_qr.make(fit=True)
    svg_img = svg_qr.make_image(attrib={'class': 'spacepulse-qr-svg'})
    svg_img.save(svg_path)
    print(f" Saved SVG: {svg_path}")

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL
    generate_qr(url)
