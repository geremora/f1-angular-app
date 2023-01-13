import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { F1ApiServiceFacade } from './service/f1.api.service.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    // Make it easier to work with the result in the UI
    vm$ = combineLatest([this.f1ApiServiceFacade.drivers$, this.f1ApiServiceFacade.races$]).pipe(
      map(([drivers, races]) => ({
        drivers,races
      }))
    );
  

  constructor(private f1ApiServiceFacade: F1ApiServiceFacade){
    this.f1ApiServiceFacade.emitSeasonSelected("2018");
    this.f1ApiServiceFacade.emitPageSizeSelected("10");
  }


  public onSeasonSelected(seasonSelected: string): void {
    this.f1ApiServiceFacade.emitSeasonSelected(seasonSelected);
  }

  public onPageSizeSelected(pageSizeSelected: string): void {
    this.f1ApiServiceFacade.emitPageSizeSelected(pageSizeSelected);
  }

  public onShowMoreInfo(raceRound: string): void {
    console.log("sdsdas")
    this.f1ApiServiceFacade.emitRaceSelected(raceRound);
  }

  
}
