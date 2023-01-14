
import { Component, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";
import { PAGE_SIZE_OPTIONS } from "@app/consts/page-sizes";
import { SEASONS_OPTIONS } from "@app/consts/seasons";

@Component({
    selector: 'app-f1-selection-panel',
    templateUrl: './selection-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionPanelComponent {

    public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;
    public readonly SEASONS_OPTIONS = SEASONS_OPTIONS;

    @Output()
    public seasonSelected: EventEmitter<{ seasonSelected: string }> = new EventEmitter<{ seasonSelected: string }>();

    @Output()
    public pageSelected: EventEmitter<{ pageSizeSelected: string }> = new EventEmitter<{ pageSizeSelected: string }>();

    public onSeasonSelected(seasonSelected: string): void {
        this.seasonSelected.emit({ seasonSelected });
    }

    public onPageSizeSelected(pageSizeSelected: string): void {
        this.pageSelected.emit({ pageSizeSelected });
    }
}