<div align="center">
  <br>
  <br>
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="src/assets/logos/reactbits-gh-black.svg">
    <source media="(prefers-color-scheme: dark)" srcset="src/assets/logos/reactbits-gh-white.svg">
    <img src="src/assets/logos/reactbits-gh-black.svg" alt="React Bits Logo" width="1000">
  </picture>
  <br>
  <br>
</div>

<div align="center">
  <strong>The largest & most creative library of animated React components</strong>
</div>

<br />

<div align="center">
  <a href="https://github.com/sh20raj/react-bits/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/sh20raj/react-bits?style=for-the-badge&logo=github&color=yellow">
  </a>
  <a href="https://github.com/sh20raj/react-bits/network/members">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/sh20raj/react-bits?style=for-the-badge&logo=github&color=blue">
  </a>
  <a href="https://github.com/sh20raj/react-bits/blob/main/LICENSE.md">
    <img alt="License" src="https://img.shields.io/badge/License-MIT+Commons_Clause-magenta?style=for-the-badge">
  </a>
  <a href="https://reactbits.dev">
    <img alt="Website" src="https://img.shields.io/badge/Website-reactbits.dev-green?style=for-the-badge&logo=react">
  </a>
</div>

<br />

<div align="center">
  <a href="https://reactbits.dev">🌐 Website</a> •
  <a href="#quick-start">🚀 Quick Start</a> •
  <a href="#component-categories">📦 Components</a> •
  <a href="#installation">💻 Installation</a> •
  <a href="#contributing">🤝 Contributing</a>
</div>

---

## 🎯 About

React Bits is a comprehensive collection of **110+ animated React components** designed to help developers create stunning, interactive web experiences. Our components span four main categories and are built with performance, customization, and developer experience in mind.

### ✨ What Makes React Bits Special?

- **🎨 Creative Animations**: From subtle micro-interactions to eye-catching effects
- **🔧 Highly Customizable**: Every component comes with extensive prop options
- **📱 Responsive Design**: Built to work seamlessly across all devices
- **⚡ Performance Optimized**: Minimal dependencies and optimized rendering
- **🎭 Multiple Variants**: Choose from 4 different implementation styles

## 🚀 Quick Start

Get started with React Bits in seconds:

```bash
# Using shadcn/ui
npx shadcn@latest add "https://reactbits.dev/r/component-name"

# Using jsrepo
npx jsrepo add github/sh20raj/react-bits/component-name
```

Visit [reactbits.dev](https://reactbits.dev/) to explore all components with live previews and copy-paste ready code.

## 📦 Component Categories

<table>
  <tr>
    <td align="center">
      <h3>🎬 Animations</h3>
      <p>Interactive animations and effects</p>
      <ul align="left">
        <li>Blob Cursor</li>
        <li>Animated Content</li>
        <li>Scroll Animations</li>
        <li>Hover Effects</li>
      </ul>
    </td>
    <td align="center">
      <h3>🌈 Backgrounds</h3>
      <p>Dynamic and animated backgrounds</p>
      <ul align="left">
        <li>Aurora Effects</li>
        <li>Particle Systems</li>
        <li>Gradient Animations</li>
        <li>3D Scenes</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>🧩 Components</h3>
      <p>Interactive UI components</p>
      <ul align="left">
        <li>Animated Lists</li>
        <li>Card Components</li>
        <li>Navigation Menus</li>
        <li>Galleries</li>
      </ul>
    </td>
    <td align="center">
      <h3>✍️ Text Animations</h3>
      <p>Engaging text effects and typography</p>
      <ul align="left">
        <li>Typewriter Effects</li>
        <li>Blur Animations</li>
        <li>Morphing Text</li>
        <li>3D Text Effects</li>
      </ul>
    </td>
  </tr>
</table>

## 💻 Installation

### Method 1: CLI Installation (Recommended)

React Bits supports both **shadcn/ui** and **jsrepo** for seamless component installation:

#### Using shadcn/ui
```bash
npx shadcn@latest add "https://reactbits.dev/r/animated-list"
```

#### Using jsrepo
```bash
npx jsrepo add github/sh20raj/react-bits/animated-list
```

### Method 2: Manual Installation

1. Browse components at [reactbits.dev](https://reactbits.dev/)
2. Copy the component code
3. Install required dependencies
4. Paste into your project

### 🎨 Component Variants

Every component comes in **4 variants** to match your project setup:

| Variant | Description | Best For |
|---------|-------------|----------|
| **JS-CSS** | JavaScript + CSS Modules | Traditional React projects |
| **JS-TW** | JavaScript + Tailwind CSS | Modern styling workflow |
| **TS-CSS** | TypeScript + CSS Modules | Type-safe traditional projects |
| **TS-TW** | TypeScript + Tailwind CSS | Modern type-safe projects |

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Setup

```bash
# Clone the repository
git clone https://github.com/sh20raj/react-bits.git
cd react-bits

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── content/          # JS-CSS components
├── tailwind/         # JS-TW components  
├── ts-default/       # TS-CSS components
├── ts-tailwind/      # TS-TW components
├── demo/            # Component demos
├── components/      # App components
└── assets/          # Static assets
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: Found an issue? [Open a bug report](https://github.com/sh20raj/react-bits/issues/new?template=1-bug-report.yml)
- 💡 **Request Features**: Have an idea? [Submit a feature request](https://github.com/sh20raj/react-bits/issues/new?template=2-feature-request.yml)
- 🔧 **Submit Code**: Check our [open issues](https://github.com/sh20raj/react-bits/issues) for tasks
- 📖 **Improve Docs**: Help us make the documentation better

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-component`
3. **Commit** your changes: `git commit -m 'Add amazing component'`
4. **Push** to the branch: `git push origin feature/amazing-component`
5. **Open** a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

## 📊 Project Stats

<div align="center">
  <img src="https://repobeats.axiom.co/api/embed/b1bf4dc0226458617adbdbf5586f2df953eb0922.svg" alt="Repobeats analytics image" />
</div>

## 🌟 Community & Support

<div align="center">
  <a href="https://github.com/sh20raj/react-bits/discussions">💬 Discussions</a> •
  <a href="https://github.com/sh20raj/react-bits/issues">🐛 Issues</a> •
  <a href="https://twitter.com/sh20raj">🐦 Twitter</a>
</div>

## 🚀 Official Ports

- **Vue.js**: [vue-bits.dev](https://vue-bits.dev/)

## 👥 Contributors

Thanks to all our amazing contributors!

<a href="https://github.com/sh20raj/react-bits/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sh20raj/react-bits" />
</a>

## 🎖️ Maintainers

- **[Shaswat Raj](https://github.com/sh20raj)** - Creator & Lead Maintainer

## 💝 Sponsorship

Support React Bits development:

- ⭐ **Star this repository**
- 🐛 **Report bugs and suggest features**
- 💰 **[Sponsor the project](https://github.com/sponsors/sh20raj)** (funds go towards hosting costs)

## 📄 License

React Bits is licensed under the [MIT + Commons Clause License](LICENSE.md).

### What this means:
- ✅ **Free for personal and commercial use**
- ✅ **Modify and distribute**
- ❌ **Cannot sell the library itself**

## 🙏 Acknowledgments

React Bits draws inspiration from the amazing React community. We give credit where it's due and encourage you to reach out if you recognize your work.

---

<div align="center">
  <strong>Made with ❤️ by the React Bits community</strong>
  <br>
  <br>
  <a href="https://reactbits.dev">🌐 Visit reactbits.dev</a>
</div>
