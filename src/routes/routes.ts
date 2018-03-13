import { Routes } from '@angular/router';

import { LayoutComponent } from '../app/layout/layout.component'
import { HeroesComponent } from '../app/heroes/heroes.component'
import { LandingComponent } from '../app/landing/landing.component'

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'landing', pathMatch: 'full'
      },{
        path: 'heroes', component: HeroesComponent
      },{
        path: 'landing', component: LandingComponent
      }
    ]
  }
]
