import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { method, url, headers } = req;

    console.log(`'${method}' request has been sent to '${url}'`, headers);

    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log(
            `Response from ${url} has been received. Data: `,
            event.body
          );
        }
      })
    );
  }
}
