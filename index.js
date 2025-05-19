const hood = document.getElementById('hood-image');
const caption = document.getElementById('caption');
const actionBtn = document.getElementById('actionBtn');
const cursorLabel = document.getElementById('cursorLabel');
const fade = document.getElementById('fade-overlay');

let stage = 0;

function typeText(text, callback, speed = 40) {
  caption.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    caption.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) setTimeout(callback, 500);
    }
  }, speed);
}

actionBtn.addEventListener('click', () => {
  if (stage === 0) {
    hood.classList.remove('hidden');
    hood.classList.add('fade-in');
    actionBtn.classList.add('active');
    stage = 1;
  } else if (stage === 3) {
    actionBtn.classList.add('active');
    stage = 4;
  }
});

hood.addEventListener("mousemove", (e) => {
  if (stage === 1 || stage === 2) {
    cursorLabel.textContent = "look at hood";
  } else if (stage === 4) {
    cursorLabel.textContent = "touch hood";
  } else {
    cursorLabel.textContent = "";
  }
  cursorLabel.style.left = `${e.clientX + 10}px`;
  cursorLabel.style.top = `${e.clientY + 10}px`;
  cursorLabel.style.opacity = "1";
});
hood.addEventListener("mouseleave", () => {
  cursorLabel.style.opacity = "0";
});

hood.addEventListener("click", () => {
  if (stage === 1) {
    typeText("it has soft frilly edges.\ndon’t forget to put on your hood.", () => {
      actionBtn.textContent = "touch";
      actionBtn.classList.remove('active');
      stage = 3;
    });
    stage = 2;
  } else if (stage === 4) {
    typeText("it's time to enter the woods", () => {
      fade.classList.add('active');
      setTimeout(() => {
        window.location.href = "forest.html";
      }, 1800);
    });
  }
});