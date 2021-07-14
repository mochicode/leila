import { Question } from '../../types';
import { MultipleChoiceComponent, Config, Data, defaultConfig } from './multiple-choice.component';

export { Data as MultipleChoiceData } from './multiple-choice.component';

export class MultipleChoice implements Question<Config, Data> {
	component = MultipleChoiceComponent;
	config: Config;

	constructor(userConfig: Partial<Config>) {
		let config = {
			...defaultConfig,
			...userConfig,
		};

		this.config = config;
	}
}