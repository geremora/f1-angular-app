import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from "rxjs";
import { Driver, Race } from "src/app/model/models";

export interface DriversApiResponse {
    MRData: {
        DriverTable: {
            Drivers: Driver[]
        }
    }
}

export interface RaceResultsApiResponse {
    MRData: {
        RaceTable: {
            Races: Race[]
        }
    }
}

@Injectable({ providedIn: "root" })
export class F1ApiHttpService {

    /**
      * Constructor.
      * @param http
      */
    constructor(private http: HttpClient) {}

    public getAllDrivers(season: string = "2018", limit: string = "10"): Observable<Driver[]> {
        const url = `http://ergast.com/api/f1/${season}/drivers.json?limit=${limit}`

        return this.http.get<DriversApiResponse>(url).pipe(
            map(data => {
                const drivers: Driver[] = data.MRData.DriverTable.Drivers;
                return drivers;
            }),
            catchError(this.handleError)
        )
    }

    public getAllRacesResults(season: string = "2018", limit: string = "10"): Observable<Race[]> {
        const url = `http://ergast.com/api/f1/${season}/results/1.json?limit=${limit}`
        
        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const races: Race[] = data.MRData.RaceTable.Races;
                return races;
            }),
            catchError(this.handleError)
        )
    }

    public getRaceResult(season: string = "2018", raceRound: string, limit: string = "10"): Observable<Race[]> {
        console.log("getRaceResult")
        const url = `http://ergast.com/api/f1/${season}/${raceRound}/results.json?limit=${limit}`

        console.log("getRaceResult")
        
        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                console.log(data);
                const races: Race[] = data.MRData.RaceTable.Races;
                return races;
            }),
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
                }`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

}