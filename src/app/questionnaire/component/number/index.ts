import { Question } from '../../types';
import { NumberComponent, Config, Data, defaultConfig } from './number.component';

export { Data as NumericalData } from './number.component';

export class Numerical implements Question<Config, Data> {
  component = NumberComponent;
  config: Config;

  constructor(userConfig: Partial<Config>) {

    let config = {
      ...defaultConfig,
      ...userConfig,
    }

    this.config = config
  }
}
