import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { routes } from '../routes/routes';

//Components

import { LayoutComponent } from './layout/layout.component'
import { HeroesComponent } from './heroes/heroes.component'
import { LandingComponent } from './landing/landing.component'

//Services
import { HeroStorage } from '../libs/db';
import { HeroService } from '../services/hero.service';
import { HeroFactoryService } from '../services/hero-factory.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LandingComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [
    HeroStorage,
    HeroService,
    HeroFactoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
