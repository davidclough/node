import { Injectable } from "@angular/core";
import { Race } from "./race";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Left in for moment so we can still fetch data via mocks file classes.
import { RACES } from "./mocks";

// Also see app.component.ts
@Injectable()
export class RacingDataService {

  // Http is injected as a dependency of RacingDataService. We can do this because RDS is injectable (possibly he
  // means "unlike a component" where we have to mention it as a provider).
  constructor(private http: Http) {
  }

  //getRaces(): Observable<Race[]> {
  getRaces() {

    // get returns an Oservable, not a promise.
    // "races" is also an Observable.
    // (r for response)
    let races = this.http.get("app/races.json").map(r => <Race[]>r.json().data);
    //debugger;

    //var jjj = this.http.get("app/races.json");
    //debugger;


    return races;

    //return RACES;
  }
}
