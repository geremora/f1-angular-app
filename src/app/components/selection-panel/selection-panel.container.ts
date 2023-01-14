import { Component } from "@angular/core";
import { F1ApiServiceFacade } from "src/app/service/f1.api.service.facade";

@Component({
    selector: "app-f1-selection-panel-container",
    template: `
    <app-f1-selection-panel (seasonSelected)="onSeasonSelected($event)" (pageSelected)="onPageSizeSelected($event)"></app-f1-selection-panel>
    `
})
export class SelectionPanelComponentContainer {

    constructor(private f1ApiServiceFacade: F1ApiServiceFacade) {
    }

    public onSeasonSelected(event: { seasonSelected: string; }): void {
        this.f1ApiServiceFacade.emitSeasonSelected(event.seasonSelected);
    }

    public onPageSizeSelected(event: { pageSizeSelected: string; }): void {
        this.f1ApiServiceFacade.emitPageSizeSelected(event.pageSizeSelected);
    }
}