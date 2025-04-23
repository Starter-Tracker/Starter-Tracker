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