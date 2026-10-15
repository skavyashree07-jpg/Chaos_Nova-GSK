# Nova GSK — Combined Repository

This repository combines the Nova GSK frontend, the Deha-Chitra FastAPI symptom-to-care backend and its local JSON data, plus the separate earlier Sakhi prototype.

## Repository layout

- `frontend/` — Nova GSK React + TypeScript + Vite frontend.
- `backend/` — FastAPI service, rule/data JSON files, tests and quality scripts.
- `prototype-sakhi/` — earlier standalone React/Vite Sakhi prototype, kept separate because it is a different UI and package setup.

## Run the main frontend

Requirements: Node.js (use a current LTS release).

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local URL. The frontend's current code may use its own AI/API integration; configure only the environment variables it actually needs, using `frontend/.env.example` as a template. Never commit `.env` files or API keys.

## Run the backend

Requirements: Python 3.10+ (Python 3.11+ recommended).

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# macOS/Linux: source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

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

The frontend and backend are placed together in one repository, but they have **not been fully wired together or end-to-end tested as one application**. The Sakhi prototype's README explicitly describes its analyzer as a local mock, and the Nova GSK frontend may have its own service/API requirements. Before deployment, configure the frontend to call the backend URL, set appropriate CORS origins, and test the request/response contract.

## Health and privacy disclaimer

This is a student prototype, not a medical device or clinically validated decision-support system. It must not be used to diagnose, rule out a condition, or delay urgent care. Review clinical guidance and translations with qualified professionals before real-world use. Avoid logging or storing raw symptom text, use HTTPS, and restrict production access appropriately.
