import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocaleService } from '../app/i18n/locale.service';
import { translations } from '../app/i18n/translations';

@Component({
  selector: 'main-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
  constructor(private localeService: LocaleService) {}

  get currentDirection(): 'rtl' | 'ltr' {
    return this.localeService.currentDirection;
  }

  t(key: keyof (typeof translations)['en-US']): string {
    return this.localeService.t(key);
  }
}
