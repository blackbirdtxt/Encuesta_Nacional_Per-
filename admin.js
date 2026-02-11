
const ADMIN_EMAIL = "oscarsitoequisde@gmail.com";

const auth = firebase.auth();
const db = firebase.firestore();

const exportBtn = document.getElementById("exportBtn");
const statusText = document.getElementById("status");

auth.onAuthStateChanged(user => {
  if (user && user.email === ADMIN_EMAIL) {
    document.getElementById("adminSection").classList.remove("hidden");
  } else {
    document.getElementById("noAccess").classList.remove("hidden");
  }
});

exportBtn.addEventListener("click", async () => {
  const snapshot = await db.collection("votos").get();
  let csv = "Departamento,Partido,Fecha\n";

  snapshot.forEach(doc => {
    const data = doc.data();
    csv += `${data.departamento},${data.partido},${data.timestamp?.toDate() || ""}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resultados_encuesta.csv";
  a.click();

  statusText.textContent = "Archivo exportado correctamente.";
});
