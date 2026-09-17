import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import investigations, radar, identity, help_finder, chat, extension
from seed_data import seed_initial_data

# Load environment variables from .env file
env_path = os.path.join(os.path.dirname(__file__), ".env")
if not os.path.exists(env_path):
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
cors_env = os.getenv("CORS_ORIGINS", "*")
origins = [o.strip() for o in cors_env.split(",")] if cors_env != "*" else ["*"]

app = FastAPI(
    title="अस्त्रGuard Backend API",
    description="Agentic AI Digital Investigation & Safety Platform API",
    version="1.0.0"
)

# Enable CORS for frontend web app, Vercel deployments, and browser extensions
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(investigations.router)
app.include_router(radar.router)
app.include_router(identity.router)
app.include_router(help_finder.router)
app.include_router(chat.router)
app.include_router(extension.router)

@app.on_event("startup")
def on_startup():
    try:
        seed_initial_data()
    except Exception as e:
        print(f"[STARTUP WARNING] Database seeding note: {e}")

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "अस्त्रGuard — Detect. Verify. Protect.",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "environment": os.getenv("ENVIRONMENT", "production")
    }

@app.get("/health")
def health_check():
    """Lightweight, zero-overhead health check endpoint for Render monitoring."""
    return {
        "status": "ok",
        "service": "astraguard-backend",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
