import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';

import { ErrorMetadataService } from './services/error-metadata.service';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListInterceptorService } from './mocks/user-list-interceptor.service';
import { LocationIdPipe } from './pipes/location-id.pipe';

@NgModule({
    declarations: [
        AppComponent,
        UserListComponent,
        HighlightTextPipe,
        LocationIdPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
    // { provide: ErrorHandler, useClass: ErrorMetadataService }, // we have to add this to use the error handling class , this tells the angular to use the errorMetadata service to handle the errors 
        { provide: HTTP_INTERCEPTORS, useClass: UserListInterceptorService, multi: true } // this is the interceptor getting registered and the order matter here 
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
