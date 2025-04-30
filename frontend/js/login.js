document.addEventListener('DOMContentLoaded', () => {
    // Toggle de senha (mantido igual)
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', () => {
            console.log('Botão clicado'); // Verifique se este log aparece no console

            // Alterna o tipo do campo de senha
            const isPasswordVisible = passwordInput.type === 'password';
            passwordInput.type = isPasswordVisible ? 'text' : 'password';

            // Alterna o ícone do olho
            eyeIcon.src = isPasswordVisible 
                ? '../images/login-imagens/olho-aberto.png' 
                : '../images/login-imagens/olho-fechado.png';
            eyeIcon.alt = isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha';
        });
    }

    // Função de login - CORREÇÕES AQUI
    const loginForm = document.getElementById('login-form'); // ✅ Usando ID em vez de classe
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // ✅ Seletores corrigidos (usando IDs)
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // ✅ URL COMPLETA do backend (ajuste a porta se necessário)
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ 
                        email, 
                        password 
                    }),
                });

            const data = await response.json();

                if (response.ok) {
                    // Redirecionamento
                    window.location.href = data.redirectTo || './perguntas.html';
                } else {
                    alert(data.message || 'Erro no login');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Falha na conexão. Verifique o console para detalhes.');
            }
        });
    }
});