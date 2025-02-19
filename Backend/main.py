from fastapi import FastAPI
from Backend.routes import customers  # Import du fichier routes/customers.py

app = FastAPI()

# Inclusion des routes API
app.include_router(customers.router)

@app.get("/")
def home():
    return {"message": "API FastAPI pour la gestion des clients"}
