import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError, combineLatest, filter } from "rxjs";
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
        this.seasonSelected$,
        this.pageSizeSelected$
      ]).pipe(
        filter(([seasonSelected, pageSizeSelected]) => !!seasonSelected || !!pageSizeSelected),
        switchMap( ([seasonSelected, pageSizeSelected]) => 
            this.f1ApiHttpService.getAllDrivers(seasonSelected, pageSizeSelected).pipe(
                map(drivers => {
                    return drivers;
                })
            )
        ),
        catchError(error => {
            // handle error here
            return of([]);
        })
    );

    public races$ = combineLatest([
        this.seasonSelected$,
        this.pageSizeSelected$
      ]).pipe(
        filter(([seasonSelected, pageSizeSelected]) => !!seasonSelected || !!pageSizeSelected),
        switchMap( ([seasonSelected, pageSizeSelected]) => 
            this.f1ApiHttpService.getAllRacesResults(seasonSelected, pageSizeSelected).pipe(
                map(races => {
                    return races;
                })
            )
        ),
        catchError(error => {
            // handle error here
            return of([]);
        })
    );

    public race$ = combineLatest([
        this.seasonSelected$,
        this.pageSizeSelected$,
        this.raceSelected$
      ]).pipe(
        switchMap( ([seasonSelected, pageSizeSelected, raceSelected]) => 
            this.f1ApiHttpService.getRaceResult(seasonSelected, raceSelected,pageSizeSelected).pipe(
                map(races => {
                    return races;
                })
            )
        ),
        catchError(error => {
            // handle error here
            console.log(error)
            return of([]);
        })
    );
    

    constructor(private f1ApiHttpService: F1ApiHttpService) { }

    public emitSeasonSelected(season: string): void {
        this.seasonSelectedSubject.next(season);
    }

    public emitPageSizeSelected(pageSize: string): void {
        this.pageSizeSelectedSubject.next(pageSize);
    }

    public emitRaceSelected(raceRound: string): void {
        console.log("emitRaceSelected", raceRound)
        this.raceSelectedSubject.next(raceRound);
    }
}