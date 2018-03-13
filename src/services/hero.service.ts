import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Common } from '../libs/common';


@Injectable()
export class HeroService {
  constructor(private http: HttpClient) { }

  getAll(_data) {
    return this
      .http
      .get('assets/heroes.json')
      .map(Common.jsonParse)
      .catch(error => Observable.throw(error.error.error))
      .toPromise();
  }
}
