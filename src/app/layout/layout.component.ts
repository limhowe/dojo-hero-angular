import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroFactoryService } from '../../services/hero-factory.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private heroFactoryService: HeroFactoryService,
  ) { }

  ngOnInit() {
    this
      .heroService
      .getAll()
      .then((heroes: any) => {
        if (heroes.data) {
          this
            .heroFactoryService
            .loadHeroesToDB(heroes.data);
        }
      })
  }
}
