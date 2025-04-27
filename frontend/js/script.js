document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const questionnaireCard = document.getElementById('questionnaire-card');
    const completionCard = document.getElementById('completion-card');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const numberInputContainer = document.getElementById('number-input-container');
    const numberInput = document.getElementById('number-input');
    const scoreContainer = document.getElementById('score-container');
    const scoreValue = document.getElementById('score-value');
    const scoreText = document.getElementById('score-text');
    const validationMessage = document.getElementById('validation-message');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    // qualquer
    // Função para gerar opções de exemplo (já que são muitas)
    function generateOptions(count, prefix) {
        const options = [];
        for (let i = 1; i <= count; i++) {
            options.push(`${prefix} ${i}`);
        }
        return options;
    }

    // Definição das perguntas do questionário
    const questions = [
        {
            id: 1,
            question: "Quais dessas características você considera importantes em um produto? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(49, "Característica")
        },
        {
            id: 2,
            question: "Quais dessas marcas você conhece? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(36, "Marca")
        },
        {
            id: 3,
            question: "Quais desses serviços você utiliza regularmente? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(35, "Serviço")
        },
        {
            id: 4,
            question: "Quais dessas atividades você gosta de fazer no tempo livre? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(27, "Atividade")
        },
        {
            id: 5,
            question: "Quais desses alimentos você consome regularmente? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(34, "Alimento")
        },
        {
            id: 6,
            question: "Quantas horas por semana você dedica a atividades de lazer?",
            type: "number"
        },
        {
            id: 7,
            question: "Em uma escala de 1 a 10, qual seu nível de satisfação com sua vida atual?",
            type: "number"
        },
        {
            id: 8,
            question: "Seu score de bem-estar",
            type: "score"
        },
        {
            id: 9,
            question: "Quais dessas tecnologias você utiliza diariamente? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(49, "Tecnologia")
        },
        {
            id: 10,
            question: "Quais desses lugares você gostaria de visitar? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(36, "Lugar")
        },
        {
            id: 11,
            question: "Quais dessas habilidades você gostaria de desenvolver? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(35, "Habilidade")
        },
        {
            id: 12,
            question: "Quais desses temas te interessam? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(27, "Tema")
        },
        {
            id: 13,
            question: "Quais dessas metas você tem para o próximo ano? (Selecione quantas quiser)",
            type: "checkbox",
            options: generateOptions(34, "Meta")
        },
        {
            id: 14,
            question: "Como você classificaria sua experiência com este questionário? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Muito fácil de usar",
                "Intuitivo",
                "Visualmente agradável",
                "Interessante",
                "Demorado",
                "Complexo",
                "Educativo",
                "Divertido",
                "Cansativo"
            ]
        }
    ];

    // Estado do questionário
    let currentQuestion = 0;
    const answers = {};

    // Função para atualizar a interface com a pergunta atual
    function updateQuestion() {
        const question = questions[currentQuestion];
        
        // Atualizar contador e barra de progresso
        questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
        progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        
        // Atualizar texto da pergunta
        questionText.textContent = question.question;
        
        // Esconder todos os containers e mensagem de validação
        optionsContainer.classList.add('hidden');
        numberInputContainer.classList.add('hidden');
        scoreContainer.classList.add('hidden');
        validationMessage.classList.add('hidden');
        
        // Mostrar o container apropriado baseado no tipo de pergunta
        if (question.type === 'checkbox') {
            optionsContainer.classList.remove('hidden');
            
            // Limpar e preencher opções
            optionsContainer.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                
                // Verificar se esta opção já foi selecionada
                if (answers[question.id] && answers[question.id].includes(option)) {
                    optionElement.classList.add('selected');
                }
                
                const checkboxId = `option-${question.id}-${index}`;
                
                optionElement.innerHTML = `
                    <input type="checkbox" id="${checkboxId}" name="question-${question.id}" value="${option}" ${answers[question.id] && answers[question.id].includes(option) ? 'checked' : ''}>
                    <label for="${checkboxId}">${option}</label>
                `;
                
                // Adicionar event listener apenas ao checkbox e label
                const checkbox = optionElement.querySelector('input[type="checkbox"]');
                
                checkbox.addEventListener('change', function() {
                    // Atualizar classe 'selected' no elemento pai
                    if (this.checked) {
                        optionElement.classList.add('selected');
                    } else {
                        optionElement.classList.remove('selected');
                    }
                    
                    // Atualizar respostas
                    updateAnswers();
                    
                    // Verificar se pelo menos uma opção está selecionada
                    const hasSelection = optionsContainer.querySelectorAll('input[type="checkbox"]:checked').length > 0;
                    nextBtn.disabled = !hasSelection;
                    
                    // Esconder mensagem de validação se houver seleção
                    if (hasSelection) {
                        validationMessage.classList.add('hidden');
                    }
                });
                
                optionsContainer.appendChild(optionElement);
            });
            
            // Verificar se já há respostas para esta pergunta
            const hasSelection = answers[question.id] && answers[question.id].length > 0;
            nextBtn.disabled = !hasSelection;
            
        } else if (question.type === 'number') {
            numberInputContainer.classList.remove('hidden');
            numberInput.value = answers[question.id] || '';
            numberInput.focus();
            
            // Limitar entrada para números entre 1 e 10 para a pergunta 7
            if (question.id === 7) {
                numberInput.min = 1;
                numberInput.max = 10;
                numberInput.placeholder = "Digite um número de 1 a 10";
            } else {
                numberInput.min = 0;
                numberInput.max = "";
                numberInput.placeholder = "Digite um número";
            }
            
            // Verificar se já há resposta para esta pergunta
            nextBtn.disabled = !numberInput.value;
            
        } else if (question.type === 'score') {
            scoreContainer.classList.remove('hidden');
            
            // Calcular score baseado nas respostas das perguntas 6 e 7
            const answer6 = parseInt(answers[6]) || 0;
            const answer7 = parseInt(answers[7]) || 0;
            
            // Calcular porcentagem (limitada a 100%)
            let percentage = Math.min((answer6 * answer7) / 100, 100);
            percentage = Math.round(percentage);
            
            // Atualizar valor e gráfico
            scoreValue.textContent = `${percentage}%`;
            document.querySelector('.score-circle').style.background = 
                `conic-gradient(var(--green-600) ${percentage}%, var(--green-300) 0%)`;
            
            // Texto explicativo
            if (percentage < 30) {
                scoreText.textContent = "Seu score de bem-estar está baixo. Considere dedicar mais tempo a atividades que te fazem feliz.";
            } else if (percentage < 70) {
                scoreText.textContent = "Seu score de bem-estar está moderado. Você está no caminho certo!";
            } else {
                scoreText.textContent = "Parabéns! Seu score de bem-estar está excelente. Continue assim!";
            }
            
            // Salvar o score como resposta
            answers[question.id] = percentage.toString();
            
            // Sempre permitir avançar na tela de score
            nextBtn.disabled = false;
        }
        
        // Atualizar estado do botão anterior
        prevBtn.disabled = currentQuestion === 0;
        
        // Atualizar texto do botão de próxima
        if (currentQuestion === questions.length - 1) {
            nextBtn.innerHTML = 'Finalizar <i class="fas fa-check-circle"></i>';
        } else {
            nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
        }
    }

    // Função para atualizar as respostas das perguntas de múltipla escolha
    function updateAnswers() {
        const question = questions[currentQuestion];
        
        if (question.type === 'checkbox') {
            const selectedOptions = [];
            const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
            
            checkboxes.forEach(checkbox => {
                selectedOptions.push(checkbox.value);
            });
            
            answers[question.id] = selectedOptions;
        }
    }

    // Função para validar se pode avançar para a próxima pergunta
    function validateBeforeNext() {
        const question = questions[currentQuestion];
        
        if (question.type === 'checkbox') {
            // Verificar se pelo menos uma opção está selecionada
            const selectedOptions = answers[question.id] || [];
            if (selectedOptions.length === 0) {
                validationMessage.textContent = "Por favor, selecione pelo menos uma opção para continuar.";
                validationMessage.classList.remove('hidden');
                return false;
            }
        } else if (question.type === 'number') {
            // Verificar se um número foi inserido
            const value = numberInput.value.trim();
            if (!value) {
                validationMessage.textContent = "Por favor, digite um número para continuar.";
                validationMessage.classList.remove('hidden');
                return false;
            }
            
            // Salvar a resposta
            answers[question.id] = value;
        }
        
        // Se chegou aqui, pode avançar
        validationMessage.classList.add('hidden');
        return true;
    }

    // Função para ir para a próxima pergunta
    function goToNextQuestion() {
        // Validar antes de avançar
        if (!validateBeforeNext()) {
            return;
        }
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            updateQuestion();
        } else {
            // Mostrar tela de conclusão
            document.querySelector('.questionnaire-layout').classList.add('hidden');
            completionCard.classList.remove('hidden');
            
            // Exibir respostas no console (para fins de demonstração)
            console.log("Respostas:", answers);
        }
    }

    // Função para ir para a pergunta anterior
    function goToPreviousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestion();
        }
    }

    // Função para reiniciar o questionário
    function restartQuestionnaire() {
        currentQuestion = 0;
        Object.keys(answers).forEach(key => delete answers[key]);
        completionCard.classList.add('hidden');
        document.querySelector('.questionnaire-layout').classList.remove('hidden');
        updateQuestion();
    }

    // Event listener para o input numérico
    numberInput.addEventListener('input', function() {
        // Validar entrada para a pergunta 7 (escala de 1 a 10)
        if (questions[currentQuestion].id === 7) {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        }
        
        // Habilitar/desabilitar botão próximo
        nextBtn.disabled = !this.value.trim();
        
        // Esconder mensagem de validação se houver valor
        if (this.value.trim()) {
            validationMessage.classList.add('hidden');
        }
    });

    // Adicionar event listeners
    nextBtn.addEventListener('click', goToNextQuestion);
    prevBtn.addEventListener('click', goToPreviousQuestion);
    restartBtn.addEventListener('click', restartQuestionnaire);

    // Inicializar o questionário
    updateQuestion();
});