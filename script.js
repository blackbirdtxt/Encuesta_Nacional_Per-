
const ADMIN_EMAIL = "oscarsitoequisde@gmail.com";

const auth = firebase.auth();
const db = firebase.firestore();

const departamentos = [
  "Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao",
  "Cusco","Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque",
  "Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno",
  "San Martín","Tacna","Tumbes","Ucayali"
];

const loginBtn = document.getElementById("loginBtn");
const formContainer = document.getElementById("formContainer");
const submitBtn = document.getElementById("submitBtn");
const departamentoSelect = document.getElementById("departamento");

departamentos.forEach(dep => {
  const option = document.createElement("option");
  option.value = dep;
  option.textContent = dep;
  departamentoSelect.appendChild(option);
});

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

auth.onAuthStateChanged(user => {
  if (user) {
    if (user.email === ADMIN_EMAIL) {
      document.getElementById("adminAccess").classList.remove("hidden");
    }
  }
});

submitBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  const departamento = departamentoSelect.value;
  const partido = document.getElementById("partido").value;

  if (!departamento || !partido) {
    alert("Completa todos los campos.");
    return;
  }

  db.collection("votos").doc(user.uid).set({
    departamento,
    partido,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Voto registrado.");
  });
});

// Gráfico
const ctx = document.getElementById("chart").getContext("2d");
let chart;

db.collection("votos").onSnapshot(snapshot => {
  const conteo = {};
  snapshot.forEach(doc => {
    const data = doc.data();
    conteo[data.partido] = (conteo[data.partido] || 0) + 1;
  });

  const labels = Object.keys(conteo);
  const values = Object.values(conteo);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{ label: "Votos", data: values }]
    }
  });

  document.getElementById("totalVotes").textContent =
    "Total de votos registrados: " + snapshot.size;
});
