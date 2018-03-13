import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';
import { HeroStorage } from '../libs/db';
import { JsonProperty, deserialize } from 'json-typescript-mapper';
import * as _ from 'underscore';
import * as async from 'async';

@Injectable()
export class HeroFactoryService {
  DB_COLLECTION_NAME = "Hero";
  heroes: Hero[] = [];
  heroesEmmiter: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(
    private heroService: HeroService,
    private heroStorage: HeroStorage
  ) { }

  getHerosFromDB (dbKey: number, limit: number = 10) {
    return new Promise((success, error) =>  {
      this
        .heroStorage
        .getNext(this.DB_COLLECTION_NAME, dbKey, limit)
        .then((resp: any) => {
          this.heroes = [];
          let heroListdata = resp.data;
          let self = this;
          async
            .each(heroListdata, function(_hero, callback) {
              self.
                heroes.
                push(deserialize(Hero, _hero));
              callback();
            }, function(err) {
              if (err) {
                console.log('Something happened:', err);
              } else {
                self
                  .heroesEmmiter
                  .next(self.heroes);
                success();
              }
            });
        });
    });
  }

  /*
   * Bulk load Heroes to database
   */
  loadHeroesToDB(_heroes: any) {
    this
      .heroStorage
      .clear(this.DB_COLLECTION_NAME)
      .then((resp) => {
        let self = this;
        async
          .each(_heroes, function(_hero, callback) {
            self
              .heroStorage
              .save(self.DB_COLLECTION_NAME, _hero)
              .then((_dbHero) => {
                callback();
              })
              .catch(callback);
          }, function(err) {
            if (err) {
              console.log('Something happened:', err);
            } else {
              self
                .getHerosFromDB(0)
                .then((heroes) => {
                  console.log('loaded succssfully')
                });
            }
          });
      });
  }

  getAllHeroes(_data) {
    return new Promise((success, error) => {
      this
        .heroService
        .getAll()
        .then((resp) => {
          success(resp);
        })
        .catch((errorMessage) => {
          error(errorMessage);
        });
    });
  }
}
