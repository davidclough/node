import { Component } from '@angular/core';
import { RacesComponent } from './races.component';
import { RacingDataService } from "./racing-data.service";

import { HTTP_PROVIDERS } from "@angular/http";

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}} - DC</h1>
    <races></races>
  `,
  directives: [RacesComponent],
  // For dependency injection.
  providers: [RacingDataService, HTTP_PROVIDERS]
})
export class AppComponent {
  title = "Ultra Racing";
}
