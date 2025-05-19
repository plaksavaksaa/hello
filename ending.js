const audio = document.getElementById("endingAudio");
const container = document.getElementById("buttonContainer");
const text = document.getElementById("endingText");
const rabbit = document.getElementById("rabbit");

let state = "да";
let clickCount = 0;
let rabbitShown = false;

function playMusic() {
  audio.volume = 0;
  audio.play().catch(err => console.warn("Autoplay failed:", err));
  const fade = setInterval(() => {
    if (audio.volume < 0.8) {
      audio.volume += 0.02;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

function createButton(label) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.classList.add("button");

  const vw = window.innerWidth - 150;
  const vh = window.innerHeight - 60;
  btn.style.left = `${Math.random() * vw}px`;
  btn.style.top = `${Math.random() * vh}px`;

  btn.addEventListener("click", () => handleClick(label, btn));
  container.appendChild(btn);
}

function openPopupImage(filename, title = "Image", position = "bottom-right") {
  const img = new Image();
  img.src = `assets/${filename}`;
  img.onload = () => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const maxHeight = 300;
    const width = maxHeight * aspectRatio;
    const height = maxHeight;

    let screenX = window.screenX;
    let screenY = window.screenY;

    switch (position) {
      case "top-left":
        screenX += 20;
        screenY += 20;
        break;
      case "bottom-right":
      default:
        screenX += window.innerWidth - width - 40;
        screenY += window.innerHeight - height - 80;
        break;
    }

    const win = window.open("", "_blank", `width=${width},height=${height},left=${screenX},top=${screenY},resizable=no`);
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body {
                margin: 0;
                background: black;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="assets/${filename}" alt="Image" />
          </body>
        </html>
      `);
    }
  };
}

function openImageInNewTab(filename, title = "Image") {
  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              margin: 0;
              background: black;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="assets/${filename}" alt="Image" />
        </body>
      </html>
    `);
  }
}

function startRiddles() {
  container.innerHTML = "";
  showRiddle(
    "The more you take, the more you leave behind. What are they?",
    ["footsteps", "stones", "coins", "sand"],
    "footsteps",
    () => showRiddle(
      "Four limbs. Always near. Who is it?",
      ["wolf", "shame", "me", "bed"],
      "shame",
      () => showRiddle(
        "Sweet. Everyone wants it. But then— it makes you sick.",
        ["candies", "love", "girl", "consent"],
        "consent",
        finalSequence // запускаем финальную функцию после ответа consent
      )
    )
  );
}
function showRiddle(question, answers, correct, onSuccess) {
  text.textContent = "CONFIRM YOU'RE NOT HUMAN";
  text.style.color = "red";

  const existingLine = document.getElementById("riddleLine");
  if (existingLine) existingLine.remove();

  const riddleLine = document.createElement("div");
  riddleLine.id = "riddleLine";
  riddleLine.textContent = question;
  riddleLine.style.position = "absolute";
  riddleLine.style.bottom = "80px";
  riddleLine.style.left = "50%";
  riddleLine.style.transform = "translateX(-50%)";
  riddleLine.style.color = "white";
  riddleLine.style.fontSize = "1rem";
  riddleLine.style.fontFamily = "serif";
  riddleLine.style.zIndex = "10";
  document.body.appendChild(riddleLine);

  container.innerHTML = "";
  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("button");
    btn.style.position = "relative";
    btn.style.margin = "0.4em";
    btn.addEventListener("click", () => {
      if (answer === correct) {
        riddleLine.remove();
        onSuccess();
      } else {
        alert("Try again.");
      }
    });
    container.appendChild(btn);
  });
}

function handleClick(label, btn) {
  clickCount++;
  btn.remove();

  if (label === "да") {
    if (clickCount === 1) playMusic();
    if (clickCount < 3) {
      createButton("да");
    } else {
      openPopupImage("ilovecandies.jpg", "Неправильный ответ", "bottom-right");
      clickCount = 0;
      state = "нет";
      createButton("нет");
    }

  } else if (label === "нет") {
    if (clickCount < 3) {
      createButton("нет");
    } else {
      clickCount = 0;
      state = "не знаю";
      createButton("не знаю");
    }

  } else if (label === "не знаю") {
    openImageInNewTab("пупсик.jpg", "Where are you going?");
    clickCount = 0;
    state = "забыть";
    createButton("забыть");

  } else if (label === "забыть") {
    if (clickCount < 3) {
      createButton("забыть");
    } else {
      state = "перезапустить";
      createButton("перезапустить");
    }

  } else if (label === "перезапустить") {
    if (!rabbitShown) {
      rabbitShown = true;
      if (rabbit && !rabbit.classList.contains("animate")) {
        rabbit.classList.add("animate");
      }
    }

    text.textContent = "CONFIRM YOU'RE NOT HUMAN";
    text.style.color = "red";
    container.innerHTML = "";

    startRiddles();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  text.style.opacity = "1";
  createButton("да");
});
function finalSequence() {
  // Зайчик исчезает
  rabbit.style.display = 'none';

  // Удаляются кнопки и текст загадки
  container.innerHTML = "";
  const riddleLine = document.getElementById("riddleLine");
  if (riddleLine) riddleLine.remove();

  // Фон становится белым
  document.body.style.backgroundColor = 'white';

  // Красный текст заменяется обычным голубым текстом
  text.textContent = "You are logged in. Please wait…";
  text.style.color = 'skyblue';
  text.style.fontSize = '1.4rem';
  text.style.animation = 'none';
  text.style.textTransform = 'none';
  text.style.fontWeight = 'normal';

  // Появляется гифка загрузки
  const loadingGif = document.createElement('img');
  loadingGif.src = 'assets/loading.gif';
  loadingGif.style.position = 'absolute';
  loadingGif.style.top = '62%';
  loadingGif.style.left = '50%';
  loadingGif.style.transform = 'translate(-50%, -50%)';
  loadingGif.style.width = '300px';
  loadingGif.style.zIndex = '20';

  document.querySelector('.container').appendChild(loadingGif);
    // Переход на room.html через 10 секунд
    setTimeout(() => {
      window.location.href = "room.html";
    }, 10000);
}
