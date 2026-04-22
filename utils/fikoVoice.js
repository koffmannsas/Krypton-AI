const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "fr-FR";
  recognition.continuous = true;
  recognition.interimResults = false;
}

export const startFikoVoice = (onWake) => {
  if (!recognition) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  recognition.start();

  recognition.onresult = (event) => {
    const transcript =
      event.results[event.results.length - 1][0].transcript.toLowerCase();

    console.log("🎤 entendu:", transcript);

    if (transcript.includes("ok fiko")) {
      console.log("🔥 FIKO ACTIVÉ");

      speak("Oui, je suis là. Dis-moi ce que tu veux mettre en place.");

      if (onWake) onWake();
    }
  };

  recognition.onerror = (err) => {
    console.error("Erreur micro:", err);
  };
};

export const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
};
