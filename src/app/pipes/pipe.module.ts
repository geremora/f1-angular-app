import { NgModule } from "@angular/core";
import { DriverNamesPipe } from "./driver-name.pipe";

const PIPES = [DriverNamesPipe]

const PROVIDERS = [...PIPES];
@NgModule({
    imports: [],
    exports: [PIPES],
    declarations: [PIPES],
    providers: PROVIDERS
})
export class PipeModule {}