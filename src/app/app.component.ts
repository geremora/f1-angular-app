import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './consts/page-sizes';
import { SEASONS_OPTIONS } from './consts/seasons';
import { F1ApiServiceFacade } from './service/f1.api.service.facade';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;
  public readonly SEASONS_OPTIONS = SEASONS_OPTIONS;

    // Make it easier to work with the result in the UI
    vm$ = combineLatest([this.f1ApiServiceFacade.drivers$, this.f1ApiServiceFacade.races$]).pipe(
      map(([drivers, races]) => ({
        drivers, races
      }))
    );
  

  constructor(private f1ApiServiceFacade: F1ApiServiceFacade){
    this.f1ApiServiceFacade.emitSeasonSelected("2018");
    this.f1ApiServiceFacade.emitPageSizeSelected(DEFAULT_PAGE_SIZE);

  }


  public onSeasonSelected(seasonSelected: string): void {
    this.f1ApiServiceFacade.emitRaceSelected("");
    this.f1ApiServiceFacade.emitSeasonSelected(seasonSelected);
  }

  public onPageSizeSelected(pageSizeSelected: string): void {
    this.f1ApiServiceFacade.emitPageSizeSelected(pageSizeSelected);
  }

  public onShowMoreInfo(raceRound: string): void {
    this.f1ApiServiceFacade.emitRaceSelected(raceRound);
  }

  
}
