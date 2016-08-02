import { Injectable } from "@angular/core";
import { Race } from "./race";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

// Left in for moment so we can still fetch data via mocks file classes.
import { RACES } from "./mocks";

// Also see app.component.ts
@Injectable()
export class RacingDataService {

  // Http is injected as a dependency of RacingDataService. We can do this because RDS is injectable (possibly he
  // means "unlike a component" where we have to mention it as a provider).
  constructor(private http: Http) {
  }

  getRaces() {
    return RACES;
    //return this.http.get("app/races.json").
    //                 map(response => <Race[]>response.json().data);
  }
}
