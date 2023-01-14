import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError, combineLatest, filter, mergeMap, debounceTime, withLatestFrom, forkJoin, shareReplay, tap } from "rxjs";
import { Driver, Race } from "../model/models";
import { F1ApiHttpService } from "./http/f1-api.http.service";
@Injectable({ providedIn: "root" })
export class F1ApiServiceFacade {

    private seasonSelectedSubject = new BehaviorSubject<string>("");
    seasonSelected$ = this.seasonSelectedSubject.asObservable();

    private pageSizeSelectedSubject = new BehaviorSubject<string>("");
    pageSizeSelected$ = this.pageSizeSelectedSubject.asObservable();

    private raceSelectedSubject = new BehaviorSubject<string>("");
    raceSelected$ = this.raceSelectedSubject.asObservable();


    public drivers$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
      ]).pipe(
        switchMap( ([seasonSelected, pageSizeSelected]) => 
            this.f1ApiHttpService.getAllDrivers(seasonSelected, pageSizeSelected).pipe(
                map(drivers => {
                    return drivers;
                })
            )
        )
    ); 

     public races$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
      ]).pipe(
        switchMap( ([seasonSelected, pageSizeSelected]) => 
            this.f1ApiHttpService.getAllRacesResults(seasonSelected, pageSizeSelected).pipe(
                map(races => {
                    return races;
                }),
                shareReplay(1),
            )
        )
    ); 

    public race$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
        this.raceSelected$.pipe(filter(raceSelected => raceSelected.length > 0))
    ]).pipe(
        mergeMap(([seasonSelected, pageSizeSelected, raceSelected]) => {
            const raceResult = this.f1ApiHttpService.getRaceResult(seasonSelected, raceSelected, pageSizeSelected);
            const raceQualifying = this.f1ApiHttpService.getQualifyingResult(seasonSelected, raceSelected, pageSizeSelected);
            return forkJoin([raceResult, raceQualifying]).pipe(
                map(([raceResult, raceQualifying]) => {
                    return {
                        ...raceResult,
                        QualifyingResults: raceQualifying.QualifyingResults
                    }
                }),
                shareReplay(1),
                tap(console.log)
            )
        }
        )
    );

    constructor(private f1ApiHttpService: F1ApiHttpService) { }

    public emitSeasonSelected(season: string): void {
        this.seasonSelectedSubject.next(season);
    }

    public emitPageSizeSelected(pageSize: string): void {
        this.pageSizeSelectedSubject.next(pageSize);
    }

    public emitRaceSelected(raceRound: string): void {
        this.raceSelectedSubject.next(raceRound);
    }

}