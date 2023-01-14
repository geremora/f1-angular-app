import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Race } from 'src/app/model/models';

@Component({
    selector: 'f1-race-detail',
    templateUrl: './race-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class RaceDetailComponent {

    @Input()
    public race: Race | null = null;

    constructor() {}

  }