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
        this.races = this.racingDataService.getRaces();
    };
    RacesComponent.prototype.getTotalEntrants = function () {
        return this.races.reduce(function (prev, current) { return prev + current.entrants; }, 0);
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