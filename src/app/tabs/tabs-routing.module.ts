import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../views/pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('../views/pages/favourites/favourites.module').then((m) => m.FavouritesPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../views/pages/user/user.module').then((m) => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
