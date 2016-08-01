import { Component } from "@angular/core";
import { Race } from "./race";
import { RACES } from "./mocks";

@Component({
  selector: 'races',
  //template: ``
  templateUrl: "app/races.component.html",
  styleUrls: ["app/races.component.css"]
})
export class RacesComponent {
  races: Race[];

  ngOnInit() {
    this.races = RACES;
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
