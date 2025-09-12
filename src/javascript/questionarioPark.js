const questions = [
    {
        question: "Quem é o fundador e dono do Jurassic Park?",
        options: ["Ian Malcolm", "Alan Grant", "John Hammond", "Paul Kirby"],
        correct: 2
    },
    {
        question: "Em 'Jurassic Park', qual dinossauro é o primeiro a atacar os visitantes no passeio pelo parque?",
        options: ["Velociraptor", "Tiranossauro Rex", "Brachiossauro", "Tricerátopo"],
        correct: 1
    },
    {
        question: "No segundo filme, 'O Mundo Perdido: Jurassic Park', qual ilha é o foco da expedição para estudar os dinossauros?",
        options: ["Isla Muerta", "Ilha Sorna", "Ilha Nublar", "Ilha Perdida"],
        correct: 1
    },
    {
        question: "Em 'Jurassic Park III', qual é a razão principal de Dr. Alan Grant voltar à Ilha Sorna?",
        options: ["Pesquisar fósseis antigos", "Resgatar um casal perdido", "Proteger um ovo de dinossauro", "Construir um novo parque"],
        correct: 1
    },
    {
        question: "Qual é o dinossauro que causa mais problemas nos três filmes da série original?",
        options: ["Tricerátopo", "Velociraptor", "Stegosaurus", "Brachiossauro"],
        correct: 1
    }
];

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question; // textContent -> usado para modificar o conteúdo interno do elemento

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
        <button onclick="restartQuiz()">Refazer Questionário</button>
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