import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { translations } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLang = environment.language as keyof typeof translations;

  get currentLanguage(): keyof typeof translations {
    return this.currentLang;
  }

  get currentDirection(): 'rtl' | 'ltr' {
    return this.currentLanguage === 'he-IL' ? 'rtl' : 'ltr';
  }

  get localeStrings(): (typeof translations)[keyof typeof translations] {
    return translations[this.currentLanguage] ?? translations['en-US'];
  }

  applyCurrentLocale(): void {
    document.documentElement.lang = this.currentLanguage;
    document.body.setAttribute('dir', this.currentDirection);
  }

  t(key: keyof (typeof translations)['en-US']): string {
    return this.localeStrings[key] ?? translations['en-US'][key] ?? key;
  }
}
