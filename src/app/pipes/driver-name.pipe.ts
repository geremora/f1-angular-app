import { Pipe, PipeTransform } from "@angular/core";
import { Driver } from "../model/models";

@Pipe({
    name: "driverNames",
    pure: true
})
export class DriverNamesPipe implements PipeTransform {

    public transform(driver: Driver): string {
        return `#${driver.permanentNumber} ${driver.givenName} ${driver.familyName}`
    }
}