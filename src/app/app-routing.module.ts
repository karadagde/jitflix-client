import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent } from './components/message/message.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'watch',
    loadChildren: () =>
      import('./features/watch-movie/watch-movie.module').then(
        (m) => m.WatchMovieModule
      ),
  },
  {
    path: 'video-call',
    loadChildren: () =>
      import('./features/video-call/video-call.module').then(
        (m) => m.VideoCallModule
      ),
  },
  {
    path: 'message',
    component: MessageComponent,
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
