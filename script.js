
const CORRECT_PASSWORD = "2486";

// MOVE BETWEEN FRAMES
function nextPage(number) {
    const currentPage = document.querySelector(".page.active");
    const next = document.getElementById("page" + number);

    if (!next) return;

    if (currentPage) {
        currentPage.classList.remove("active");
    }

    next.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CHECK PASSWORD
function checkPassword() {
    const input = document.getElementById("password");
    const message = document.getElementById("passwordMessage");

    if (input.value === CORRECT_PASSWORD) {
        message.textContent = "Correct PIN! Opening your surprise ❤️";
        message.style.color = "#ffffff";

        setTimeout(function() {
            input.value = "";
            message.textContent = "";
            nextPage(3);
        }, 700);

    } else {
        message.textContent = "Wrong PIN! Try again, my love 💗";
        message.style.color = "#fff000";

        input.value = "";
        input.focus();
    }
}

// ENTER KEY ALSO UNLOCKS THE NEXT FRAME
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");

    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });

    createFloatingSymbols();
    updateCountdown();
});

// Add softly drifting hearts, flowers, and sparkles to match the love-story theme.
function createFloatingSymbols() {
    const container = document.querySelector(".floating-hearts");
    if (!container) return;

    const symbols = ["💕", "🌸", "✨", "❤️", "🌷", "💖", "🌙", "💗"];

    for (let i = 0; i < 16; i++) {
        const symbol = document.createElement("span");
        symbol.textContent = symbols[i % symbols.length];
        symbol.style.setProperty("--symbol-left", Math.random() * 100 + "%");
        symbol.style.setProperty("--symbol-size", 18 + Math.random() * 22 + "px");
        symbol.style.setProperty("--float-duration", 12 + Math.random() * 10 + "s");
        symbol.style.setProperty("--float-delay", -Math.random() * 20 + "s");
        container.appendChild(symbol);
    }
}

// COUNTDOWN TO 7 NOVEMBER 2026
function updateCountdown() {
    const targetDate = new Date(2026, 10, 7, 0, 0, 0);
    const now = new Date();

    let difference = targetDate.getTime() - now.getTime();

    const daysElement = document.getElementById("days");
    if (!daysElement) return;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".love-line").textContent =
            "Happy Second Month Anniversary, Madhu! ❤️";

        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference / 3600000) % 24);
    const minutes = Math.floor((difference / 60000) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
