
const resultados = document.getElementById("resultados");

db.collection("respuestas").onSnapshot(snapshot => {
    let conteo = {};

    snapshot.forEach(doc => {
        const data = doc.data();
        conteo[data.candidato] = (conteo[data.candidato] || 0) + 1;
    });

    resultados.innerHTML = "";

    for (let candidato in conteo) {
        const li = document.createElement("li");
        li.textContent = candidato + ": " + conteo[candidato] + " votos";
        resultados.appendChild(li);
    }
});
