import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password)
        // Aqui você pode adicionar lógica para verificar o usuário e senha

    });
});

function login(email, senha) {
    console.log(email, senha)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.href = 'index.html'; // Redireciona para a página principal
            console.log('funcionou', user)
            // ...
        })
        .catch((error) => {
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Usuário ou senha incorretos.';
            errorMessage.style.display = 'block';
            console.log('Erro', error)
            // ...
        });
}

