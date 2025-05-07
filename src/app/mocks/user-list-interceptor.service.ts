import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
// the http interceptor class is like a middleware between the frontend and the backend server , it is used to deal with requests globally 
// it can be used to add authorization token with requests and it can also be used to handle the global exceptions 
// the order of the interceptor matters and the angular passes the request thru every interceptor and then sends it back to the backend 
// similarly when the data is recived from the backend the interceptors will process the data again and then pass it to the app
// the order of the interceptor matters and the order is decided how they are registered 
// they are registered in the app module , or in the main.ts under the providers for the standalone component 
// see the app module.ts to see how it is registered 
export class UserListInterceptorService implements HttpInterceptor {
  private readonly API_URL = '/mock/api/filter'; 
  private readonly STORAGE_KEY = 'MOCK_API_FILTER';



  // here we have the intercept functions which is the most important to have and in this 
  // we are having the httprequest , it takes in all the http requests and the response body of the http request can be of type any 
  // the next is an httphandler it is used to pass the request to the next interceptor and at the last interceptor the request is handled to the backend 
  // when the reponse is given from the backend the order is followed in reverse 
  // the response is not handled here and it is passed at it is , we do not need to put any argument for  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<string>> {

      if (request.url === this.API_URL && request.method === 'GET') {
          return this.getFilter();
      }

      if (request.url === this.API_URL && request.method === 'PUT') {
          return this.setFilter(request.body);
      }

      return next.handle(request);
  }

  private getFilter(): Observable<HttpResponse<string>> {
      return new Observable(observer => {
          observer.next(new HttpResponse<string>({
              status: 200,
              body: window.localStorage.getItem(this.STORAGE_KEY)
          }));

          observer.complete();
      });
  }

  private setFilter(filter: string): Observable<HttpResponse<string>> {
      window.localStorage.setItem(this.STORAGE_KEY, filter);
      return this.getFilter();
  }

}
