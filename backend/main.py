import sys
import os



from fastapi import FastAPI
from backend.routes import customers  # Supprimer "Backend."
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Inclure les routes
app.include_router(customers.router)

@app.get("/")
def home():
    return {"message": "API FastAPI pour la gestion des clients"}




# Configuration du CORS pour permettre les requêtes depuis React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Autoriser React
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Autoriser tous les headers
)
