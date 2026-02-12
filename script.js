
var firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

const ADMIN_EMAIL = "TU_CORREO_ADMIN@gmail.com";

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(provider);
}

auth.getRedirectResult().then((result) => {
  if (result.user) {
    if (result.user.email === ADMIN_EMAIL) {
      window.location.href = "admin.html";
    } else {
      alert("Inicio de sesión exitoso");
    }
  }
}).catch((error) => {
  console.error(error);
});

function goAdmin() {
  window.location.href = "admin.html";
}

auth.onAuthStateChanged((user) => {
  if (window.location.pathname.includes("admin.html")) {
    if (!user || user.email !== ADMIN_EMAIL) {
      document.getElementById("status").innerText = "Acceso denegado";
    } else {
      document.getElementById("status").innerText = "Bienvenido Admin: " + user.email;
    }
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
