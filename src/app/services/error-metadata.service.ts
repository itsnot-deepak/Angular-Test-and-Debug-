import { Injectable, ErrorHandler } from '@angular/core'; // we need the error handler class for this 

@Injectable({
    providedIn: 'root'
})
export class ErrorMetadataService implements ErrorHandler { // we need to implement the error handler 

    public handleError(error: unknown): void { // this is the mandatory method and it takes an argument 
        const date = new Date(); // we find the date and then send the error message that is presnt below
        // we need to register it in the app.module to let anguar know that it should use this for any of the error caused in the app 
        console.error({
            timestamp: date.toISOString(),
            message: (error as { message: string }).message,
            zone: (error as { zone: unknown }).zone
        });
    }

}
