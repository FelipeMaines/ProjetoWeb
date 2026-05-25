import { Routes } from '@angular/router';
import { JwtDecoderPageComponent } from '@app/features/jwt-decoder/jwt-decoder-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: JwtDecoderPageComponent,
  },
];
