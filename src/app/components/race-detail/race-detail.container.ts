import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Race } from "src/app/model/models";
import { F1ApiServiceFacade } from "src/app/service/f1.api.service.facade";

@Component({
    selector: "f1-race-detail-container",
    template: `
    <f1-race-detail [race]="race$ | async"></f1-race-detail>
    `
})
export class RaceDetailContainer {

    public race$: Observable<Race | null>;

    constructor(private f1ApiServiceFacade: F1ApiServiceFacade) { 
        this.race$ = this.f1ApiServiceFacade.race$;
    }

  }