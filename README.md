# 🐢 Lil Turtle - Memecoin & NFT Website

A modern, fully-featured Next.js website for the Lil Turtle community-driven memecoin and NFT collections.

## ✨ Features

- 🎨 **Modern Design** - Vibrant crypto-themed design with glassmorphism effects
- 🎬 **Smooth Animations** - Framer Motion powered animations and transitions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔍 **SEO Optimized** - Complete meta tags, sitemap, and social sharing
- ⚡ **Fast Performance** - Next.js 14 with App Router and Turbopack
- 🌐 **Web3 Ready** - Links to DEX, NFT collections, and social media

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project
cd lil-turtle-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # Search engine rules
└── components/
    ├── Navbar.tsx          # Navigation
    ├── Hero.tsx            # Hero section
    ├── About.tsx           # About section
    ├── Statistics.tsx      # Community stats
    ├── NFTCollections.tsx  # NFT cards
    ├── TokenLaunch.tsx     # Token CTA
    ├── Ticker.tsx          # Scrolling marquee
    └── Footer.tsx          # Footer
```

## 🎨 Design System

### Color Palette

- **Primary Cyan**: `#00f5ff`
- **Primary Purple**: `#a855f7`
- **Primary Pink**: `#ec4899`
- **Accent Green**: `#10b981`
- **Background**: `#0a0a0f`

### Key Effects

- Glassmorphism cards
- Gradient text effects
- Glow animations
- Smooth transitions
- Custom scrollbar

## 🔗 Important Links

- **Buy $LILTURTLE**: [Boop.fun](https://boop.fun/tokens/14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop)
- **Twitter**: [@lilturtlenft](https://x.com/lilturtlenft)
- **NFT Collection 1**: [Abstract Lil Turtle Mini](https://abstract-lil-turtle-mini.nfts2.me/)
- **NFT Collection 2**: [Abstract Lil Turtle Crown Mini](https://abstract-lil-turtle-crown-mini.nfts2.me/)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Fonts**: Inter (Google Fonts)

## 📝 Customization

### Update Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary-cyan: #00f5ff;
  --primary-purple: #a855f7;
  --primary-pink: #ec4899;
}
```

### Modify Content

Components are located in `src/components/`. Edit any component to change:
- Text content
- Links
- Statistics
- Collection information

### Add Sections

1. Create new component in `src/components/`
2. Import in `src/app/page.tsx`
3. Add between existing sections

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy output directory
```

### Update Domain

Before deployment, update URLs in:
- `src/app/sitemap.ts`
- `src/app/robots.ts`

## 📊 SEO

The site includes:
- ✅ Comprehensive meta tags
- ✅ Open Graph tags
- ✅ Twitter Card metadata
- ✅ Dynamic sitemap
- ✅ Robots.txt configuration
- ✅ Semantic HTML
- ✅ Optimized structure

## 📄 License

Community-driven project. Feel free to use and modify.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 💬 Support

- Twitter: [@lilturtlenft](https://x.com/lilturtlenft)
- Community: Join our growing community of 380+ subscribers and 420+ token holders!

---

**🐢 Small steps matter. Become better.**

Built with ❤️ for the Lil Turtle community
