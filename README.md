
# Encuesta Nacional Perú 2026 - Proyecto Profesional

## PASOS PARA CONFIGURAR FIREBASE

1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto.
3. Activa Authentication → Método Google.
4. Activa Firestore Database (modo producción).
5. En configuración del proyecto → Agregar app web.
6. Copia los datos y reemplázalos en firebase-config.js

## Reglas recomendadas Firestore:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /respuestas/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

## Cómo subir a GitHub

1. Reemplaza todos tus archivos por estos.
2. Haz commit.
3. Activa GitHub Pages.
4. En Firebase → Authentication → Authorized domains → agrega tu dominio github.io

Proyecto listo.
