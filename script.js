const paragraphs = [
  "Miss Enchanted, or as she is affectionately known by some, Miss Perfect, is a force of nature wrapped in an aura of brilliance and raw passion.Behind her spectacles, which only add to her charm, lies a woman of unparalleled focus.The way she looks when angry—a mixture of fierce determination and undeniable cuteness—only serves to make her more captivating. Her sharp, calculating mind sees patterns where others see chaos, and it's this trait that makes her the best at everything she does.",
  "My Engineer’s Toolkit is a collection of resources that helps me tackle every project and challenge effectively. It includes software tools like code editors, version control systems, and debugging tools, which streamline my coding workflow. Programming languages such as Python, JavaScript, and C++ provide the flexibility to solve a variety of problems. My toolkit also contains hardware tools like a multimeter and soldering iron, which help me troubleshoot electronic circuits.",
  "Ramcharitmanas is an epic Hindu text written by the poet-saint Tulsidas in the 16th century. It is a retelling of the ancient Indian epic, the Ramayana, in the vernacular Awadhi language, making it more accessible to the common people. The text narrates the life and adventures of Lord Rama, his exile to the forest, his battle against the demon king Ravana, and the eventual rescue of his wife Sita. Lord Ram is the creater of this universe who incarnates on this earth just because of his devotees.",
  "Spotify is a popular music streaming service that offers users access to a vast library of songs, podcasts, and other audio content from artists around the world. Launched in 2008, Spotify has transformed the way people listen to music by providing both free and premium subscription models. The platform’s free version offers ad-supported access, while the premium subscription allows users to enjoy an ad-free experience, offline listening, and higher audio quality.",
  "Harry Potter is a beloved fantasy book series written by J.K. Rowling, following the life and adventures of a young wizard, Harry Potter. The series spans seven books, starting with Harry Potter and the Sorcerer's Stone, and chronicles Harry's journey as he learns about his magical heritage, battles the dark wizard Voldemort, and grows into a hero. Alongside his friends Hermione Granger and Ron Weasley, Harry faces challenges at the Hogwarts School of Witchcraft and Wizardry, uncovering secrets and confronting dangers.",
  'Shah Rukh Khan, often referred to as **SRK**, is one of the most iconic and beloved actors in Indian cinema. Known as the "King of Bollywood," SRK has starred in over 80 films, spanning genres from romance to action, and has become a global cultural figure. Born on November 2, 1965, in New Delhi, India, he started his career in television before making his debut in films in the late 1980s. His breakthrough role came with *Dilwale Dulhania Le Jayenge* (1995), which became a huge hit and cemented his status as a romantic hero. SRK\'s diverse filmography includes roles in *My Name Is Khan*, *Chennai Express*, *Raees*, and *Don*.',
  "The moon came to Earth on the 4th and added a meaning to the life of a double-digit prime number.The number 4 is seen everywhere, from the four seasons to the four cardinal directions. There are 4 elements—earth, air, fire, and water—that form the basis of many ancient philosophies. We have 4 limbs, 4 chambers of the heart, and 4 phases of the moon. In mathematics, there are 4 basic operations: addition, subtraction, multiplication, and division. Many cultures also have 4 sacred animals or symbols that represent important virtues. The number 4 permeates life in countless ways, embodying balance, stability, and structure in both nature and human understanding.",
  "I miss the chemistry lab so much, where the air always buzzed with curiosity and discovery. It was there that I had the privilege of working alongside Miss Enchanted, Weaver of Dreams, who sat right behind me. We shared the thrill of experiments, the kind where every small detail mattered, and where the world of science unfolded before our eyes. Those moments of focused teamwork, laughter, and learning were some of the best times of my life. The lab wasn’t just about chemicals and reactions—it was about the bond we formed while navigating the fascinating world of science together.",
  "Tea has a way of bringing comfort, warmth, and moments of reflection to our daily lives. It’s more than just a beverage; it’s an experience, a ritual that holds the power to calm the mind and soothe the soul. Whether it's the bold strength of black tea, the fragrant and delicate notes of green tea, or the spiced warmth of chai, each cup offers a unique flavor that reflects its origin. For you, Miss Enchanted, Weaver of Dreams, I can imagine that a quiet moment with a cup of tea could be the perfect pause in the whirlwind of life. It’s in these moments, sipping slowly, that we often find the clarity we need to solve the trickiest of problems, or simply to unwind. Tea connects us to traditions, memories, and often, to the creativity that flourishes in stillness.",
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = (mistakes = isTyping = 0);

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    console.log(char);
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
