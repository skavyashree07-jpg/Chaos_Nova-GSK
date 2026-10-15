# Nova GSK — Combined Repository

This repository combines the Nova GSK frontend, the Deha-Chitra FastAPI symptom-to-care backend and its local JSON data, plus the separate earlier Sakhi prototype.

## Repository layout

- `frontend/` — Nova GSK React + TypeScript + Vite frontend.
- `backend/` — FastAPI service, rule/data JSON files, tests and quality scripts.
- `prototype-sakhi/` — earlier standalone React/Vite Sakhi prototype, kept separate because it is a different UI and package setup.

## Run the main application

Requirements: Node.js (use a current LTS release) and Python 3.10+ (Python 3.11+ recommended).

Start the backend in one terminal:

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Then start the frontend in a second terminal:

```bash
cd frontend
npm install
# Optional: copy frontend/.env.example to frontend/.env.local and edit VITE_BACKEND_URL.
npm run dev
```

The frontend defaults to `http://127.0.0.1:8000`; configure `VITE_BACKEND_URL` if the backend uses a different URL. The symptom translator calls `POST /triage`, which normalizes the submitted text and returns matched concepts and non-diagnostic care guidance. Never commit `.env` files or API keys.

API docs: http://127.0.0.1:8000/docs

The backend uses versioned local JSON datasets in `backend/data/` by default. MongoDB Atlas is optional; copy `backend/.env.example` to `backend/.env` and configure `MONGODB_URI` only if you want the optional database overlay. The `.env` file must remain untracked.

## Run the earlier Sakhi prototype (optional)

```bash
cd prototype-sakhi
npm install
npm run dev
```

## Backend endpoints

- `GET /health`
- `GET /ready`
- `POST /normalise`
- `POST /triage`

The backend README in `backend/README.md` documents request examples and quality checks.

## Important integration note

The Nova GSK symptom translator is wired to the Deha-Chitra backend. The earlier `prototype-sakhi/` remains a separate prototype and is not connected to this API. For deployment, set `VITE_BACKEND_URL` to the backend's HTTPS URL and configure `CORS_ORIGINS` to allow the exact frontend origin.

## Health and privacy disclaimer

This is a student prototype, not a medical device or clinically validated decision-support system. It must not be used to diagnose, rule out a condition, or delay urgent care. Review clinical guidance and translations with qualified professionals before real-world use. Avoid logging or storing raw symptom text, use HTTPS, and restrict production access appropriately.
