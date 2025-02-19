import pandas as pd
import pymongo
import re
from fastapi import APIRouter, HTTPException
from Backend.database import collection
from pathlib import Path

router = APIRouter()

# Chemin du fichier CSV (à adapter selon ton projet)
CSV_FILE_PATH = Path("Data/customers-100.csv")

def clean_phone(phone):
    """ Nettoyage des numéros de téléphone (garde uniquement les chiffres). """
    if pd.isna(phone):
        return None
    return re.sub(r'[^0-9]', '', phone)  # Supprimer tout sauf les chiffres

def is_valid_email(email):
    """ Vérification si l'email est valide. """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

@router.post("/import-customers")
def import_customers():
    """
    Endpoint pour importer et nettoyer les données clients depuis un fichier CSV.
    """
    try:
        # Vérifier si le fichier CSV existe
        if not CSV_FILE_PATH.exists():
            raise HTTPException(status_code=400, detail="Fichier CSV non trouvé")

        # Lecture du fichier CSV
        df = pd.read_csv(CSV_FILE_PATH)

        # Nettoyage des données
        df["Phone 1"] = df["Phone 1"].apply(clean_phone)
        df["Phone 2"] = df["Phone 2"].apply(clean_phone)
        df = df[df["Email"].apply(is_valid_email)]

        # Transformation : Ajout d'un champ "Full Name"
        df["Full Name"] = df["First Name"] + " " + df["Last Name"]

        # Sélection des colonnes utiles
        cleaned_df = df[["Customer Id", "Full Name", "Company", "City", "Country", "Phone 1", "Phone 2", "Email", "Subscription Date", "Website"]]

        # Insérer les données dans MongoDB
        records = cleaned_df.to_dict(orient="records")
        collection.insert_many(records)

        return {"message": "Données importées avec succès", "imported_records": len(records)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'importation : {str(e)}")
