import { Injectable } from "@angular/core";
import { SEASONS_WITH_STATUS, STATUSES_TO_SHOW } from "@app/consts/seasons";
import { BehaviorSubject, map, of, switchMap, combineLatest, filter, forkJoin, shareReplay, tap, catchError } from "rxjs";
import { F1ApiHttpService } from "./http/f1-api.http.service";
@Injectable({ providedIn: "root" })
export class F1ApiServiceFacade {

    private seasonSelectedSubject = new BehaviorSubject<string>("");
    seasonSelected$ = this.seasonSelectedSubject.asObservable();

    private pageSizeSelectedSubject = new BehaviorSubject<string>("");
    pageSizeSelected$ = this.pageSizeSelectedSubject.asObservable();

    private raceSelectedSubject = new BehaviorSubject<string>("");
    raceSelected$ = this.raceSelectedSubject.asObservable();

    private errorSubject = new BehaviorSubject<string>("");
    error$ = this.errorSubject.asObservable();


    public drivers$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
    ]).pipe(
        switchMap(([seasonSelected, pageSizeSelected]) =>
            this.f1ApiHttpService.getAllDrivers(seasonSelected, pageSizeSelected).pipe(
                map(drivers => {
                    return drivers;
                }),
                catchError((error) => {
                    this.errorSubject.next("Error getting drivers");
                    return of(null);
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
                catchError(error => {
                    this.errorSubject.next("Error getting races");
                    return of(null);
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
                    catchError(error => {
                        this.errorSubject.next("Error getting race");
                        return of(null);
                    }),
                    shareReplay(1)
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
                catchError(error => {
                    this.errorSubject.next("Error getting driver standings");
                    return of(null);
                }),
                shareReplay(1),
            )
        )
    ); 

    public seasonStatus$ = combineLatest([
        this.seasonSelected$.pipe(filter(seasonSelected => seasonSelected.length > 0)),
        this.pageSizeSelected$.pipe(filter(pageSizeSelected => pageSizeSelected.length > 0)),
    ]).pipe(
        // we want the status just for certain seasons
        switchMap(([seasonSelected, pageSizeSelected]) => SEASONS_WITH_STATUS.includes(seasonSelected) ?
            this.f1ApiHttpService.getStatusSeason(seasonSelected, pageSizeSelected).pipe(
                map(statuses => {
                    return statuses.filter(status => STATUSES_TO_SHOW.includes(status.status))
                }),
                catchError(error => {
                    this.errorSubject.next("Error getting season status");
                    return of(null);
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

    public clearError(): void {
        this.errorSubject.next("")
    }

}