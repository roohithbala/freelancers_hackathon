# 🚀 AI Project Architecture Generator

A powerful AI-driven tool that generates investor-ready project blueprints, technical architectures, and implementation roadmaps for startups and students.

![Project Preview](https://via.placeholder.com/800x400?text=AI+Project+Generator+Preview)

## 🌟 Key Features

### 🧠 Intelligent Generation
-   **Domain-Specific AI**: Generates ideas based on industry (Fintech, Health, EdTech, etc.).
-   **Skill-Adaptive**: Tailors tech stacks and complexity to your skill level (Beginner to Expert).
-   **Full Blueprints**: Provides Problem Statements, Unique Value Props, and Feature Lists.

### 📊 Visualization & Planning
-   **Auto-Architecture Diagrams**: Instantly renders System Architecture using **Mermaid.js**.
-   **Manual Editing**: One-click integration with **Draw.io** for custom diagramming.
-   **Weekly Roadmaps**: Step-by-step implementation guides.

### 💼 Business & Monetization
-   **Freemium Model**: Free users get **5 Gen/Month**.
-   **Premium Upgrades**: automated upsell flow for power users.
-   **Institutional Licensing**: Special tier for Universities and Bootcamps.

### 🔐 Secure & Modern
-   **Firebase Authentication**: Secure Google Login.
-   **Cloud Saving**: Bookmark and retrieve your blueprints from anywhere.
-   **Modern UI**: Sleek, Dark Mode interface built with **React + Tailwind CSS**.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Mermaid.js
-   **Backend**: Node.js, Express
-   **AI Engine**: OpenRouter API (Claude/Gemini/GPT models)
-   **Database & Auth**: Firebase Firestore & Authentication

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   Firebase Account
-   OpenRouter API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-project-generator.git
    cd ai-project-generator
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create .env file with OPENROUTER_API_KEY=your_key
    npm start
    ```

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    # Update src/firebase.js with your config
    npm run dev
    ```

4.  **Open App**
    Visit `http://localhost:5173`

---

## 🔒 Security Note
This project uses client-side Firebase configuration for demonstration purposes. For production, ensure your Firestore Security Rules are configured to strictly allow only authenticated read/writes.

---

## 📄 License
MIT License. Free for educational use.
