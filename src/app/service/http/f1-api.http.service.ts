import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROOT } from "@app/consts/api";
import { DEFAULT_PAGE_SIZE } from "@app/consts/page-sizes";
import { DEFAULT_SEASON } from "@app/consts/seasons";
import { catchError, map, Observable, throwError } from "rxjs";
import { Driver, DriverStanding, Race, Status } from "src/app/model/models";

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
                DriverStandings: DriverStanding[];
            }[]
        }
    }
}

export interface SeasonStatusApiResponse {
    MRData: {
        StatusTable: {
            Status: Status[]
        }
    }
}
@Injectable({ providedIn: "root" })
export class F1ApiHttpService {

    /**
      * Constructor.
      * @param http
      */
    constructor(private http: HttpClient) { }

    public getAllDrivers(season: string = "2018", limit: string = DEFAULT_PAGE_SIZE): Observable<Driver[]> {
        const url = `${API_ROOT}/${season}/drivers.json?limit=${limit}`

        return this.http.get<DriversApiResponse>(url).pipe(
            map(data => {
                const drivers: Driver[] = data.MRData.DriverTable.Drivers;
                return drivers;
            }),
            catchError(this.handleError)
        )
    }

    public getAllRacesResults(season: string = DEFAULT_SEASON, limit: string = DEFAULT_PAGE_SIZE): Observable<Race[]> {
        const url = `${API_ROOT}/${season}/results/1.json?limit=${limit}`

        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const races: Race[] = data.MRData.RaceTable.Races;
                return races;
            }),
            catchError(this.handleError)
        )
    }

    public getRaceResult(season: string = DEFAULT_SEASON, raceRound: string, limit: string = DEFAULT_PAGE_SIZE): Observable<Race> {

        const url = `${API_ROOT}/${season}/${raceRound}/results.json?limit=${limit}`

        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const race: Race = data.MRData.RaceTable.Races[0];
                return race;
            }),
            catchError(this.handleError)
        )
    }

    public getQualifyingResult(season: string = DEFAULT_SEASON, raceRound: string, limit: string = DEFAULT_PAGE_SIZE): Observable<Race> {

        const url = `${API_ROOT}/${season}/${raceRound}/qualifying.json?limit=${limit}`

        return this.http.get<RaceResultsApiResponse>(url).pipe(
            map(data => {
                const race: Race = data.MRData.RaceTable.Races[0];
                return race;
            }),
            catchError(this.handleError)
        )
    }

    public getDriverStandings(season: string = DEFAULT_SEASON, raceRound: string, limit: string = DEFAULT_PAGE_SIZE): Observable<DriverStanding[]> {

        const url = `${API_ROOT}/${season}/${raceRound}/driverStandings.json?limit=${limit}`

        return this.http.get<DriverStandingsApiResponse>(url).pipe(
            map(data => {
                const driverStanding: DriverStanding[] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                return driverStanding;
            }),
            catchError(this.handleError)
        )
    }

    public getStatusSeason(season: string = DEFAULT_SEASON, limit: string = DEFAULT_PAGE_SIZE): Observable<Status[]> {
        const url = `${API_ROOT}/${season}/status.json?limit=${limit}`

        return this.http.get<SeasonStatusApiResponse>(url).pipe(
            map(data => {
                const statuses: Status[] = data.MRData.StatusTable.Status;
                return statuses;
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