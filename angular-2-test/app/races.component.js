"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var racing_data_service_1 = require("./racing-data.service");
// NOTE: As stated in part 5, there is no need to specify RacingDataService as a "provider" because it has already
//       been done in app.component and this is just a sub-component of that.
var RacesComponent = (function () {
    // A PRIVATE PARAMETER? This looks like a bodge to get TypeScript to generate the JavaScript we need, i.e. a
    //                      property for RacesComponent.
    function RacesComponent(racingDataService) {
        this.racingDataService = racingDataService;
    }
    RacesComponent.prototype.ngOnInit = function () {
        // With respect to the "PRIVATE PARAMETER" comment: Until I have learned that this is a TypeScript practice, I will
        // not be overly comfortable with "this.racingDataService" (NOT its injected value) just gets magically created via
        // apparent sleight of hand.
        // I know it is more work but I would have preferred to declare a racingDataService property (bleow races) and set its
        // value to that of the parameter myself.
        var _this = this;
        // Use this when races was fetched from JSON array, e.g. RACES in mock.js.
        //this.races = this.racingDataService.getRaces();
        // Use this when dealing with the Observable fetched from the web service call.
        this.racingDataService.
            getRaces().
            subscribe(function (races) { return _this.races = races; });
        // NOTE: Two things were preventing things from working when I first switched to using the HTTP races:
        //        1) Had to call ".subscribe()" with the Observable.
        //        2) I had to put EVERY key in quotes for the Races page to work. ALSO I could not put any comment in the JSON.
        //           This won't be much of a problem as real data sources are unlikely to be static JSON files (maybe used for settings).
    };
    RacesComponent.prototype.getTotalEntrants = function () {
        // NOTE: The was right after all. This is not a hack. The problem is lifecycle related. There are two calls. In the first call this.races
        //       is not yet populated and so an error occurs.
        var races = this.races;
        if (Array.isArray(races)) {
            return races.reduce(function (prev, current) { return prev + current.entrants; }, 0);
        }
    };
    RacesComponent.prototype.addOneEntrant = function (race) {
        race.entrants += 1;
    };
    RacesComponent.prototype.removeOneEntrant = function (race) {
        if (race.entrants > 0) {
            race.entrants -= 1;
        }
    };
    RacesComponent.prototype.setEntrants = function (race, text) {
        race.entrants = parseInt(text);
    };
    RacesComponent.prototype.getTitleCoord = function (event) {
        console.log(event.clientX + ", " + event.clientY);
    };
    RacesComponent = __decorate([
        core_1.Component({
            selector: 'races',
            //template: ``
            templateUrl: "app/races.component.html",
            styleUrls: ["app/races.component.css"]
        }), 
        __metadata('design:paramtypes', [racing_data_service_1.RacingDataService])
    ], RacesComponent);
    return RacesComponent;
}());
exports.RacesComponent = RacesComponent;
//# sourceMappingURL=races.component.js.map