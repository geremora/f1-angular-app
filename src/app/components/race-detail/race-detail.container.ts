import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { DriverStanding, Race } from "src/app/model/models";
import { F1ApiServiceFacade } from "src/app/service/f1.api.service.facade";

@Component({
    selector: "app-f1-race-detail-container",
    template: `
    <app-f1-race-detail [race]="race$ | async" [driverStandings]="driverStandings$ | async"></app-f1-race-detail>
    `
})
export class RaceDetailContainer {

    public race$: Observable<Race | null>;
    public driverStandings$: Observable<DriverStanding[] | null>;

    constructor(private f1ApiServiceFacade: F1ApiServiceFacade) { 
        this.race$ = this.f1ApiServiceFacade.race$;
        this.driverStandings$ = this.f1ApiServiceFacade.driverStandings$;
    }

  }