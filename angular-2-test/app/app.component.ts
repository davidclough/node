import { Component } from '@angular/core';
import { RacesComponent } from './races.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}} - DC</h1>
    <races></races>
  `,
  directives: [RacesComponent]
})
export class AppComponent {
  title = "Ultra Racing";
}
