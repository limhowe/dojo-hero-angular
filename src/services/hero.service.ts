import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Common } from '../libs/common';

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this
      .http
      .get('/assets/heroes.json')
      .toPromise();
  }
}
