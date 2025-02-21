import sys
import os



from fastapi import FastAPI
from backend.routes import customers  # Supprimer "Backend."

app = FastAPI()

# Inclure les routes
app.include_router(customers.router)

@app.get("/")
def home():
    return {"message": "API FastAPI pour la gestion des clients"}
