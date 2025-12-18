import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent,
    // NavigationComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
