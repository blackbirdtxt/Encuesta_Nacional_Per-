
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "encuestanacionalperu-77532.firebaseapp.com",
  projectId: "encuestanacionalperu-77532",
  storageBucket: "encuestanacionalperu-77532.firebasestorage.app",
  messagingSenderId: "900614454161",
  appId: "1:900614454161:web:80b23f81342b6aee147830"
};


firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

const ADMIN_EMAIL = "oscarsitoequisde@gmail.com";

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
