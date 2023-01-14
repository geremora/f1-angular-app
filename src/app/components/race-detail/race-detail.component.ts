import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DriverStanding, Race } from 'src/app/model/models';

@Component({
    selector: 'f1-race-detail',
    templateUrl: './race-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class RaceDetailComponent {

    @Input()
    public race: Race | null = null;

    @Input()
    public driverStandings: DriverStanding[] | null = null;

    constructor() {}

  }