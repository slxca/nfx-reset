# NFX Reset 🎬

![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/hlacpdjegllpkilocofdfenlgiadppae?style=for-the-badge&label=RATING)
![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/hlacpdjegllpkilocofdfenlgiadppae?style=for-the-badge&label=USERS)
![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/hlacpdjegllpkilocofdfenlgiadppae?style=for-the-badge&label=VERSION)
![Chrome Web Store Size](https://img.shields.io/chrome-web-store/size/hlacpdjegllpkilocofdfenlgiadppae?style=for-the-badge&label=SIZE)



**NFX Reset** is a lightweight Chrome extension that brings back a missing feature to Netflix: **A true Reset button.** 

Tired of Netflix automatically jumping to the credits or starting a show at the last 2 minutes because you've seen it before? With NFX Reset, you can clear your playback progress with a single click directly in the Netflix interface.

---

## 🚀 Installation

### Official Store (Recommended)
The easiest way to use NFX Reset is via the Chrome Web Store.
[**➔ Install NFX Reset for Chrome**](https://chromewebstore.google.com/detail/hlacpdjegllpkilocofdfenlgiadppae)

### Manual Installation (Development)
1. Download or clone this repository.
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Open `chrome://extensions` in your browser.
5. Enable **Developer mode** (top right).
6. Click **Load unpacked** and select the `nfx-reset` folder.

---

## ✨ Features

*   **Native Integration:** Adds a "Reset" button directly next to the "Play" or "Episodes" buttons.
*   **One-Click Action:** Resets progress instantly via the Netflix GraphQL API.
*   **Privacy First:** No external servers, no tracking, no data collection. Everything happens in your browser.
*   **TypeScript:** Full TypeScript support with webpack build system.

---

## 🚀 Development Setup

This project is built with TypeScript and Webpack. To set up the development environment:

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
npm install
```

### Build

```bash
# Production build
npm run build

# Development build with watch mode
npm run dev

# Clean dist folder
npm clean
```

The compiled files will be output to the `dist/` directory.

---

## 🛠️ How it works

1.  **Injection:** The `content.ts` script (compiled to `dist/content.js`) identifies the current title on your Netflix page and injects a "Reset" button.
2.  **Authentication:** When clicked, it retrieves your current profile ID from local storage.
3.  **Reset:** The `background.ts` script (compiled to `dist/background.js`) sends an authenticated request to Netflix's internal API to clear the "Watched" status.
4.  **Refresh:** The page reloads, and you can start your show from $0:00$.

---

## 🔒 Permissions & Privacy

We value your privacy. The extension only requests the minimum necessary permissions:
*   `cookies`: To authenticate the reset request with your existing Netflix session.
*   `https://www.netflix.com/*`: To modify the UI and add the button.
*   `https://web.prod.cloud.netflix.com/*`: To communicate with the Netflix API.

**No data is ever sent to us. Your Netflix data stays between you and Netflix.**

---

## ⚠️ Note
*Netflix frequently updates its interface. If the button disappears or stops working, please open an [Issue](https://github.com/slxca/nfx-reset/issues).*

---
*Disclaimer: This project is not affiliated with, authorized, maintained, sponsored or endorsed by Netflix, Inc.*
