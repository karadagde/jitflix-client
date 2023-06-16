import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./server/server.module').then((m) => m.ServerModule),
  },
  {
    path: 'streaming',
    loadChildren: () =>
      import('./streaming/streaming.module').then((m) => m.StreamingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
