import { Type } from '@angular/core';

export interface Question<C, Data> {
	component: Type<any>;
	config: C;
}
