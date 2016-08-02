import { Component } from "@angular/core";
import { Race } from "./race";
import { RacingDataService } from "./racing-data.service";

// NOTE: As stated in part 5, there is no need to specify RacingDataService as a "provider" because it has already
//       been done in app.component and this is just a sub-component of that.
@Component({
  selector: 'races',
  //template: ``
  templateUrl: "app/races.component.html",
  styleUrls: ["app/races.component.css"]
})
export class RacesComponent {
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
    this.races = this.racingDataService.getRaces();
  }

  getTotalEntrants() {
    return this.races.reduce((prev, current) => prev + current.entrants, 0);
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
