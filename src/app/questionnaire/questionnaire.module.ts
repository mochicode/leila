import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';
import { QuestionnaireDirective } from './questionnaire';
import { BooleanComponent } from './component/boolean/boolean.component';
import { MultipleChoiceComponent } from './component/multiple-choice/multiple-choice.component';
import { NumberComponent } from './component/number/number.component';


@NgModule({
  declarations: [
    HealthcheckComponent,
    QuestionnaireDirective,
    BooleanComponent,
    MultipleChoiceComponent,
    NumberComponent
  ],
  imports: [
    CommonModule
  ],
})
export class QuestionnaireModule { }
