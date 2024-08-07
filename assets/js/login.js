document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aqui você pode adicionar lógica para verificar o usuário e senha
        if (username === 'admin' && password === 'admin') {
            window.location.href = 'index.html'; // Redireciona para a página principal
        } else {
            errorMessage.textContent = 'Usuário ou senha incorretos.';
            errorMessage.style.display = 'block';
        }
    });
});
