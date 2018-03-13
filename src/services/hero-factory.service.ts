import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';
import { HeroStorage } from '../libs/db';
import * as _ from 'underscore';

@Injectable()
export class HeroFactoryService {
  DB_COLLECTION_NAME = "Heroes";
  heroes: Hero[] = [];
  heroesEmmiter: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(
    private heroService: HeroService,
    private heroStorage: HeroStorage
  ) { }

  private getHerosFromDB() {
    return new Promise((success, error) => {
      this
      .heroStorage
      .getAll(this.DB_COLLECTION_NAME)
      .then((resp: any) => {
        this.heroes = [];
        let heroListdata = resp.data;
        let self = this;

        // async
        // .each(heroListdata, function(_hero, callback) {
        //   self.
        //   heroes.
        //   push(deserialize(Hero, _hero));
        //   callback();
        // }, function(err) {
        //       if( err ) {
        //         console.log('Something happened:', err);
        //       } else {
        //         success();
        //       }
        //   });
      });
    });
  }
}
