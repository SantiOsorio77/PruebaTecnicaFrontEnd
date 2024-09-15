  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { provideHttpClient } from '@angular/common/http';  // Proveedor de HttpClient
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

  import { routes } from './app.routes';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),      // Proporcionar las rutas de la aplicación
      provideHttpClient(),        // Proporcionar HttpClient para las solicitudes HTTP
      provideAnimationsAsync()    // Proporcionar animaciones de forma asíncrona
    ]
  };
