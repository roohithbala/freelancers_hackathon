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
-   **Containerisation**: Docker
-   **Orchestration**: Kubernetes (K8s)
-   **Reverse Proxy**: nginx (on EC2 — routes public traffic to frontend & backend)
-   **Monitoring**: Prometheus + Grafana (via `kube-prometheus-stack` Helm chart)
-   **CI/CD**: GitHub Actions (no Jenkins required)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
-   Node.js (v18+)
-   Firebase Account & project
-   OpenRouter API Key

### 1 — Clone the repository
```bash
git clone https://github.com/yourusername/ai-project-generator.git
cd ai-project-generator
```

### 2 — Backend setup
```bash
cd backend
npm install
cp .env.example .env          # then fill in your values
npm run dev
```

**`backend/.env` variables** (see `backend/.env.example` for reference):
| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default `5000`) |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI generation |
| `EMAIL_USER` | Gmail address used by Nodemailer |
| `EMAIL_PASS` | Gmail app-password for Nodemailer |
| `RAZORPAY_KEY_ID` | Razorpay key ID for payments |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret for payments |

### 3 — Frontend setup
```bash
cd frontend
npm install
cp .env.example .env          # then fill in your values
npm run dev
```

**`frontend/.env` variables** (see `frontend/.env.example` for reference):
| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_API_BASE_URL` | Backend base URL (default `http://localhost:5000`) |

### 4 — Open App
Visit `http://localhost:5173`

---

## 🐳 Docker (Manual Build)

```bash
# Backend
docker build -t freelancers-backend ./backend

# Frontend (pass Firebase config and backend URL as build args)
docker build \
  --build-arg VITE_FIREBASE_API_KEY=your_key \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com \
  --build-arg VITE_FIREBASE_PROJECT_ID=your_project_id \
  --build-arg VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app \
  --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id \
  --build-arg VITE_FIREBASE_APP_ID=your_app_id \
  --build-arg VITE_API_BASE_URL=https://your-backend-url \
  -t freelancers-frontend ./frontend
```

> **Why build args?** Vite bakes environment variables into the JavaScript bundle at **build time**. They are not read at runtime. All `VITE_*` variables must be available when `npm run build` runs.

---

## ☸️ Kubernetes Deployment

Manifests are in the `k8s/` directory:

| File | Description |
|---|---|
| `k8s/backend-deployment.yaml` | Backend `Deployment` + `Service` |
| `k8s/frontend-deployment.yaml` | Frontend `Deployment` + `Service` |
| `k8s/nginx-proxy.yaml` | nginx reverse proxy — routes port 80 on the EC2 host to the frontend and backend K8s services |
| `k8s/monitoring.yaml` | Prometheus `ServiceMonitor`s + Grafana dashboard `ConfigMap` |

### Traffic routing via nginx on EC2

The nginx reverse proxy pod uses `hostPort: 80`, which binds directly to port 80 on the EC2 instance's network interface — no extra iptables rules or load balancer are needed:

```
Internet → EC2 :80 → nginx-proxy pod
                          ├─ /api/* → backend-service:5000 (Express API)
                          └─ /      → frontend-service:80  (React SPA)
```

Make sure your EC2 Security Group allows **inbound TCP port 80** (and optionally 443) from `0.0.0.0/0`.

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`/`master`:

```
push → Build Docker images → Push to GHCR → Deploy to K8s → Install Prometheus/Grafana
```

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `FRONTEND_ENV_B64` | Base64-encoded `frontend/.env` file (all `VITE_*` vars) |
| `BACKEND_ENV_B64` | Base64-encoded `backend/.env` file |
| `KUBECONFIG_DATA` | Base64-encoded kubeconfig for your cluster |
| `EC2_PUBLIC_IP` | Public IP (or DNS hostname) of the EC2 instance |
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin password |

**How to create the base64-encoded env secrets:**
```bash
# Linux (GNU coreutils)
base64 -w 0 frontend/.env   # copy the output → FRONTEND_ENV_B64 secret
base64 -w 0 backend/.env    # copy the output → BACKEND_ENV_B64 secret

# macOS (BSD base64)
base64 -i frontend/.env     # copy the output → FRONTEND_ENV_B64 secret
base64 -i backend/.env      # copy the output → BACKEND_ENV_B64 secret
```

---

## 📊 Monitoring (Prometheus + Grafana)

The pipeline deploys the `kube-prometheus-stack` Helm chart into the `monitoring` namespace:

- **Prometheus** scrapes metrics from all pods and via `ServiceMonitor` resources.
- **Grafana** is exposed on `NodePort 32000`. Access at `http://<EC2_PUBLIC_IP>:32000` with username `admin` and the password set in the `GRAFANA_ADMIN_PASSWORD` secret.
- A pre-built **Application Overview** dashboard (`k8s/monitoring.yaml`) is automatically imported into Grafana, showing pod counts, CPU, and memory usage.

---

## 🔒 Security Notes
- Firebase config variables are stored as GitHub Secrets and injected at Docker build time — they are **never** committed to source control.
- Backend secrets are stored as Kubernetes Secrets created by the CI/CD pipeline.
- Ensure your Firestore Security Rules are configured to allow only authenticated read/writes in production.

---

## 📄 License
MIT License. Free for educational use.
