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

  private getHerosFromDB() {
    return new Promise((success, error) =>  {
      this
        .heroStorage
        .getAll(this.DB_COLLECTION_NAME)
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
        console.log('clear sucess', _heroes)
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
              console.log('load sucess')
              self
                .getHerosFromDB()
                .then((heroes) => {
                  self
                    .heroesEmmiter
                    .next(self.heroes);
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
