import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROOT } from "@app/consts/api";
import { catchError, map, Observable, throwError } from "rxjs";
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

export interface DriverStandingsApiResponse {
    MRData: {
        StandingsTable: {
            StandingsLists: {
                DriverStandings:{
                    position: string;
                    points: string;
                    Driver: Driver;
                }
            }
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
        const url = `${API_ROOT}/${season}/drivers.json?limit=${limit}`

        return this.http.get<DriversApiResponse>(url).pipe(
            map(data => {
                const drivers: Driver[] = data.MRData.DriverTable.Drivers;
                return drivers;
            }),
            catchError(this.handleError)
        )
    }

    public getAllRacesResults(season: string = "2018", limit: string = "10"): Observable<Race[]> {
         const url = `${API_ROOT}/${season}/results/1.json?limit=${limit}`
        
        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const races: Race[] = data.MRData.RaceTable.Races;
                return races;
            }),
            catchError(this.handleError)
        ) 
    }

    public getRaceResult(season: string = "2018", raceRound: string, limit: string = "10"): Observable<Race> {
       
        const url = `${API_ROOT}/${season}/${raceRound}/results.json?limit=${limit}`

        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const race: Race = data.MRData.RaceTable.Races[0];
                return race;
            }),
            catchError(this.handleError)
        )
    }

    public getQualifyingResult(season: string = "2018", raceRound: string, limit: string = "10"): Observable<Race> {
       
        const url = `${API_ROOT}/${season}/${raceRound}/qualifying.json?limit=${limit}`

        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const race: Race = data.MRData.RaceTable.Races[0];
                return race;
            }),
            catchError(this.handleError)
        )
    }

   /*  public getDriverStandings(season: string = "2018", raceRound: string, limit: string = "10"): Observable<Race> {
       
        const url = `${API_ROOT}/${season}/${raceRound}/driverStandings.json?limit=${limit}`
        
        return this.http.get<DriverStandingsApiResponse>(url).pipe(
            map(data => {
                const race: Race = data.MRData.D.Races[0];
                return race;
            }),
            catchError(this.handleError)
        )
    } */

    

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