import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Questionnaire, QuestionnaireDirective } from '../questionnaire';
import { Bool, BoolData } from '../component/boolean';
import { MultipleChoice, MultipleChoiceData } from '../component/multiple-choice';
import { Numerical, NumericalData } from '../component/number';

enum Questions {
  Pregnant = 'pregnant',
  BeenPregnant = 'beenPregnant',
  Period = 'period',
}

type Data = {
    [Questions.Pregnant]: BoolData;
    [Questions.BeenPregnant]: MultipleChoiceData;
    [Questions.Period]: NumericalData;
}

@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.component.html',
  styleUrls: ['./healthcheck.component.css']
})
export class HealthcheckComponent extends Questionnaire<Data> {

  state = {
    data: {
      pregnant: {},
      beenPregnant: {},
      period: {},
    },
    currentStep: Questions.Pregnant
  }

  transitions = {
    pregnant: (data: Data[Questions.Pregnant]) => {
      if (data.choice) {
        return Questions.BeenPregnant
      }

      return Questions.Period
    },
    beenPregnant: () => null,
    period: () => null,
  }

  @ViewChild(QuestionnaireDirective, { static: true })
  host!: ViewContainerRef;

  questions = {
    pregnant: new Bool({ title: 'Have you ever been pregnant before?' }),
    beenPregnant: new MultipleChoice({
      title: 'Please pick which of the following applies to you.',
      options: [
        { label: 'Yes, I have had children before', value: 'fuu' },
        { label: 'Yes, but the pregnancy was not carried to term due to miscarriage(s)', value: 'bar' },
        { label: 'Yes, but the pregnancy was not carried to term due to ectopic miscarriage(s)', value: 'baz' },
        { label: 'Yes, I had a stillbirth', value: 'sup' },
      ]
    }),
    period: new Numerical({ title: 'How old were you when you had your first period?' }),
  }

  onComplete(data: Partial<Data>) {
    console.log(data)
  }

}
