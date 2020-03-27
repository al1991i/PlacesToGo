import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayModeService {

  constructor() { }

  toggleDisplayMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
    this.toggleDarkTheme(prefersDark.matches);
  }

  // Add or remove the "dark" class based on if the media query matches
  private toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
