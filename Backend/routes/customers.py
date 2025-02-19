from fastapi import APIRouter, Query, HTTPException
from Backend.database import collection
from typing import List, Optional

router = APIRouter()

# 🔹 1. GET /customers → Liste tous les clients avec pagination (facultatif)
@router.get("/customers", response_model=List[dict])
def get_customers(
    country: Optional[str] = Query(None, description="Filtrer par pays"),
    company: Optional[str] = Query(None, description="Filtrer par entreprise"),
    skip: int = 0,  # Pagination : nombre d'éléments à sauter
    limit: int = 10  # Nombre maximum d'éléments retournés
):
    """
    Récupère la liste des clients avec filtres optionnels sur le pays et l'entreprise.
    """
    query = {}
    if country:
        query["country"] = country
    if company:
        query["company"] = company

    customers = list(collection.find(query, {"_id": 0}).skip(skip).limit(limit))
    return customers


# 🔹 2. GET /customers/{customer_id} → Récupère un client spécifique
@router.get("/customers/{customer_id}", response_model=dict)
def get_customer_by_id(customer_id: str):
    """
    Récupère un client par son ID unique.
    """
    customer = collection.find_one({"customer_id": customer_id}, {"_id": 0})
    if not customer:
        raise HTTPException(status_code=404, detail="Client non trouvé")
    return customer


# 🔹 3. GET /countries → Nombre de clients par pays
@router.get("/countries", response_model=dict)
def get_customers_by_country():
    """
    Renvoie le nombre de clients par pays.
    """
    pipeline = [
        {"$group": {"_id": "$country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return {"countries": result}


# 🔹 4. GET /companies → Nombre de clients par entreprise
@router.get("/companies", response_model=dict)
def get_customers_by_company():
    """
    Renvoie la liste des entreprises et le nombre de clients associés.
    """
    pipeline = [
        {"$group": {"_id": "$company", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(collection.aggregate(pipeline))
    return {"companies": result}
