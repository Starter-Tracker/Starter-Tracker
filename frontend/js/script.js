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
    let answers = {}; // Objeto para armazenar as respostas do questionário
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
            question: "Quais as linguagens de programação que você trabalha/estuda? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Ada",
                "Apex",
                "Assembly",
                "Bash/Shell (all shells)",
                "C",
                "C#",
                "C++",
                "Clojure",
                "Cobol",
                "Crystal",
                "Dart",
                "Delphi",
                "Elixir",
                "Erlang",
                "F#",
                "Fortran",
                "GDScript",
                "Go",
                "Groovy",
                "Haskell",
                "HTML/CSS",
                "Java",
                "JavaScript",
                "Julia",
                "Kotlin",
                "Lisp",
                "Lua",
                "MATLAB",
                "MicroPython",
                "Nim",
                "Objective-C",
                "OCaml",
                "Perl",
                "PHP",
                "PowerShell",
                "Prolog",
                "Python",
                "R",
                "Ruby",
                "Rust",
                "Scala",
                "Solidity",
                "SQL",
                "Swift",
                "TypeScript",
                "VBA",
                "Visual Basic (.Net)",
                "Zephyr",
                "Zig",
                "Nenhum",
            ]
        },
        {
            id: 2,
            question: "Quais os frameworks web que você trabalha/estuda? (Selecione quantos quiser)",
            type: "checkbox",
            options: [
                "Angular",
                "AngularJS",
                "ASP.NET",
                "ASP.NET CORE",
                "Astro",
                "Blazor",
                "CodeIgniter",
                "Deno",
                "Django",
                "Drupal",
                "Elm",
                "Express",
                "FastAPI",
                "Fastify",
                "Flask",
                "Gatsby",
                "Htmx",
                "jQuery",
                "Laravel",
                "NestJS",
                "Next.js",
                "Node.js",
                "Nuxt.js",
                "Phoenix",
                "Play Framework",
                "React",
                "Remix",
                "Ruby on Rails",
                "SolidJS",
                "Spring Boot",
                "Strapi",
                "Svelte",
                "Symfony",
                "Vue.js",
                "WordPress",
                "Yii 2",
                "Nenhum",
            ]
        },
        {
            id: 3,
            question: "Quais os Bancos de dados que você trabalha/estuda? (Selecione quantos quiser)",
            type: "checkbox",
            options: [
                "BigQuery",
                "Cassandra",
                "ClickHouse",
                "Cloud Firestore",
                "Cockroachdb",
                "Cosmos DB",
                "Couch DB",
                "Couchbase",
                "Databricks SQL",
                "Datomic",
                "DuckDB",
                "Dynamodb",
                "Elasticsearch",
                "EventStoreDB",
                "Firebase Realtime Database",
                "Firebird",
                "H2",
                "IBM DB2",
                "InfluxDB",
                "MariaDB",
                "Microsoft Access",
                "Microsoft SQL Server",
                "MongoDB",
                "MySQL",
                "Neo4j",
                "Oracle",
                "PostgreSQL",
                "Presto",
                "RavenDB",
                "Redis",
                "Snowflake",
                "Solr",
                "SQLite",
                "Supabase",
                "TiDB",
                "Nenhum", 
            ]
        },
        {
            id: 4,
            question: "Quais as plataformas de nuvem que você trabalha/estuda? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Alibaba Cloud",
                "Amazon Web Services (AWS)",
                "Cloudflare",
                "Colocation",
                "Databricks",
                "Digital Ocean",
                "Firebase",
                "Fly.io",
                "Google Cloud",
                "Heroku",
                "Hetzner",
                "IBM Cloud or Watson",
                "Linode",
                "Managed Hosting",
                "Microsoft Azure",
                "Netlify",
                "OpenShift",
                "OpenStack",
                "Oracle Cloud Infrastructure (OCI)",
                "OVH",
                "PythonAnywhere",
                "Render",
                "Scaleway",
                "Supabase",
                "Vercel",
                "VMware",
                "Vultr",
                "Nenhum",
            ]
        },
        {
            id: 5,
            question: "Quais ferramentas para compilar, buildar e testar você trabalha/estuda? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Ansible",
                "Ant",
                "APT",
                "Bun",
                "Chef",
                "Chocolatey",
                "Composer",
                "Dagger",
                "Docker",
                "Godot",
                "Google Test",
                "Gradle",
                "Homebrew",
                "Kubernetes",
                "Make",
                "Maven (build tool)",
                "MSBuild",
                "Ninja",
                "Nix",
                "npm",
                "NuGet",
                "Pacman",
                "Pip",
                "pnpm",
                "Podman",
                "Pulumi",
                "Puppet",
                "Terraform",
                "Unity 3D",
                "Unreal Engine",
                "Visual Studio Solution",
                "Vite",
                "Webpack",
                "Yarn",
                "Nenhum",
            ]
        },
        {
            id: 6,
            question: "Há quantos anos você trabalha/estuda programação?",
            type: "number",
            min: 1,
            max: 100,
        },
        {
            id: 7,
            question: "Quantas linguagens de programação você sabe/já aprendeu?",
            type: "number",
            min: 1,
            max: 49,
        },
        {
            id: 8,
            question: "Quais linguagens você deseja trabalhar/estudar no futuro? (Selecione quantos quiser)",
            type: "checkbox",
            options: [
                "Ada",
                "Apex",
                "Assembly",
                "Bash/Shell (all shells)",
                "C",
                "C#",
                "C++",
                "Clojure",
                "Cobol",
                "Crystal",
                "Dart",
                "Delphi",
                "Elixir",
                "Erlang",
                "F#",
                "Fortran",
                "GDScript",
                "Go",
                "Groovy",
                "Haskell",
                "HTML/CSS",
                "Java",
                "JavaScript",
                "Julia",
                "Kotlin",
                "Lisp",
                "Lua",
                "MATLAB",
                "MicroPython",
                "Nim",
                "Objective-C",
                "OCaml",
                "Perl",
                "PHP",
                "PowerShell",
                "Prolog",
                "Python",
                "R",
                "Ruby",
                "Rust",
                "Scala",
                "Solidity",
                "SQL",
                "Swift",
                "TypeScript",
                "VBA",
                "Visual Basic (.Net)",
                "Zephyr",
                "Zig",
            ]
        },
        {
            id: 9,
            question: "Quais frameworks web você quer trabalhar/estudar no futuro? (Selecione quantos quiser)",
            type: "checkbox",
            options: [
                "Angular",
                "AngularJS",
                "ASP.NET",
                "ASP.NET CORE",
                "Astro",
                "Blazor",
                "CodeIgniter",
                "Deno",
                "Django",
                "Drupal",
                "Elm",
                "Express",
                "FastAPI",
                "Fastify",
                "Flask",
                "Gatsby",
                "Htmx",
                "jQuery",
                "Laravel",
                "NestJS",
                "Next.js",
                "Node.js",
                "Nuxt.js",
                "Phoenix",
                "Play Framework",
                "React",
                "Remix",
                "Ruby on Rails",
                "SolidJS",
                "Spring Boot",
                "Strapi",
                "Svelte",
                "Symfony",
                "Vue.js",
                "WordPress",
                "Yii 2",
            ]
        },
        {
            id: 10,
            question: "Quais bancos de dados você quer trabalhar/estudar no futuro? (Selecione quantos quiser)",
            type: "checkbox",
            options: [
                "BigQuery",
                "Cassandra",
                "ClickHouse",
                "Cloud Firestore",
                "Cockroachdb",
                "Cosmos DB",
                "Couch DB",
                "Couchbase",
                "Databricks SQL",
                "Datomic",
                "DuckDB",
                "Dynamodb",
                "Elasticsearch",
                "EventStoreDB",
                "Firebase Realtime Database",
                "Firebird",
                "H2",
                "IBM DB2",
                "InfluxDB",
                "MariaDB",
                "Microsoft Access",
                "Microsoft SQL Server",
                "MongoDB",
                "MySQL",
                "Neo4j",
                "Oracle",
                "PostgreSQL",
                "Presto",
                "RavenDB",
                "Redis",
                "Snowflake",
                "Solr",
                "SQLite",
                "Supabase",
                "TiDB",
            ]
        },
        {
            id: 11,
            question: "Quais plataformas de nuvem você quer trabalhar/estudar no futuro? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Alibaba Cloud",
                "Amazon Web Services (AWS)",
                "Cloudflare",
                "Colocation",
                "Databricks",
                "Digital Ocean",
                "Firebase",
                "Fly.io",
                "Google Cloud",
                "Heroku",
                "Hetzner",
                "IBM Cloud or Watson",
                "Linode",
                "Managed Hosting",
                "Microsoft Azure",
                "Netlify",
                "OpenShift",
                "OpenStack",
                "Oracle Cloud Infrastructure (OCI)",
                "OVH",
                "PythonAnywhere",
                "Render",
                "Scaleway",
                "Supabase",
                "Vercel",
                "VMware",
                "Vultr",
            ]
        },
        {
            id: 12,
            question: "Quais ferramentas de compilação, build e teste você deseja trablhar/estudar no futuro? (Selecione quantas quiser)",
            type: "checkbox",
            options: [
                "Ansible",
                "Ant",
                "APT",
                "Bun",
                "Chef",
                "Chocolatey",
                "Composer",
                "Dagger",
                "Docker",
                "Godot",
                "Google Test",
                "Gradle",
                "Homebrew",
                "Kubernetes",
                "Make",
                "Maven (build tool)",
                "MSBuild",
                "Ninja",
                "Nix",
                "npm",
                "NuGet",
                "Pacman",
                "Pip",
                "pnpm",
                "Podman",
                "Pulumi",
                "Puppet",
                "Terraform",
                "Unity 3D",
                "Unreal Engine",
                "Visual Studio Solution",
                "Vite",
                "Webpack",
                "Yarn",
            ]
        },
        {
            id: 13,
            question: "Qual o seu estado atual no mercado de trabalho ?",
            type: "checkbox",
            options: [
                "Empregado, tempo integral",
                "Empregado, meio período",
                "Trabalhador independente, freelancer ou autônomo",
                "Desempregado, mas procurando trabalho",
                "Desempregado e não procurando trabalho",
                "Estudante, tempo integral",
                "Estudante, meio período",
                "Aposentado",
                "Prefiro não dizer",
            ]
        }
    ];

    // Estado do questionário
    let currentQuestion = 0;
    

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
            
                // Adicionar event listener ao checkbox
                const checkbox = optionElement.querySelector('input[type="checkbox"]');
                
                
                
                checkbox.addEventListener('change', function () {
                    if (this.value === "Nenhum") {
                        // Se "Nenhum" for selecionado, desmarcar todas as outras opções
                        const allCheckboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
                        allCheckboxes.forEach(cb => {
                            if (cb !== this) {
                                cb.checked = false;
                                cb.parentElement.classList.remove('selected');
                            }
                        });
                    } else {
                        // Se outra opção for selecionada, desmarcar "Nenhum"
                        const noneCheckbox = optionsContainer.querySelector('input[type="checkbox"][value="Nenhum"]');
                        if (noneCheckbox) {
                            noneCheckbox.checked = false;
                            noneCheckbox.parentElement.classList.remove('selected');
                        }
                    }

                    if (this.value === "Prefiro não dizer") {
                        // Se "Prefiro não dizer" for selecionado, desmarcar todas as outras opções
                        const allCheckboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
                        allCheckboxes.forEach(cb => {
                            if (cb !== this) {
                                cb.checked = false;
                                cb.parentElement.classList.remove('selected');
                            }
                        });
                    } else {
                        // Se outra opção for selecionada, desmarcar "Prefiro não dizer"
                        const noneCheckbox = optionsContainer.querySelector('input[type="checkbox"][value="Prefiro não dizer"]');
                        if (noneCheckbox) {
                            noneCheckbox.checked = false;
                            noneCheckbox.parentElement.classList.remove('selected');
                        }
                    }
            
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

            if (question.id === 6) {
                numberInput.min = 1;
                numberInput.max = 100;
                numberInput.placeholder = "Digite um número de 1 a 100";
            } else {
                numberInput.min = 0;
                numberInput.max = "";
                numberInput.placeholder = "Digite um número";
            }
            
            // Limitar entrada para números entre 1 e 10 para a pergunta 7
            if (question.id === 7) {
                numberInput.min = 1;
                numberInput.max = 49;
                numberInput.placeholder = "Digite um número de 1 a 49";
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
            let percentage = Math.min(answer6 * answer7);
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
            answers[question.id] = percentage;
            
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

    // Salvar a resposta como número
    answers[question.id] = parseInt(value, 10); // Converte o valor para um número inteiro
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
            
            enviarDados(answers);
            console.log("Respostas:", answers);
            answers = {};  // limpa respostas

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

        // Validar entrada para a pergunta 6 (limite de 99)
        if (questions[currentQuestion].id === 6) {
            let value = parseInt(this.value);
            if (value > 99) this.value = 99; // Limita o valor máximo a 99
            if (value < 1) this.value = 1;  // Garante que o valor mínimo seja 1
        }

        // Validar entrada para a pergunta 7 (escala de 1 a 10)
        if (questions[currentQuestion].id === 7) {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 49) this.value = 49;
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

function formatAnswers(answers) {
    const questionKeyMap = {
        1: "LanguageHaveWorkedWith",
        2: "WebframeHaveWorkedWith",
        3: "DatabaseHaveWorkedWith",
        4: "PlatformHaveWorkedWith",
        5: "ToolsTechHaveWorkedWith",
        6: "YearsCode",
        7: "Age",
        8: "WorkWeekHrs",
        9: "LanguageWantToWorkWith",
        10: "WebframeWantToWorkWith",
        11: "DatabaseWantToWorkWith",
        12: "PlatformWantToWorkWith",
        13: "ToolsTechWantToWorkWith",
        14: "Employment"
    };

    const formatted = {};

    Object.entries(answers).forEach(([key, value]) => {
        const mappedKey = questionKeyMap[key];
        if (!mappedKey) return; // ignora se não tiver no mapa

        if (Array.isArray(value)) {
            formatted[mappedKey] = value.join(';');
        } else if (!isNaN(value)) {
            formatted[mappedKey] = Number(value);
        } else {
            formatted[mappedKey] = value;
        }
    });

    return formatted;
}



async function enviarDados(answers) {
    const dados = formatAnswers(answers); // Passando o answers aqui corretamente!
  
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/predict', dados, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  }