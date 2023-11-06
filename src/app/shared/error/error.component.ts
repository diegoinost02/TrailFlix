import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  route = window.location.pathname;
  maxCharacters = 20;

  get routeNotFound() {
    const route = this.route.slice(0, this.maxCharacters);
    if (this.route.length > this.maxCharacters) {
      return `${route}...`;
    } else {
      return route;
    }
  }
}