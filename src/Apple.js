import { randomIntFrom0To } from "./helpers";

export default class Apple {
  constructor() {
    this.x = randomIntFrom0To(20);
    this.y = randomIntFrom0To(20);
  }
}
