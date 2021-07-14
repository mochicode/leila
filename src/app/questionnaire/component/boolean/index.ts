import { Question } from '../../types';
import { BooleanComponent, Config, Data, defaultConfig } from './boolean.component';

export { Data as BoolData } from './boolean.component';

export class Bool implements Question<Config, Data> {
  component = BooleanComponent;
  config: Config;

  constructor(userConfig: Partial<Config>) {

    let config = {
      ...defaultConfig,
      ...userConfig,
      label: {
        ...defaultConfig.label,
        ...userConfig.label,
      }
    }

    this.config = config
  }
}
