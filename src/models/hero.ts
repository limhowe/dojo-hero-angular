import { JsonProperty, deserialize } from 'json-typescript-mapper';
import { HeroAttribute } from './heroAttribute';

export class Hero {
  @JsonProperty('id')
  id: string;
  @JsonProperty({clazz: HeroAttribute, name: 'attributes'})
  attributes: HeroAttribute;

  constructor() {
    this.id = undefined;
    this.attributes = undefined;
  }
}
