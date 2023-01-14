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
        switchMap(([seasonSelected, pageSizeSelected]) =>
            this.f1ApiHttpService.getAllDrivers(seasonSelected, pageSizeSelected).pipe(
                map(drivers => {
                    return drivers;
                }),
                shareReplay(1),
            )
        )
    );

    public races$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
    ]).pipe(
        switchMap(([seasonSelected, pageSizeSelected]) =>
            this.f1ApiHttpService.getAllRacesResults(seasonSelected, pageSizeSelected).pipe(
                map(races => {
                    return races;
                }),
                shareReplay(1),
            )
        )
    );

    public race$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0), tap(() => this.emitRaceSelected(''))),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
        this.raceSelected$
    ]).pipe(
        switchMap(([seasonSelected, pageSizeSelected, raceSelected]) => {
            if (raceSelected){
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
            }else{
                return of(null)
            }
            
        }
        )
    );

    public driverStandings$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
        this.raceSelected$.pipe(filter(raceSelected => raceSelected.length > 0))
      ]).pipe(
        switchMap( ([seasonSelected, pageSizeSelected, raceSelected]) => 
            this.f1ApiHttpService.getDriverStandings(seasonSelected, raceSelected, pageSizeSelected).pipe(
                map(driverStandings => {
                    return driverStandings;
                }),
                shareReplay(1),
            )
        )
    ); 

    public seasonStatus$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
    ]).pipe(
        switchMap(([seasonSelected, pageSizeSelected]) => seasonSelected === "2021"?
            this.f1ApiHttpService.getStatusSeason(seasonSelected, pageSizeSelected).pipe(
                map(statuses => {
                    return statuses.filter(status => status.status === "Finished" || status.status === "Accident" || status.status === "+1 Lap" )
                }),
                shareReplay(1),
            ): of(null)
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