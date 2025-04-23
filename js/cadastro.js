document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado'); // Verifique se este log aparece no console

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

    // Configuração para o campo de confirmar senha
    const toggleConfirmPassword = document.getElementById('toggle-password-confirm');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const eyeIconConfirm = document.getElementById('eye-icon-confirm');

    if (toggleConfirmPassword && confirmPasswordInput && eyeIconConfirm) {
        toggleConfirmPassword.addEventListener('click', () => {
            const isPasswordVisible = confirmPasswordInput.type === 'password';
            confirmPasswordInput.type = isPasswordVisible ? 'text' : 'password';
            eyeIconConfirm.src = isPasswordVisible 
                ? '../images/login-imagens/olho-aberto.png' 
                : '../images/login-imagens/olho-fechado.png';
            eyeIconConfirm.alt = isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha';
        });
    } else {
        console.error('Elementos do campo de confirmar senha não encontrados no DOM');
    }
});