# Aura Kinetic Dashboard 🌌

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://aura-kinetic.vercel.app/)

A highly premium, aesthetically driven interactive dashboard built with React, Vite, and TailwindCSS. Aura Kinetic is designed to mimic a futuristic, deep-space HUD running at 60fps, featuring gorgeous glassmorphism elements, precise animations, and real-time kinetic modules.

> Designed by **Sudiptaroy Akash** ([sudiptaroy.info](https://sudiptaroy.info))
> 
> ### 🔭 [View Live Demo Here: aura-kinetic.vercel.app](https://aura-kinetic.vercel.app/)

---

## 🚀 Key Features

*   **Deep Space Aesthetic Background**: A completely CSS-rendered, zero-dependency cosmic background featuring twinkling stars and glowing distant nebulas.
*   **Central Kinetic Clock**: A uniquely designed analog clock core surrounded by massive mechanical gears and concentric calendar rings. Features smooth rotation and time-scrubbing capabilities.
*   **Geo-Location Weather Widget**: Automatically detects the user's location and fetches real-time weather data (temperature, humidity, wind speed) natively using the Open-Meteo API.
*   **"On This Day" Historical Timeline**: A sleek, scrollable glassmorphic panel that interfaces with the Wikipedia REST API to present a dynamic, descending list of historical events that occurred on the current calendar day.
*   **Fully Responsive Fluid Layout**: Utilizes advanced Tailwind grid layouts and CSS transform scaling to look stunning across desktop ultrawides down to vertical mobile orientations.
*   **Anti-Inspect Security Layer**: Built-in Javascript intercepts to catch and block typical user inspection hotkeys (Right Click, F12, Ctrl+Shift+I, Ctrl+U) while gracefully presenting an elegant security toast notification.

---

## 🛠️ Technology Stack

*   **Core**: React 19, Vite
*   **Styling**: TailwindCSS, custom CSS animations, Framer Motion
*   **Icons**: Lucide-React
*   **Data APIs**: 
    *   [Open-Meteo](https://open-meteo.com) (Weather)
    *   [BigDataCloud](https://www.bigdatacloud.com) (Reverse Geocoding)
    *   [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) (Historical Events)

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js installed securely on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devsudipta/Aura-Kinetic.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd Aura-Kinetic
   ```

3. **Install exactly required dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the localhost port provided (usually `http://localhost:5173/`).

### Building for Production

Compile the project and bundle it perfectly for deployment.
```bash
npm run build
```
The optimized output will be safely stored inside the `/dist` directory.

---

## 🎨 Design Philosophy

Aura Kinetic abandons standard "flat" website structures in favor of tactile depth. 
It blends `backdrop-blur`, complex multi-layered `box-shadow` techniques, and heavily choreographed `framer-motion` properties to deliver an environment that feels alive and uniquely profound. Every widget operates independently while adhering to the core midnight neon design language.

## 📄 License
This incredibly atmospheric dashboard was built as a personal/portfolio project.

*Aura Kinetic v1.0.0*
