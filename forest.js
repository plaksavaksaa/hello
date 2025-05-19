const caption = document.getElementById("caption");
const cursorLabel = document.getElementById("cursorLabel");
const items = document.querySelectorAll(".item");
const music = document.getElementById("forest-music");

let typeInterval;
let isTyping = false;

const overlayLeft = document.getElementById("overlayLeft");
const overlayRight = document.getElementById("overlayRight");

document.querySelectorAll(".nav-zone").forEach(zone => {
  const direction = zone.dataset.direction;
  const overlay = direction === "left" ? overlayLeft : overlayRight;

  zone.addEventListener("mouseenter", () => {
    if (overlay) overlay.style.opacity = "1";
  });
  zone.addEventListener("mouseleave", () => {
    if (overlay) overlay.style.opacity = "0";
  });
  zone.addEventListener("click", () => {
    window.location.href = "ending.html";
  });
});

function typeText(text, speed = 30) {
  clearInterval(typeInterval);
  isTyping = true;
  caption.textContent = "";

  let i = 0;
  function type() {
    if (i < text.length) {
      caption.textContent += text.charAt(i);
      i++;
      typeInterval = setTimeout(type, speed);
    } else {
      isTyping = false;
    }
  }

  type();
}

items.forEach(item => {
  const label = item.dataset.label?.startsWith("look to") ? item.dataset.label : `look to ${item.dataset.label}`;
  const message = item.dataset.caption;

  item.addEventListener("mousemove", (e) => {
    cursorLabel.textContent = label;
    cursorLabel.style.left = `${e.clientX + 10}px`;
    cursorLabel.style.top = `${e.clientY + 10}px`;
    cursorLabel.style.opacity = "1";
  });

  item.addEventListener("mouseleave", () => {
    cursorLabel.style.opacity = "0";
  });

  item.addEventListener("click", () => {
    if (message && !isTyping) {
      typeText(message);
    }
  });
});