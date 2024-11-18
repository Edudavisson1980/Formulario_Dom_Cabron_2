// Importação do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAItnN6k046cLMsWAxSrCrkV9yyLklMFrI",
  authDomain: "formulario-dom-cabron.firebaseapp.com",
  databaseURL: "https://formulario-dom-cabron-default-rtdb.firebaseio.com",
  projectId: "formulario-dom-cabron",
  storageBucket: "formulario-dom-cabron.firebasestorage.app",
  messagingSenderId: "583969099203",
  appId: "1:583969099203:web:17b8ce2f39ba3fa0c0c176",
  measurementId: "G-679JQ53TCJ"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Enviar comentário
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const city = document.getElementById("city").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const date = new Date().toLocaleString();

    if (name && city && comments) {
        try {
            // Envia os dados ao Firebase
            await db.ref("comments/").push({
                name,
                city,
                comments,
                date
            });

            alert("Comentário enviado com sucesso!");
            document.getElementById("reviewForm").reset();
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
            alert("Não foi possível enviar o comentário. Tente novamente.");
        }
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

// Exibir comentários
const commentsList = document.getElementById("commentsList");

// Monitorar alterações no banco de dados
db.ref("comments/").on("value", (snapshot) => {
    commentsList.innerHTML = ""; // Limpa a lista antes de renderizar
    snapshot.forEach((childSnapshot) => {
        const comment = childSnapshot.val();
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${comment.date} - ${comment.name} (${comment.city}):</span>
            <p>${comment.comments}</p>
        `;
        commentsList.appendChild(li);
    });
});