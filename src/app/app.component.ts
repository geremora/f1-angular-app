import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from './consts/page-sizes';
import { DEFAULT_SEASON } from './consts/seasons';
import { F1ApiServiceFacade } from './service/f1.api.service.facade';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public error$: Observable<string | null>;

  constructor(private f1ApiServiceFacade: F1ApiServiceFacade) {
    this.error$ = this.f1ApiServiceFacade.error$;
    // set default options
    this.f1ApiServiceFacade.emitSeasonSelected(DEFAULT_SEASON);
    this.f1ApiServiceFacade.emitPageSizeSelected(DEFAULT_PAGE_SIZE);

  }

  public clearError(): void {
    this.f1ApiServiceFacade.clearError();
  }
}
