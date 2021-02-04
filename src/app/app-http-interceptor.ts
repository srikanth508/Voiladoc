import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';


export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
;

        console.log('intercepted request ... ');
        const token =  localStorage.getItem('token');   ;
        // Clone the request to add the new header.
        
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `${token}`)
        });
        if (!token) {
            return next.handle(req);
          }
        console.log('Sending request with new header now ...');
        
        //send the newly created request
        return next.handle(authReq).pipe(
            catchError(err => {
                console.log('Error Occurred');
                console.log(err);
                return Observable.throw(err);
            })) as any;

        // .catch((error, caught) => {
        //   //intercept the respons error and displace it to the console
        //   console.log('Error Occurred');
        //   console.log(error);
        //   //return the error to the method that called it
        //   return Observable.throw(error);
        // }) as any;

    }
}
{


}
