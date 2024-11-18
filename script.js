// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const city = document.getElementById("city").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const date = new Date().toLocaleString();

    if (name && city && comments) {
        push(ref(db, "comments/"), {
            name,
            city,
            comments,
            date
        });

        document.getElementById("reviewForm").reset();
        alert("Comentário enviado com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

const commentsList = document.getElementById("commentsList");

onValue(ref(db, "comments/"), (snapshot) => {
    commentsList.innerHTML = "";
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
