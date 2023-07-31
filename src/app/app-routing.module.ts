import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent } from './components/message/message.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'watch',
    loadChildren: () =>
      import('./features/watch-movie/watch-movie.module').then(
        (m) => m.WatchMovieModule
      ),
    canMatch: [authGuard],
  },
  {
    path: 'video-call',
    loadChildren: () =>
      import('./features/video-call/video-call.module').then(
        (m) => m.VideoCallModule
      ),
    canMatch: [authGuard],
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
