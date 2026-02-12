// CONFIGURACIÓN FIREBASE
var firebaseConfig = {
  apiKey: "AIzaSyCnUa9eQo0xo-ZABSdbUX1xyWQwFfRVnKo",
  authDomain: "encuestanacionalperu-77532.firebaseapp.com",
  projectId: "encuestanacionalperu-77532",
  storageBucket: "encuestanacionalperu-77532.appspot.com",
  messagingSenderId: "900614454161",
  appId: "1:900614454161:web:80b23f81342b6aee147830"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();

const ADMIN_EMAIL = "oscarsitoequisde@gmail.com";

// LOGIN
function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(provider);
}

auth.getRedirectResult();

auth.onAuthStateChanged(user => {
  if (user) {
    const votacion = document.getElementById("votacion");
    if (votacion) votacion.style.display = "block";

    // Panel Admin
    if (window.location.pathname.includes("admin.html")) {
      if (user.email === ADMIN_EMAIL) {
        document.getElementById("adminStatus").innerText =
          "Bienvenido Admin: " + user.email;
      } else {
        document.getElementById("adminStatus").innerText =
          "Acceso denegado";
      }
    }
  }
});

// VOTAR
function votar(candidato) {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("votos").doc(user.uid).set({
    candidato: candidato,
    fecha: new Date()
  });

  alert("Voto registrado");
}

// RESULTADOS EN TIEMPO REAL
db.collection("votos").onSnapshot(snapshot => {
  let conteo = {};

  snapshot.forEach(doc => {
    const data = doc.data();
    conteo[data.candidato] =
      (conteo[data.candidato] || 0) + 1;
  });

  const resultadosDiv = document.getElementById("resultados");
  if (resultadosDiv) {
    resultadosDiv.innerHTML = "";
    for (let c in conteo) {
      resultadosDiv.innerHTML += `<p>${c}: ${conteo[c]} votos</p>`;
    }
  }
});

// EXPORTAR EXCEL
function exportarExcel() {
  db.collection("votos").get().then(snapshot => {
    let csv = "Usuario,Candidato,Fecha\n";

    snapshot.forEach(doc => {
      let data = doc.data();
      csv += `${doc.id},${data.candidato},${data.fecha.toDate()}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "resultados.csv";
    a.click();
  });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
