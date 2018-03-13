import {Component, ViewChild} from '@angular/core';

import { Hero } from '../../models/hero';
import { HeroFactoryService } from '../../services/hero-factory.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes: Hero[] = [];

  constructor(
    public heroFactory: HeroFactoryService
  ) {
    this
    .heroFactory
    .heroesEmmiter
    .subscribe((heroes) => {
      this.heroes = this.heroes.concat(heroes);
      console.log('heroes updated', this.heroes)
    });
  }

  onScroll() {
    let lastHero = this.heroes.slice(-1).pop()
    let dbKey = lastHero ? lastHero.dbKey : lastHero

    this
    .heroFactory
    .getHerosFromDB(Number(dbKey))
	}

}
