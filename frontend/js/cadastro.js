document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Limpar erros
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');

            // Coletar dados
            const formData = {
                username: document.getElementById('username').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                confirm_password: document.getElementById('confirm-password').value
            };

            // Validação frontend
            let isValid = true;

            // Validação para cada campo
            if (!formData.username) {
                showError('username-error', 'O nome de usuário é obrigatório');
                isValid = false;
            }

            if (!formData.email) {
                showError('email-error', 'O email é obrigatório');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                showError('email-error', 'Por favor, insira um email válido');
                isValid = false;
            }

            if (!formData.password) {
                showError('password-error', 'A senha é obrigatória');
                isValid = false;
            } else if (formData.password.length < 8) {
                showError('password-error', 'A senha deve ter pelo menos 8 caracteres');
                isValid = false;
            }

            if (formData.password !== formData.confirm_password) {
                showError('confirm_password-error', 'As senhas não coincidem');
                isValid = false;
            }

            if (isValid) {
                try {
                    // URL CORRETA do seu backend
                    const response = await fetch('http://localhost:3000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    const result = await response.json();
                        
                    if (!response.ok) {
                        // Tratar erros do backend
                        if (result.errors) {
                            result.errors.forEach(error => {
                                const errorId = `${error.path}-error`;
                                showError(errorId, error.msg);
                            });
                        }
                        throw new Error(result.message || 'Erro no cadastro');
                    }

                    // Redirecionar se sucesso
                    window.location.href = './login.html';
                    
                } catch (error) {
                    console.error('Erro no cadastro:', error);
                    alert('Erro: ' + error.message);
                }
            }
        });
    }

    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        } else {
            console.warn(`Elemento com ID ${elementId} não encontrado`);
        }
    }

    // ... (seu código existente para os toggles de senha)
});