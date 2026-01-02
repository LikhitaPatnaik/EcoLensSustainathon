# EcoLens 🌿 | AI Recycling Assistant

> **Sustain-a-thon 2026 Submission**
> *Turning "Wish-cycling" into Climate Action.*

## 🌍 The Problem
We all want to save the planet, but recycling is confusing. Is that coffee cup recyclable? What about the receipt?
Because of this confusion, **"Wish-cycling"** (tossing everything in the recycling bin) leads to massive contamination, causing entire batches of recyclables to be sent to landfills.

## 💡 The Solution: EcoLens
EcoLens is a **Progressive Web App (PWA)** that acts as a "Shazam for Trash."
You point your camera at an item, and our **Multimodal AI (Google Gemini 2.5)** analyzes it in real-time to tell you:
1.  **The Verdict:** Recyclable, Compostable, or Landfill.
2.  **The Consequence:** The specific chemical danger if dumped negligently (e.g., Methane release, Microplastics).
3.  **The Impact:** Calculates exactly how much CO2, Water, and Toxic Chemicals you saved by disposing of it correctly.
4.  **The Swap:** Suggests a sustainable alternative (e.g., "Use a Bamboo brush instead").

## ✨ Key Features
*   **📸 Split-Screen Dashboard:** Desktop-grade UI that works perfectly on mobile.
*   **🧠 Multimodal AI Vision:** Powered by **Google Gemini 2.5 Flash** for sub-second image analysis.
*   **⚡ Smart Compression:** Custom Canvas algorithm compresses 4MB camera photos to 50KB for instant uploads on slow mobile networks.
*   **🧪 Chemical Impact Tracker:** Goes beyond CO2 to track Methane (CH4), Water conservation, and Toxic Dye prevention.
*   **🏆 Gamified Scoreboard:** LocalStorage-based tracking of your "Lifetime Carbon Savings."
*   **📲 Installable PWA:** Can be installed on Android/iOS as a native app without an app store.

## 🛠️ Tech Stack
*   **Frontend:** React.js + Vite
*   **AI Model:** Google Gemini API (`gemini-2.5-flash`)
*   **Camera:** `react-webcam` with custom constraints
*   **Performance:** Canvas API for client-side image compression
*   **Deployment:** Vercel (PWA)

## 🚀 How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/ecolens.git
    cd ecolens
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up API Key**
    *   Get a free key from [Google AI Studio](https://aistudio.google.com/).
    *   Open `src/utils/gemini.js` and paste your key:
    ```javascript
    const API_KEY = "YOUR_KEY_HERE";
    ```

4.  **Run the App**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` on your browser.

## 📱 How to Install on Mobile
1.  Host the app (e.g., on Vercel).
2.  Open the link on Chrome (Android) or Safari (iOS).
3.  Tap **"Add to Home Screen"**.
4.  EcoLens will appear as a native app on your device!

## 🔮 Future Roadmap
*   **Community Leaderboard:** Compete with neighbors to see who saves the most CO2.
*   **Barcode Scanning:** Hybrid mode to scan UPC codes for precise material breakdown.
*   **Dark Mode:** For energy-saving OLED screens.

---
*Built with 💚 for the Planet.*
💡 Hackathon Pro-Tip:

Don't forget to actually take a screenshot of your app (the one with the split screen and the Pink Cloth result), name it demo.png, and upload it to your GitHub files. The README code above is set up to display it automatically!
