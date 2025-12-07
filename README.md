# Organization Data Collection System - Complete Project

✅ **Backend Complete** - FastAPI with PostgreSQL, JWT auth, all CRUD endpoints
✅ **Frontend In Progress** - React + TypeScript + Tailwind CSS

## Quick Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
cd ..
docker-compose up -d
python -m backend.scripts.init_db
python -m backend.scripts.create_admin
uvicorn backend.main:app --reload --port 8000
```

### Frontend  

```bash
cd frontend
npm install
npm run dev
```

Access: <http://localhost:5173>

## Features

- Admin authentication with JWT
- Organization management with search
- Project tracking with status
- Analytics dashboard
- Modern responsive UI

## Tech Stack

**Backend**: FastAPI, PostgreSQL, SQLAlchemy, JWT
**Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts

## Status

Backend: ✅ Complete
Frontend: 🔄 Components being generated...

See full documentation after setup completion.
