const princesses = [
  "Merida", "Cinderela", "Tiana", "Moana", "Pocahontas", "Mulan", 
  "Branca de Neve", "Aurora", "Elza", "Ana (Frozen)", "Ariel", 
  "Rapunzel", "Jasmine", "Bela", "Penélope", "Princesa Sofia", 
  "Tinker Bell", "Elena de Avalor", "Kidagakash", "Giselle (Encantada)", 
  "Alice (País das Maravilhas)", "Mégara (Hércules)", 
  "Jane Porter (Tarzan)", "Princesa Eilonwy", "Esmeralda (Corcunda de Notre-Dame)"
];

let currentQuestion = 0;
let possiblePrincesses = [...princesses];

const questions = [
  { question: "Sua princesa tem cabelo ruivo?", filter: (name) => ["Merida", "Ariel"].includes(name) },
  { question: "Sua princesa é uma guerreira?", filter: (name) => ["Mulan", "Pocahontas"].includes(name) },
  { question: "Sua princesa é de um conto de fadas clássico?", filter: (name) => ["Cinderela", "Branca de Neve", "Aurora"].includes(name) },
  { question: "Sua princesa é mágica ou tem poderes?", filter: (name) => ["Elza", "Ana (Frozen)", "Tinker Bell"].includes(name) },
  { question: "Sua princesa vive no mar?", filter: (name) => name === "Ariel" },
];

document.getElementById("startGame").addEventListener("click", () => {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  if (possiblePrincesses.length === 1) {
    showResult(possiblePrincesses[0]);
    return;
  }

  if (currentQuestion >= questions.length) {
    showResult("Não conseguimos adivinhar...");
    return;
  }

  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;

  const options = document.getElementById("options");
  options.innerHTML = `
    <button onclick="filterPrincesses(true)">Sim</button>
    <button onclick="filterPrincesses(false)">Não</button>
  `;
}

function filterPrincesses(answer) {
  const question = questions[currentQuestion];

  if (answer) {
    possiblePrincesses = possiblePrincesses.filter(question.filter);
  } else {
    possiblePrincesses = possiblePrincesses.filter((name) => !question.filter(name));
  }

  currentQuestion++;
  loadQuestion();
}

function showResult(name) {
  document.getElementById("game").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("princessName").textContent = name;
}

document.getElementById("playAgain").addEventListener("click", () => {
  currentQuestion = 0;
  possiblePrincesses = [...princesses];
  document.getElementById("result").style.display = "none";
  document.getElementById("menu").style.display = "block";
});
