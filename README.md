<div align="center">
Welcome to React Bits, the go-to open source library for high quality animated React components!
</div>

<div align="center">
	<br>
	<br>
	<img src="./src/assets/logos/reactbits-logo.svg" alt="react-bits logo" height="200">
	<br>
	<br>
</div>

## About

React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow. From simple text animations to complex 3D components, React Bits provides everything you need to create unique and impactful websites.

The project embraces simplicity as its core philosophy—it maintains minimal dependencies and offers code that integrates seamlessly into your projects. Components often rely on zero dependencies or in some cases, a single animation library, for smooth effects and cleaner code, leaving plenty of room for customization.

## Key Features
- A variety of animated text and UI components
- Customizable and lightweight with minimal dependencies
- Designed to integrate seamlessly with any React project

## Links
* [Official Docs](https://reactbits.dev/)

## Installing Components Via CLI - <a href="https://jsrepo.dev"><img src="https://jsrepo.dev/badges/jsrepo.svg" width="50" alt="jsrepo"></a>

### JavaScript (One-Time Installation)

#### Vanilla CSS
```bash
npx jsrepo add https://reactbits.dev/default/<CategoryName>/<ComponentName>

# Example: npx jsrepo add https://reactbits.dev/default/TextAnimations/SplitText
```

#### Tailwind
```bash
npx jsrepo add https://reactbits.dev/tailwind/<CategoryName>/<ComponentName>

# Example: npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/SplitText
```

### TypeScript (One-Time Installation)

#### Vanilla CSS
```bash
npx jsrepo add https://reactbits.dev/ts/default/<CategoryName>/<ComponentName>

# Example: npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/SplitText
```

#### Tailwind
```bash
npx jsrepo add https://reactbits.dev/ts/tailwind/<CategoryName>/<ComponentName>

# Example: npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/SplitText
```

## Full CLI Setup
```bash
# 1. Initialize a config file for your project
npx jsrepo init https://reactbits.dev/default/ # css
npx jsrepo init https://reactbits.dev/tailwind/ # tailwind

# TS Support is still WIP
npx jsrepo init https://reactbits.dev/ts/default/ # ts + css
npx jsrepo init https://reactbits.dev/ts/tailwind/ # ts + tailwind

# 2. Browse & add components from the list
npx jsrepo add

# 3. Or just add a specific component
npx jsrepo add <CategoryName>/<ComponentName>

# Optionally, install jsrepo globally to remove 'npx' from the commands
npm i -g jsrepo
```

## Running The Project Locally

#### Clone The Project (fork for contributions)

```sh
git clone https://github.com/DavidHDev/react-bits.git .
```

#### Install Dependencies

```sh
npm install
```

#### Start The Development Server

```sh
npm run dev
```

## Contributing

This project is always open to improvements and contributions, you can check the [Open Issues](https://github.com/DavidHDev/react-bits/issues) if you want to contribute, and it's also possible to request to add your own improvements/ideas using the [Feature Request](https://github.com/DavidHDev/react-bits/issues/new/choose) template. Before contributing, please read the [Contribution Guide](https://github.com/DavidHDev/react-bits/blob/main/CONTRIBUTING.MD) and make sure to respect the standards! Thank you for your time!

## CONTENTS

### TEXT ANIMATIONS

- [Split Text](https://www.reactbits.dev/text-animations/split-text)
- [Blur Text](https://www.reactbits.dev/text-animations/blur-text)
- [Wave Text](https://www.reactbits.dev/text-animations/wave-text)
- [Shiny Text](https://www.reactbits.dev/text-animations/shiny-text)
- more

### ANIMATIONS

- [Animated Content](https://www.reactbits.dev/animations/animated-content)
- [Fade Content](https://www.reactbits.dev/animations/fade-content)
- [Blob Cursor](https://www.reactbits.dev/animations/blob-cursor)
- [Follow Cursor](https://www.reactbits.dev/animations/follow-cursor)
- [Magnet](https://www.reactbits.dev/animations/magnet)
- more

### COMPONENTS

- [Stack](https://www.reactbits.dev/components/stack)
- [Dock](https://www.reactbits.dev/components/dock)
- [Masonry](https://www.reactbits.dev/components/masonry)
- more

### BACKGROUNDS

- [Hyperspeed](https://www.reactbits.dev/backgrounds/hyperspeed)
- [Squares](https://www.reactbits.dev/backgrounds/squares)
- more

## Maintainers

[David Haz](https://github.com/DavidHDev)

## License

MIT
