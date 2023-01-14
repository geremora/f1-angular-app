import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Driver, Race, Status } from "src/app/model/models";

@Component({
    selector: 'app-f1-season-detail',
    templateUrl: './season-detail.component.html',
    styleUrls: ['./season-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class SeasonDetailComponent {

    @Input()
    public drivers: Driver[] | null = null;

    @Input()
    public races: Race[] | null = null;

    @Input()
    public seasonStatus: Status[] | null = null;

    @Output()
    public raceSelected: EventEmitter<{ raceRound: string }> = new EventEmitter<{ raceRound: string }>();


    public onShowMoreInfo(raceRound: string): void {
       this.raceSelected.emit({raceRound})
    }

  }

