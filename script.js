
const loginBtn = document.getElementById("loginBtn");
const surveySection = document.getElementById("surveySection");
const submitBtn = document.getElementById("submitBtn");

loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

auth.onAuthStateChanged(user => {
    if (user) {
        surveySection.classList.remove("hidden");
        loginBtn.style.display = "none";
    }
});

submitBtn.addEventListener("click", async () => {
    const candidato = document.getElementById("candidato").value;

    if (!candidato) {
        alert("Selecciona un candidato");
        return;
    }

    const user = auth.currentUser;

    await db.collection("respuestas").add({
        uid: user.uid,
        email: user.email,
        candidato: candidato,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Respuesta enviada correctamente");
});
