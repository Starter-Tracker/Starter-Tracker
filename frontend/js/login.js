document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');

    // Configuração para o campo de senha
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', () => {
            const isPasswordVisible = passwordInput.type === 'password';
            passwordInput.type = isPasswordVisible ? 'text' : 'password';
            eyeIcon.src = isPasswordVisible 
                ? '../images/login-imagens/olho-aberto.png' 
                : '../images/login-imagens/olho-fechado.png';
            eyeIcon.alt = isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha';
        });
    } else {
        console.error('Elementos do campo de senha não encontrados no DOM');
    }

    // Código para enviar os dados do formulário de login ao backend
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Login realizado com sucesso!');
                    localStorage.setItem('token', data.token); // Armazena o token JWT
                    window.location.href = 'dashboard.html'; // Redireciona para o dashboard
                } else {
                    alert(data.message || 'Erro ao fazer login');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro no servidor. Tente novamente mais tarde.');
            }
        });
    } else {
        console.error('Formulário de login não encontrado no DOM');
    }
});
