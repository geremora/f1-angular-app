export interface Driver {
    driverId: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
    permanentNumber: string;
    code: string;
}

export interface Race {
    round: string;
    raceName: string;
    Circuit: {
        circuitId: string;
        circuitName: string;
    }
    date: string;
    time: string;
    Results: [
        {
            number: string;
            position: string;
            Driver: Driver;
        }
    ]
}