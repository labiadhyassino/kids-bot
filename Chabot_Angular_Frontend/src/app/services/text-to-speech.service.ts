import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private utterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    // Charger les voix dès qu'elles sont prêtes
    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
    };
    this.voices = speechSynthesis.getVoices(); // Appel initial
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      this.stop(); // Arrête la lecture précédente

      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.lang = 'en-US';

      // Choix d'une voix anglaise si possible
      const englishVoice = this.voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) {
        this.utterance.voice = englishVoice;
      }

      speechSynthesis.speak(this.utterance);
    }
  }

  stop() {
    if ('speechSynthesis' in window && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }
}
