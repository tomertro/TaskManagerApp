import { Component, OnInit } from '@angular/core';
import { LocaleService } from './i18n/locale.service';

@Component({
  selector: 'app-root',
  standalone: false,
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
