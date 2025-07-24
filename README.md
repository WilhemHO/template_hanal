# template_hanal

Ce projet est une application web développée avec React (Create React App) et un backend Node.js/Express pour récupérer les données sur bigquery.
Le déploiement principal se fait sur Vercel, où l’application fonctionne directement sans configuration supplémentaire.

## 🚀 Démo en ligne

L’application est accessible et fonctionnelle directement sur Vercel :  
➡️ [template-hanal-alcp-git-main-wilhemhos-projects.vercel.app](https://template-hanal-alcp-git-main-wilhemhos-projects.vercel.app)

---

## 📦 Structure du projet

- `api/` : Points d’API pour l’application (Node.js/Express)
- `backend/` : Backend Node.js, routes et services (mais ca ne fonctionne pas, seul le fichier bigquery.js est utile dans le backend)
- `public/` : Fichiers statiques (favicon, manifest, etc.)
- `src/` : Code source React (composants, styles, etc.)

---

## ⚡️ Utilisation

### 1. Version en ligne (recommandée)

Aucune installation requise.  
Rendez-vous simplement sur :  
[https://template-hanal-alcp-git-main-wilhemhos-projects.vercel.app](https://template-hanal-alcp-git-main-wilhemhos-projects.vercel.app)

### 2. Version locale (ne fonctionne pas directement)

> ⚠️ L’application ne fonctionne pas en local avec ce dépôt.  
> Pour une version locale fonctionnelle, veuillez cloner le dépôt suivant :  
> [https://github.com/WilhemHO/test_projet.git](https://github.com/WilhemHO/test_projet.git)

#### Procédure pour la version locale :

```bash
git clone https://github.com/WilhemHO/test_projet.git
cd test_projet
npm install
npm start

# Pour démarrer le backend (dans un autre terminal) :
cd test_projet/backend
node server.js
# Server running on http://localhost:4000
```

L’application frontend sera alors accessible sur [http://localhost:3000](http://localhost:3000).
Le backend sera accessible sur [http://localhost:4000](http://localhost:4000).

---

## 🛠️ Dépendances principales

- React (Create React App)
- react-router-dom
- chart.js, react-chartjs-2
- Node.js, Express (backend)

---

## 🔗 Connexion à BigQuery

La connexion à BigQuery se fait via le module `@google-cloud/bigquery` dans le fichier `backend/services/bigquery.js`.

- **Sur Vercel** :
  - La clé de service Google (JSON) doit être fournie dans la variable d’environnement `GOOGLE_APPLICATION_CREDENTIALS_JSON`.

## 🌱 Variables d'environnement

Pour le bon fonctionnement de la connexion à BigQuery, les variables d'environnement suivantes doivent être définies :

> **À configurer sur Vercel, section Environment Variables du projet.**

- `GOOGLE_CLOUD_PROJECT` : ID de votre projet Google Cloud.
- `GOOGLE_APPLICATION_CREDENTIALS_JSON` : Contenu du fichier de credentials Google Cloud (format JSON, à copier/coller dans la variable d'environnement).
- `BIGQUERY_DATASET` : Nom du dataset BigQuery à utiliser pour les requêtes.

> Exemple d'utilisation sur Vercel : ajoutez ces variables dans la configuration du projet (onglet Environment Variables).

## ℹ️ Remarques

- Le projet actuel sur ce dépôt n’est pas conçu pour fonctionner en local sans adaptation.
- Pour toute contribution ou installation locale, utilisez le dépôt GitHub mentionné ci-dessus.

> ℹ️ Remarque : Dans le dossier `backend/`, seul le fichier `bigquery.js` est réellement utilisé pour la connexion à BigQuery. Les autres fichiers backend (routes, services, etc.) ne sont pas fonctionnels ou nécessaires dans ce projet.
