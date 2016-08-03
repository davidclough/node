import { Component } from "@angular/core";
import { Race } from "./race";
import { RacingDataService } from "./racing-data.service";
import { Observable } from 'rxjs/Observable';

// NOTE: As stated in part 5, there is no need to specify RacingDataService as a "provider" because it has already
//       been done in app.component and this is just a sub-component of that.
@Component({
  selector: 'races',
  //template: ``
  templateUrl: "app/races.component.html",
  styleUrls: ["app/races.component.css"]
})
export class RacesComponent {
  //races: Observable<Race[]>;
  races: Race[];

  // A PRIVATE PARAMETER? This looks like a bodge to get TypeScript to generate the JavaScript we need, i.e. a
  //                      property for RacesComponent.
  constructor(private racingDataService: RacingDataService) {
  }

  ngOnInit() {
    // With respect to the "PRIVATE PARAMETER" comment: Until I have learned that this is a TypeScript practice, I will
    // not be overly comfortable with "this.racingDataService" (NOT its injected value) just gets magically created via
    // apparent sleight of hand.
    // I know it is more work but I would have preferred to declare a racingDataService property (bleow races) and set its
    // value to that of the parameter myself.

    // Use this when races was fetched from JSON array, e.g. RACES in mock.js.
    //this.races = this.racingDataService.getRaces();

    // Use this when dealing with the Observable fetched from the web service call.
    this.racingDataService.
         getRaces().
         subscribe(races => this.races = races);

    // NOTE: Two things were preventing things from working when I first switched to using the HTTP races:
    //        1) Had to call ".subscribe()" with the Observable.
    //        2) I had to put EVERY key in quotes for the Races page to work. ALSO I could not put any comment in the JSON.
    //           This won't be much of a problem as real data sources are unlikely to be static JSON files (maybe used for settings).
  }

  getTotalEntrants() {
    // NOTE: The was right after all. This is not a hack. The problem is lifecycle related. There are two calls. In the first call this.races
    //       is not yet populated and so an error occurs.
    let races = this.races;
    if (Array.isArray(races)) {
      return races.reduce((prev, current) => prev + current.entrants, 0);

      // Although I thought so initially, it was NOT the case that the data was an "array-like" onject.
      //races = Array.prototype.slice.call(this.races);
    }
  }

  addOneEntrant(race) {
    race.entrants += 1;
  }

  removeOneEntrant(race) {
    if (race.entrants > 0) {
      race.entrants -= 1;
    }
  }

  setEntrants(race, text) {
    race.entrants = parseInt(text);
  }

  getTitleCoord(event) {
    console.log(event.clientX + ", " + event.clientY);
  }
}
