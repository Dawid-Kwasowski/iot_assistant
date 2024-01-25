import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IntroductionComponent } from './views/introduction/introduction.component';
import { SignOnComponent } from './views/sign-on/sign-on.component';

const routes: Routes = [
  {
    path: 'test',
    component: HomeComponent,
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'introduction',
    component: IntroductionComponent,
  },
  {
    path: 'sign_on',
    component: SignOnComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
