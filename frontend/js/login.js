document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado'); // Verifique se este log aparece no console

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
    } else {
        console.error('Elementos não encontrados no DOM');
    }
    
});


//função para redirecionar quando fizer login

const loginForm = document.querySelector('.login-form');
    
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio tradicional do formulário
        
        // Obtém os valores dos campos
        const email = document.querySelector('.email-input').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redireciona para a página retornada pelo servidor
                window.location.href = data.redirectTo || '/perguntas.html';
            } else {
                alert(data.message || 'Erro no login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha na conexão com o servidor');
        }
    });
}