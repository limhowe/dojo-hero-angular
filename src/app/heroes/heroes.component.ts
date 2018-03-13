import {Component, ViewChild} from '@angular/core';
import { HeroFactoryService } from '../../services/hero-factory.service';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  constructor(
    public heroFactory: HeroFactoryService ) {}
}
