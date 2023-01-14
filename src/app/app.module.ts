import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RaceDetailComponent } from './components/race-detail/race-detail.component';
import { RaceDetailContainer } from './components/race-detail/race-detail.container';
import { SelectionPanelComponentContainer } from './components/selection-panel/selection-panel.container';
import { SelectionPanelComponent } from './components/selection-panel/selection-panel.component';
import { SeasonDetailComponentContainer } from './components/season-detail/season.detail.container';
import { SeasonDetailComponent } from './components/season-detail/season-detail.component';


const createTranslateLoader = (http: HttpClient): TranslateHttpLoader => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    RaceDetailComponent,
    RaceDetailContainer,
    SelectionPanelComponentContainer,
    SelectionPanelComponent,
    SeasonDetailComponentContainer,
    SeasonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [
          HttpClient,
        ],
      },
    }),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
