import { JsonProperty, deserialize } from 'json-typescript-mapper';

export class HeroAttribute {
  @JsonProperty('name')
  name: string;
  @JsonProperty('slug')
  slug: string;
  @JsonProperty('image_portrait')
  portrait: string;
  @JsonProperty('image_splash')
  splash: string;
  @JsonProperty('updated_at')
  updatedAt: string;
  @JsonProperty('image_card_background')
  cardBackground: string;

  constructor() {
    this.name = undefined;
    this.slug = undefined;
    this.portrait = undefined;
    this.splash = undefined;
    this.updatedAt = undefined;
    this.cardBackground = undefined;
  }
}
