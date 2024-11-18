// Importação do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

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
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Enviar comentário
document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const city = document.getElementById("city").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const date = new Date().toLocaleString();

    if (name && city && comments) {
        // Enviar para o Realtime Database
        push(ref(db, "comments/"), {
            name,
            city,
            comments,
            date
        }).then(() => {
            // Mensagem de sucesso e reset do formulário
            alert("Comentário enviado com sucesso!");
            document.getElementById("reviewForm").reset();
        }).catch((error) => {
            console.error("Erro ao enviar comentário:", error);
            alert("Erro ao enviar o comentário. Tente novamente.");
        });
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

// Exibir comentários
const commentsList = document.getElementById("commentsList");

// Monitorar alterações no banco de dados
onValue(ref(db, "comments/"), (snapshot) => {
    commentsList.innerHTML = ""; // Limpa a lista antes de renderizar novamente
    snapshot.forEach((childSnapshot) => {
        const comment = childSnapshot.val();
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${comment.date} - ${comment.name} (${comment.city}):</span>
            <p>${comment.comments}</p>
        `;
        commentsList.appendChild(li);
    });
}, (error) => {
    console.error("Erro ao buscar comentários:", error);
});