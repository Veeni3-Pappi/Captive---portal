# Whoosh-online — High-Speed Hotspot Captive Portal

A clean, modern, production-grade Captive Portal UI engineered specifically for WiFi hotspot businesses. Designed with dark-mode aesthetic, crisp borders, Phosphor icons, and integrated M-PESA STK Push simulation & manual Till reconciliation.

---

## ⚡ Highlights

* **No "AI-slop" Gradients:** Clean obsidian-slate surfaces (`#090d16` & `#0f172a`), subtle micro-grid, high-contrast typography, and authentic M-Pesa emerald accents.
* **WiFi Tiers & Categories:**
  * Categorized filter tabs: **All Plans**, **Hourly**, **Daily**, **Weekly & Monthly**.
  * Badges for **⭐ Most Popular** (1 Day @ 20 KES) and **🔥 Best Value** (1 Week @ 140 KES).
  * High-visibility pricing in Kenyan Shillings (`Ksh 10/=`, `Ksh 20/=`, `Ksh 140/=`, `Ksh 600/=`).
* **M-PESA Integration & Simulation:**
  * Safaricom / Airtel number validation (`07...`, `01...`, `+254...`).
  * Buy Goods Till info banner: **Till 7181852** (Whoosh-online).
  * Realistic STK Push flow: *Initiating → Check phone countdown (30s) → PIN entry simulation → Instant access*.
  * Manual code fallback: Input M-Pesa transaction receipt (e.g. `SKT839201L`) to verify and connect.
* **Prepaid Voucher / Ticket Login:**
  * Direct tab for scratch cards or offline vouchers with instant authentication.
* **Live Session Dashboard:**
  * Active status screen with live countdown timer, downloaded/uploaded data counters, IP & MAC telemetry, and Disconnect / Extend options.
* **Customer Support Drawer:**
  * One-click WhatsApp link (`https://wa.me/254790322397`).
  * One-click phone hotline (`tel:0790322397`).
  * Step-by-step instructions for paying manually via Till 7181852.
* **Free Speed Test Trial:**
  * Optional 5-minute complimentary pass to test network speed before purchasing.

---

## 🚀 Quick Start

### 1. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```
Compiled static assets will be output to the `dist/` directory.

---

## ⚙️ Configuration

All brand settings, rates, and contact details are centralized in:
[`src/config/site.ts`](src/config/site.ts)

```typescript
export const SITE_CONFIG = {
  brandName: "Whoosh-online",
  networkSSID: "Whoosh-online_5G_Fast",
  tillNumber: "7181852",
  supportPhone: "0790322397",
  supportWhatsApp: "254790322397",
  // ...
};
```

---

## 📡 MikroTik RouterOS Deployment Note

When deploying to a MikroTik router (`/hotspot` directory):
1. Run `npm run build`.
2. The contents of `dist/` can be hosted on your external gateway server or embedded into MikroTik hotspot templates.
3. Replace the mock connection handlers with standard MikroTik form actions pointing to `$(link-login-only)` with `username` and `password`.
