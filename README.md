# Cassa Ordini

App completa per la gestione ordini di una cassa con:
- Tracciamento transazioni
- Stampa ordini in PDF
- Interfaccia React moderna
- Backend Node.js + PostgreSQL
- Deploy su Render

## Avvio locale

### Backend
```bash
cd server
npm install
node index.js
```

### Frontend
```bash
cd client
npm install
npm start
```

## Deploy su Render
- Aggiungi DATABASE_URL come variabile ambiente
- Usa due servizi (web + static site) o monorepo
