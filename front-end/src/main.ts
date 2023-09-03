import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { Store } from '@ngrx/store';
import { setJwt } from './app/auth/actions/auth.actions';

platformBrowserDynamic().bootstrapModule(AppModule)
   .then((moduleRef) => {
    const injector = moduleRef.injector;
    const store = injector.get<Store<any>>(Store); 
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      store.dispatch(setJwt({ jwt: jwtToken }));
    }
  })
  .catch(err => console.error(err));
