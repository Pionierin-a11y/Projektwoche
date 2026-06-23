document.addEventListener("DOMContentLoaded", () => {
    const targetEntity = document.querySelector("#mytarget");
    const uiContainer = document.querySelector("#ui-container");
    const arGif = document.querySelector("#ar-gif");
    const arSound = document.querySelector("#ar-sound");
    const statusText = document.getElementById('status');
    const countdownText = document.getElementById('countdown');

    let timerInterval;

    function changeText(newText) {
        statusText.classList.remove('fade-in');
        
        setTimeout(() => {
            statusText.innerText = newText;
            statusText.classList.add('fade-in');
        }, 50);
    }

    // Funktion, die den 4-Sekunden-Countdown startet und verwaltet
    function startCountdown() {
        let timeLeft = 4;
        countdownDisplay.innerText = timeLeft;

        // Falls noch ein alter Timer läuft, löschen
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                countdown.innerText = timeLeft;
            } else {
                // Wenn 0 erreicht ist, setzen wir es sofort wieder auf 4 für die nächste Phase
                timeLeft = 4;
                countdown.innerText = timeLeft;
            }
        }, 1000);
    }

    // 1. Wenn das Bild erkannt wird -> GIF anzeigen
    targetEntity.addEventListener("targetFound", () => {
        console.log("Target gefunden!");
        uiContainer.classList.remove("hidden");
    });
    
    // 2. Wenn das Bild aus dem Fokus verliert -> GIF ausblenden & aufräumen
    targetEntity.addEventListener("targetLost", () => {
        console.log("Target verloren!");
        uiContainer.classList.add("hidden");
        
        // Optional: Animation stoppen und Sound pausieren, wenn das Bild weg ist
        arGif.classList.remove("animate-gif");
        arSound.pause();
        arSound.currentTime = 0; // Sound zurücksetzen
    });

    // 3. Klick-Event auf das GIF (Animation und Sound separat starten)
    arGif.addEventListener("click", () => {
        console.log("GIF wurde geklickt!");

        // --- ANIMATION STARTEN ---
        if (arGif.classList.contains('animate-gif')){
            return;
        }
        else{
            arGif.classList.add("animate-gif");
        }
        
        // --- ANIMATION TEXT ABSPIELEN ---
        // --- Start: Einatmen ---
        changeText("Einatmen");
        startCountdown();

        // --- Phase 2: Atem halten ---
        setTimeout(() => {
            changeText("Atem halten");
        }, 4000);
        
        // --- Phase 3: Ausatmen ---
        setTimeout(() => {
            changeText("Ausatmen");
        }, 8000);

        // --- Ende ---
        setTimeout(() => {
            clearInterval(timerInterval); // Zähler stoppen
            arGif.classList.remove('animate-gif');
            changeText("Klicken hier zum durchatmen");
            countdown.innerText = ""; // Zahl ausblenden
        }, 12000);

        // --- SOUND ABSPIELEN ---
        arSound.currentTime = 0; 
        
        // iOS-Sicherer Play-Befehl (Browser blockieren oft Autoplay ohne User-Interaktion, 
        // aber durch den Klick hier ist es erlaubt!)
        arSound.play().catch(error => {
            console.error("Audio konnte nicht abgespielt werden:", error);
        });
    });
});
