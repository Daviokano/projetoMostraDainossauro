const questions = [
    {
        question: "Quem é o fundador e responsável pelo Jurassic World?",
        options: ["Claire Dearing", "Owen Grady", "Simon Masrani", "Dr. Wu"],
        correct: 2
    },
    {
        question: "Em 'Jurassic World', qual dinossauro escapa e causa caos no parque?",
        options: ["Indominus Rex", "Velociraptor", "T-Rex", "Brachiossauro"],
        correct: 0
    },
    {
        question: "Em 'Jurassic World: Reino Ameaçado', qual ilha é o foco da expedição para salvar os dinossauros?",
        options: ["Isla Muerta", "Isla Nublar", "Isla Sorna", "Ilha Perdida"],
        correct: 2
    },
    {
        question: "Em 'Jurassic World: Domínio', qual é a principal razão para Owen e Claire se envolverem em uma nova aventura?",
        options: ["Pesquisas genéticas", "Resgatar dinossauros", "Proteger a humanidade", "Abrir novo parque"],
        correct: 1
    },
    {
        question: "Qual dinossauro híbrido é o maior desafio nos filmes do Jurassic World?",
        options: ["Indoraptor", "Indominus Rex", "Velociraptor", "T-Rex"],
        correct: 1
    }
];

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;  /// textContet -> usado para modificar o conteúdo interno do elemento
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        
        if (answers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    updateButtons();
}

function selectOption(index) {
    answers[currentQuestion] = index;
    
    document.querySelectorAll('.option').forEach((option, i) => {
        option.classList.toggle('selected', i === index);
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function updateButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'inline-block';
    } else {
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function submitQuiz() {
    let score = 0;
    
    answers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    
    document.getElementById('question-container').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Resultado Final</h2>
        <p>Você acertou ${score} de ${questions.length} questões</p>
        <p>Sua pontuação: ${percentage}%</p>
        <button id="botaoRecomecar" onclick="restartQuiz()">Refazer Questionário</button>
    `;
    resultDiv.style.display = 'block';
}

function startQuiz() {
    document.getElementById('cover').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('cover').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    document.querySelector('.buttons').style.display = 'flex';
    document.getElementById('result').style.display = 'none';
}

// Não inicializar automaticamente - aguardar clique no botão