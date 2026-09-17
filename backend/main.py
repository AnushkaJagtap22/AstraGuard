from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import investigations, radar, identity, help_finder, chat, extension
from seed_data import seed_initial_data

app = FastAPI(
    title="अस्त्रGuard Backend API",
    description="Agentic AI Digital Investigation & Safety Platform API",
    version="1.0.0"
)

# Enable CORS for local Vite React development frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    seed_initial_data()

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "अस्त्रGuard — Detect. Verify. Protect.",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
