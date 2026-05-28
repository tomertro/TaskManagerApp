import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavigationComponent } from '../MainNavigation/main-navigation.component';
import { LocaleService } from './i18n/locale.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Task Manager App';

  constructor(private localeService: LocaleService) {}

  ngOnInit(): void {
    this.localeService.applyCurrentLocale();
  }
}
