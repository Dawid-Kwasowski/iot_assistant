import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { SignOnComponent } from './pages/sign-on/sign-on.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    component: IntroductionComponent,
  },
  {
    path: 'sign_on',
    component: SignOnComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
