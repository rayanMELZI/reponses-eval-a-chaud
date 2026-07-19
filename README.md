# FormEval — Réponses aux questionnaires d'évaluation à chaud

Plateforme web de gestion des questionnaires d'évaluation "à chaud" des formations :
les participants répondent à un questionnaire de satisfaction à l'issue de chaque
session de formation, et les administrateurs suivent les taux de satisfaction,
gèrent les formations, les participants et les rôles.

## Fonctionnalités

- **Participant** : répondre aux questionnaires (ouverts, en attente, clôturés), consulter ses réponses.
- **Admin Formation** : créer/gérer les formations et les participants, consulter les réponses et statistiques, imprimer les rapports.
- **Admin IT** : gestion des membres, des rôles et des paramètres de base (LDAP, messagerie, synchronisation).
- **Admin Visiteur** : consultation en lecture seule des résultats et impression.
- Authentification locale ou via LDAP, notifications par e-mail (nodemailer), tableaux de bord et graphiques (MUI X Charts / Chart.js).

## Stack technique

| Partie | Technologies |
|---|---|
| Frontend (`client/`) | React 18, Vite, React Router, MUI, Chart.js |
| Backend (`server/`) | Node.js, Express, LDAP (ldapjs), nodemailer, node-cron, WebSocket |
| Base de données | MySQL / MariaDB (dump : `client/form-eval.sql`) |

## Démarrage en local

### 1. Base de données

Créer une base `form-eval` et importer le dump :

```bash
mysql -u root -p form-eval < client/form-eval.sql
```

### 2. Backend

```bash
cd server
npm install
# Variables d'environnement pour l'envoi d'e-mails :
#   SMTP_USER=votre_adresse@exemple.com
#   SMTP_PASS=votre_mot_de_passe_application
npm run prod        # ou: npm start (nodemon)
```

Le serveur écoute sur le port 8000 et sert aussi le build du frontend depuis `server/dist` (copier le contenu de `client/dist` après un build).

### 3. Frontend (dev)

```bash
cd client
npm install
npm run dev
```

### Docker

Un `docker-compose.yaml` est fourni dans `client/` (MySQL, phpMyAdmin, frontend, backend).
Pensez à remplacer les mots de passe `change_me_dev_password` avant utilisation.

## Structure

```
client/   Application React (Vite)
server/   API Express + services (LDAP, e-mail, cron)
```
