import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IntroductionComponent } from './views/introduction/introduction.component';
import { SignOnComponent } from './views/sign-on/sign-on.component';
import { AuthComponent } from './views/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'test',
    component: HomeComponent,
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'introduction',
    component: IntroductionComponent,
  },
  {
    path: 'sign-on',
    component: SignOnComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'user',
    loadChildren: () => import('./views/pages/user/user.module').then( m => m.UserPageModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'commands',
    loadChildren: () => import('./views/pages/commands/commands.module').then( m => m.CommandsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
