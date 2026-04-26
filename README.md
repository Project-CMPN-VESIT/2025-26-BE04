# 🌉 JeevanSetu — A Unified Platform for NGO Management

> **Vivekanand Education Society's Institute of Technology (VESIT)**
> Department of Computer Engineering | B.E. Final Year Project | A.Y. 2025-26
> Affiliated to University of Mumbai

---

## 👥 Team — Group D17C / 04

| Name            | Roll No   | GitHub                                               |
| --------------- | --------- | ---------------------------------------------------- |
| Chinmay Desai   | D17C / 16 | [@chinmaydesai](https://github.com/ChinmayDesai2005) |
| Yash Ingale     | D17C / 29 | [@yashingale2004](https://github.com/yashingale2004) |
| Gautam Rai      | D17C / 53 | [@gautamrai](https://github.com/Gautam-04)           |
| Shaanveer Singh | D17C / 61 | [@shaanveersingh](https://github.com/ShaanVeer21)    |

**Project Mentor:** **Prof. Dr. Mrs. Gresha Bhatia**

**Industry Collaborator:** **Ms. Sujata Angadi** Jeevan Samvardhan Foundation, Mumbai

---

## 📌 About JeevanSetu

**JeevanSetu** (meaning _"Bridge of Life"_) is a high-performance, full-stack digital platform designed to modernize and unify the operations of Non-Governmental Organizations (NGOs). Developed in direct collaboration with the **Jeevan Samvardhan Foundation** — a child welfare NGO dedicated to the rehabilitation and education of underprivileged children in Mumbai — the platform addresses the chronic inefficiencies caused by manual record-keeping, fragmented tools, and a lack of transparency in the non-profit sector.

The platform serves as a **single source of truth** for NGO operations, replacing error-prone paperwork and disconnected spreadsheets with automated, data-driven workflows that are transparent, secure, and scalable.

---

## 🚨 The Problem

Most NGOs in India still operate through:

- 📋 Manual spreadsheets and paper-based donor records
- 💬 Fragmented communication via WhatsApp and social media
- ❌ No real-time donation tracking or financial transparency
- 📉 No analytics to make evidence-based decisions
- 🔓 Sensitive data stored insecurely with no role-based access

This leads to donor distrust, administrative bottlenecks, and an inability to scale social impact.

---

## ✅ The Solution — JeevanSetu

JeevanSetu introduces a **unified web-based ecosystem** built on four pillars:

### 🔗 1. Blockchain-Backed Donation Transparency

Every donation is automatically recorded on an **Ethereum blockchain ledger** via Solidity smart contracts. This creates an immutable, tamper-proof trail of fund movement — donors can verify exactly when and how their contribution was logged, rebuilding the trust bridge between NGOs and their supporters.

### 📊 2. Real-Time Analytics Dashboards

Fragmented data from donors, campaigns, and volunteers is consolidated into **interactive dashboards** powered by a Flask microservice. NGO leadership can monitor KPIs, track campaign velocity, and make informed decisions in real time.

### 💳 3. Integrated Donation Processing

Seamless online donations via **Razorpay** supporting UPI, Cards, Net Banking, and Wallets. Instant digital receipts are generated automatically, eliminating manual acknowledgement.

### 🛡️ 4. Centralized & Secure Data Management

All organizational, financial, and beneficiary records are stored in a **single MongoDB repository** with Role-Based Access Control (RBAC), ensuring sensitive data is only accessible by authorized personnel.

---

## ✨ Features

- ✅ Multi-role authentication — Admin, Donor, Volunteer portals
- ✅ Blockchain-verified donation records with transaction hash display
- ✅ Razorpay payment gateway (UPI, Cards, Net Banking, Wallets)
- ✅ Create, manage, and track fundraising campaigns
- ✅ Donation timeline charts and goal progress visualization
- ✅ Inventory management with AI-powered analysis (Claude API)
- ✅ Real-time low-stock alerts with automated recommendations
- ✅ News and media coverage page
- ✅ Featured campaigns with share functionality
- ✅ Admin portal for CRUD operations on all resources
- ✅ Downloadable PDF/CSV reports for auditing
- ✅ QR-based volunteer check-in system
- ✅ Lighthouse Performance Score: **98/100**

---

## 🗂️ Repository Structure

```
2025-26-BE04/
│
├── 📁 JeevanSetu/                  # Complete project source code
│   │
│   ├── 📁 Frontend-client/         # Donor-facing web application
│   │   ├── src/
│   │   │   ├── components/         # Reusable React components
│   │   │   ├── pages/              # Home, About, Campaigns, Donate, News
│   │   │   └── assets/             # Images and static files
│   │   └── package.json
│   │
│   ├── 📁 frontend-admin/          # NGO Admin portal
│   │   ├── src/
│   │   │   ├── components/         # Admin UI components (MUI)
│   │   │   ├── pages/              # Donations, Inventory, Housing, Analytics
│   │   │   └── context/            # Auth context and state management
│   │   └── package.json
│   │
│   ├── 📁 backend/                 # Main application server
│   │   ├── routes/                 # API route handlers
│   │   ├── models/                 # MongoDB Mongoose schemas
│   │   ├── middleware/             # JWT auth, CORS, validation
│   │   ├── controllers/            # Business logic
│   │   └── server.js
│   │
│   └── 📁 deploy-backend-1/        # Flask analytics microservice
│       ├── app.py                  # Analytics & reporting endpoints
│       ├── models/                 # Data aggregation logic
│       └── requirements.txt
│
├── 📁 Sem 7/                       # Semester 7 project report & documents
│   └── (Project synopsis, review presentations, evaluation sheets)
│
├── 📁 Sem 8/                       # Semester 8 final blackbook
│   └── Final_BE_Project_BlackBook.pdf
│
└── 📄 README.md
```

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Version | Purpose                        |
| ----------------- | ------- | ------------------------------ |
| ReactJS           | v19.1.1 | Component-based UI framework   |
| Material UI (MUI) | v7.3.2  | UI component library & theming |
| Vite              | Latest  | Build tool & dev server        |
| React Router      | Latest  | Client-side routing            |

### Backend

| Technology | Version | Purpose                       |
| ---------- | ------- | ----------------------------- |
| Node.js    | v24.8.0 | Main application server       |
| Express    | v5.1.0  | REST API framework            |
| Flask      | v3.1.2  | Python analytics microservice |
| JWT        | Latest  | Authentication tokens         |

### Database & Storage

| Technology | Version | Purpose                |
| ---------- | ------- | ---------------------- |
| MongoDB    | v8.0    | Primary NoSQL database |
| Mongoose   | Latest  | ODM for MongoDB        |

### Blockchain

| Technology          | Version | Purpose                               |
| ------------------- | ------- | ------------------------------------- |
| Ethereum (Solidity) | v0.8.30 | Smart contracts for donation tracking |
| Hyperledger Fabric  | v3.1.1  | Permissioned consortium blockchain    |
| Ganache             | v7.9.2  | Local Ethereum test environment       |

### Payments & APIs

| Technology        | Version | Purpose                       |
| ----------------- | ------- | ----------------------------- |
| Razorpay Node SDK | v2.9.6  | Payment gateway               |
| Claude API        | Latest  | AI-powered inventory analysis |
| Google Maps API   | Latest  | Location-based services       |

### DevTools

| Tool         | Version  | Purpose                       |
| ------------ | -------- | ----------------------------- |
| Git & GitHub | v2.47.1  | Version control               |
| Postman      | v11.45.0 | API testing & debugging       |
| Figma        | v124.6.8 | UI/UX design & prototyping    |
| Canva        | Web      | Presentation & graphic design |

---

## ⚡ Performance Results

### Lighthouse Audit Scores

| Metric            | Score         |
| ----------------- | ------------- |
| 🟢 Performance    | **98 / 100**  |
| 🟢 Best Practices | **100 / 100** |
| 🟠 Accessibility  | **89 / 100**  |
| 🟠 SEO            | **83 / 100**  |

### Core Web Vitals

| Metric                         | Value     |
| ------------------------------ | --------- |
| First Contentful Paint (FCP)   | **0.9 s** |
| Largest Contentful Paint (LCP) | **0.9 s** |
| Total Blocking Time (TBT)      | **0 ms**  |
| Cumulative Layout Shift (CLS)  | **0.004** |
| Speed Index                    | **0.9 s** |

### System Accuracy

| Test                                    | Result          |
| --------------------------------------- | --------------- |
| Blockchain–MongoDB consistency          | 100%            |
| Error-free transactions (500 simulated) | Zero duplicates |
| Analytics reporting accuracy            | 99.4%           |
| Accuracy under peak load                | > 99%           |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    JeevanSetu                        │
│                   (Web Portal)                       │
└──────────┬──────────────┬──────────────┬────────────┘
           │              │              │
    ┌──────▼──────┐ ┌─────▼──────┐ ┌───▼──────────┐
    │  Donations  │ │Rehabilitat-│ │  Reporting & │
    │ & Analytics │ │   ion Mgmt │ │  Awareness   │
    └──────┬──────┘ └─────┬──────┘ └───┬──────────┘
           │              │              │
    ┌──────▼──────────────▼──────────────▼──────────┐
    │              Central Database (MongoDB)         │
    └──────────────────────┬────────────────────────┘
                           │
    ┌──────────────────────▼────────────────────────┐
    │         Analytics & Reporting Engine (Flask)   │
    └──────────────────────┬────────────────────────┘
                           │
    ┌──────────────────────▼────────────────────────┐
    │       Reports, Visualizations & Trends         │
    │           (NGO Admins & Managers)              │
    └───────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- MongoDB (local or Atlas)
- Ganache (for blockchain testing)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Project-CMPN-VESIT/2025-26-BE04.git
cd 2025-26-BE04/JeevanSetu
```

### 2. Setup Frontend (Client)

```bash
cd Frontend-client
npm install
npm run dev
```

### 3. Setup Frontend (Admin)

```bash
cd ../frontend-admin
npm install
npm run dev
```

### 4. Setup Backend (Node.js)

```bash
cd ../backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

```bash
node server.js
```

### 5. Setup Flask Microservice

```bash
cd ../deploy-backend-1
pip install -r requirements.txt
python app.py
```

### 6. Start Ganache (Blockchain)

- Open Ganache desktop app
- Create a new workspace
- Connect to `HTTP://127.0.0.1:7545`

---

## 📱 Screenshots

| Page                  | Description                                           |
| --------------------- | ----------------------------------------------------- |
| 🏠 Home Page          | Hero banner with mission statement and Donate Now CTA |
| ℹ️ About Us           | Foundation mission, vision, and story                 |
| 📰 News               | Press coverage and NGO lead interviews                |
| 💰 Campaigns          | Featured fundraisers with progress indicators         |
| 💳 Donation Checkout  | Razorpay-integrated payment form                      |
| ✅ Payment Success    | Razorpay confirmation screen                          |
| ⛓️ Blockchain Log     | Ganache transaction hash verification                 |
| 🖥️ Admin Portal       | Campaign management dashboard                         |
| ➕ Create Fundraiser  | Admin form to launch new campaigns                    |
| 📈 Donation Analytics | Timeline charts + blockchain transaction table        |

---

## 🎯 SDG Alignment

This project directly contributes to the **United Nations Sustainable Development Goals**:

| SDG        | Goal                                 | How JeevanSetu Contributes                               |
| ---------- | ------------------------------------ | -------------------------------------------------------- |
| 🟠 Goal 1  | No Poverty                           | Supports child welfare and rehabilitation NGOs           |
| 🔵 Goal 4  | Quality Education                    | Funds education campaigns for underprivileged children   |
| ⚪ Goal 16 | Peace, Justice & Strong Institutions | Blockchain transparency builds accountable institutions  |
| 🟢 Goal 17 | Partnerships for the Goals           | Industry collaboration with Jeevan Samvardhan Foundation |

---

## 📚 Research References

This project is grounded in 20 peer-reviewed research papers, key ones include:

1. Nairi et al. — _"Smart Blockchain Networks: Revolutionizing Donation Tracking in Web 3.0"_ — Computer Communications, 2024
2. Borade et al. — _"NGO and Donor Management System Using Charity Blockchain"_ — IJIRMPS, 2024
3. Ata et al. — _"A Dynamic Model for Managing Volunteer Engagement"_ — arXiv, 2023
4. Shi et al. — _"Artificial Intelligence for Social Good: A Survey"_ — arXiv, 2020
5. Dash & Mishra — _"Critical Considerations for Developing MIS for NGOs"_ — arXiv, 2014

---

## ⚠️ Known Limitations

- Requires stable internet — offline mode not yet supported
- Blockchain mainnet deployment will incur gas fees
- Advanced dashboards require modern browsers/devices
- Initial data migration from paper records requires manual entry
- Dependent on Razorpay and Google Maps API uptime

---

## 🔮 Future Scope

- 📱 **Mobile App** — Android & iOS with offline sync and push notifications
- 🤖 **AI Predictions** — ML models for donation trend forecasting and donor segmentation
- 🔍 **OCR Integration** — Automated digitization of physical paper records
- 👤 **Facial Recognition** — TensorFlow-based missing child identification engine
- 🌍 **Multi-NGO Support** — Scale platform for consortium use across multiple organizations
- 🏦 **Mainnet Deployment** — Migrate from Ganache testnet to Ethereum/Polygon mainnet

---

## 📄 Project Documents

| Document                | Location                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| Final Blackbook (Sem 8) | [`Sem-8/04_GB_JeevanSetu_BlackBook.pdf`](./Sem-8/04_GB_JeevanSetu_BlackBook.pdf) |
| Sem 7 Report            | [`Sem-7/`](./Sem-7/)                                                            |

---

## 📜 License & Disclaimer

This project was developed as part of the **B.E. Computer Engineering curriculum** at Vivekanand Education Society's Institute of Technology (VESIT), affiliated to the University of Mumbai, for the Academic Year 2025-26.

All code and documentation is submitted for academic evaluation purposes.

---

<div align="center">

**Made with ❤️ for social impact | VESIT, Mumbai | 2025-26**

_"We change the lives of those who have no hope."_
_— Jeevan Samvardhan Foundation_

</div>
