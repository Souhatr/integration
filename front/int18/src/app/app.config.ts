// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Routing
    provideRouter(routes),

    // HTTP Client
    importProvidersFrom(HttpClientModule),

    // Animations (required for Toastr)
    importProvidersFrom(BrowserAnimationsModule),

    // Toastr notifications
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }))
    ,
    // Auth interceptor (adds basic headers / placeholder for token)
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
