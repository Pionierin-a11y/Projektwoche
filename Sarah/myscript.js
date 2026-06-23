document.addEventListener("DOMContentLoaded", () => {
    const targetEntity = document.querySelector("#mytarget");
    const uiContainer = document.querySelector("#ui-container");
    const arGif = document.querySelector("#ar-gif");
    const arSound = document.querySelector("#ar-sound");

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
        // Fügt die CSS-Animationsklasse hinzu
        arGif.classList.add("animate-gif");

        // Wenn die CSS-Animation nur einmal laufen soll, kannst du sie 
        // nach Ablauf der Zeit (z.B. 1000ms) wieder entfernen:
        /*
        setTimeout(() => {
            arGif.classList.remove("animate-gif");
        }, 1000);
        */

        // --- SOUND ABSPIELEN ---
        // Sound von vorne abspielen (falls er schon läuft)
        arSound.currentTime = 0; 
        
        // iOS-Sicherer Play-Befehl (Browser blockieren oft Autoplay ohne User-Interaktion, 
        // aber durch den Klick hier ist es erlaubt!)
        arSound.play().catch(error => {
            console.error("Audio konnte nicht abgespielt werden:", error);
        });
    });
});
