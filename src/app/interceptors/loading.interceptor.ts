import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the loader tracker service
  const loaderTracker = inject(LoadingService);

  // Notify the service that a request has started
  loaderTracker.onRequestStart();

  // Continue with the request and finalize when it's done
  return next(req).pipe(
    finalize(() => {
      // Notify the service that the request has ended (success or error)
      loaderTracker.onRequestEnd();
    })
  );
};
