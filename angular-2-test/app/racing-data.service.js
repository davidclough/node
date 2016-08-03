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
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
// Also see app.component.ts
var RacingDataService = (function () {
    // Http is injected as a dependency of RacingDataService. We can do this because RDS is injectable (possibly he
    // means "unlike a component" where we have to mention it as a provider).
    function RacingDataService(http) {
        this.http = http;
    }
    //getRaces(): Observable<Race[]> {
    RacingDataService.prototype.getRaces = function () {
        // get returns an Oservable, not a promise.
        // "races" is also an Observable.
        // (r for response)
        var races = this.http.get("app/races.json").map(function (r) { return r.json().data; });
        //debugger;
        //var jjj = this.http.get("app/races.json");
        //debugger;
        return races;
        //return RACES;
    };
    RacingDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RacingDataService);
    return RacingDataService;
}());
exports.RacingDataService = RacingDataService;
//# sourceMappingURL=racing-data.service.js.map