from pymongo import MongoClient

# Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["customer_db"]  # Base de données MongoDB
collection = db["customers"]  # Collection des clients
