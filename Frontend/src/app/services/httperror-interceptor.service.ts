import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, concatMap, of, retry, retryWhen, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";

@Injectable({
  providedIn:'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor
{
  constructor(private alertify: AlertifyService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    console.log("HTTP Request Started");
    return next.handle(request)
          .pipe(
                //retryWhen(error => this.retryRequest(error,10)),
                //retry(10),
                retryWhen(error=>
                  error.pipe(
                    concatMap((checkErr: HttpErrorResponse, count: number) => {
                          if(checkErr.status === 0 && count <= 10)
                          {
                            return of(checkErr);
                          }
                          return throwError(checkErr);
                      }))),

                catchError((error: HttpErrorResponse) =>
                {
                  const errorMessage = this.setError(error);
                  console.log(error);
                  this.alertify.error(errorMessage);
                  return throwError(errorMessage);
                })
          );
  }

  // // Retry the request in case of errror
  // retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown>
  // {
  //     return error.pipe(
  //         concatMap((checkErr: HttpErrorResponse, count: number) => {

  //             if(count <= retryCount)
  //             {
  //                 switch(checkErr.status)
  //                 {
  //                 case ErrorCode.serverDown :
  //                     return of(checkErr);

  //                 // case ErrorCode.unauthorised :
  //                 //     return of(checkErr);

  //                 }
  //             }
  //             return throwError(checkErr);
  //         })
  //     );
  // }

  setError(error: HttpErrorResponse): string
  {

    let errorMessage = 'Unknown error occured';

    if(error.error instanceof ErrorEvent)
    {
        // Client side error
        errorMessage = error.error.message;
    }
    else
    {
        // server side error
        if(error.status===401)
        {
            return error.statusText;
        }

        if(error.status===500)
        {
            return error.statusText;
        }

        if (error.error.errorMessage && error.status!==0)
        {
            errorMessage = error.error.errorMessage;
        }

        if (!error.error.errorMessage && error.error && error.status!==0)
        {
            errorMessage = error.error;
        }
    }
    return errorMessage;
  }

}
