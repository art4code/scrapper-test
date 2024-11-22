import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";

const log = new Logger("Interceptor");

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = req;

    log.verbose(
      `[Request] [${method}] ${url}  Params: ${JSON.stringify(params)} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`
    );

    return next.handle().pipe(
      tap((data) => {
        log.verbose(`[Response] [${method}] ${url} : ${JSON.stringify(data)}`);
      }),
      catchError((err) => {
        log.error(`[${method}] ${url} Error: ${err.message}`, err.stack);
        throw err;
      })
    );
  }
}
