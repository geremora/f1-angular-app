import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Driver, Race, Status } from "src/app/model/models";
import { F1ApiServiceFacade } from "src/app/service/f1.api.service.facade";

@Component({
    selector: "app-f1-season-detail-container",
    template: `
    <app-f1-season-detail 
    [drivers]="drivers$ | async" 
    [races]="races$ | async" 
    [seasonStatus]="seasonStatus$ | async"
    (raceSelected)="onRaceSelected($event)"
    ></app-f1-season-detail>
    `
})
export class SeasonDetailComponentContainer {
    public drivers$: Observable<Driver[] | null>;
    public races$: Observable<Race[] | null>;
    public seasonStatus$: Observable<Status[] | null>;

    constructor(private f1ApiServiceFacade: F1ApiServiceFacade) {

        this.drivers$ = this.f1ApiServiceFacade.drivers$, 
        this.races$ = this.f1ApiServiceFacade.races$, 
        this.seasonStatus$ = this.f1ApiServiceFacade.seasonStatus$
    }

    public onRaceSelected(event: { raceRound: string; }): void {
        this.f1ApiServiceFacade.emitRaceSelected(event.raceRound);
    }

}