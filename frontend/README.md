# Nova GSK frontend

The symptom translator sends symptom text to the Deha-Chitra FastAPI service in `../backend`.

## Run locally

Requirements: Node.js and Python 3.10+.

1. In a terminal, start the backend:

   ```powershell
   cd backend
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   uvicorn app:app --reload --port 8000
   ```

2. In a second terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   Copy-Item .env.example .env.local
   npm run dev
   ```

The frontend defaults to `http://127.0.0.1:8000`. Set `VITE_BACKEND_URL` in `frontend/.env.local` if the backend runs elsewhere. The local backend already allows the Vite development origin (`http://localhost:3000`).

The translator calls `POST /triage`; that endpoint also normalizes the text before applying the backend's care rules. The frontend shows an error if the backend cannot be reached. Symptom descriptions are sent to the configured backend for processing; configure HTTPS and appropriate CORS origins before deployment.
