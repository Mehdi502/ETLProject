📌 ETL Project - FastAPI & MongoDB Ce projet met en place un pipeline ETL pour importer, nettoyer et exposer des données clients via une API FastAPI connectée à MongoDB.

📌 Ce qui a été fait jusqu’à présent : ✅ Nettoyage des données (ETL) :

Suppression des caractères non numériques dans les numéros de téléphone. Validation des adresses email. Ajout d’un champ "Full Name" (First Name + Last Name). Filtrage des données corrompues et insertion dans MongoDB. ✅ API FastAPI avec les endpoints suivants :

GET /customers → Liste tous les clients (avec filtres & pagination). GET /customers/{customer_id} → Récupère un client spécifique. GET /countries → Nombre de clients par pays. GET /companies → Nombre de clients par entreprise. POST /customers → Ajoute un nouveau client. PUT /customers/{customer_id} → Met à jour un client. DELETE /customers/{customer_id} → Supprime un client. POST /import-customers → Importe et nettoie les données depuis un fichier CSV. ✅ Testé avec Swagger UI : http://127.0.0.1:8000/docs.

📌 Prochaines étapes : Ajouter un frontend React pour afficher les données
