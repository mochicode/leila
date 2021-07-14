import { OnInit, Component, ViewContainerRef, ComponentFactoryResolver, Directive } from '@angular/core';
import { Question } from './types';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[questionnaireHost]',
})
export class QuestionnaireDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

type State<Data> = {
    data: Data,
    currentStep: keyof Data | null,
}

@Component({
    template: ``
})
export abstract class Questionnaire<Data> implements OnInit {
    abstract state: State<Data>;

    abstract transitions: {
        [Property in keyof Data]: (data: Data[Property], state: State<Data>) => keyof Data | null;
    };

    abstract questions: {
        [Property in keyof Data]: Question<unknown, Data[Property]>;
    }

    abstract onComplete(data: Partial<Data>): void;

    abstract host: any;

    private history: Array<keyof Data> = [];
    private changeSubscription: Subscription | null = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit() {
        this.renderQuestion();
    }

    async next() {
        let { currentStep } = this.state;

        if (currentStep === null) {
            return;
        }

        this.history.push(currentStep);
        
        let data = this.state.data[currentStep];

        let fn = this.transitions[currentStep];
        let nextStep = fn(data, this.state);


        this.state.currentStep = nextStep
        this.state.data = {
            ...this.state.data,
            [currentStep]: data
        }

        this.renderQuestion();
        
    }

    renderQuestion() {
        if (this.state.currentStep) {

            if (this.changeSubscription) {
                this.changeSubscription.unsubscribe();
                this.changeSubscription = null;
            }

            let { component, config } = this.questions[this.state.currentStep];

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            let host = this.host.viewContainerRef;
            host.clear()

            let data = this.state.data[this.state.currentStep];
            let componentRef = host.createComponent(componentFactory);
            componentRef.instance.config = config;
            componentRef.instance.data = data;
            
            this.changeSubscription = componentRef
                .instance
                .onChange
                .subscribe((e: any) => {
                    if (this.state.currentStep) {
                        this.state.data[this.state.currentStep] = e;
                        componentRef.instance.data = e;
                    }
                });
        } else  {
            this.host.viewContainerRef.clear();
            this.onComplete(this.getData());
        }
    }

    back(by: number = 1) {
        const index = this.history.length - by;
        const step = this.history[index];

        if (!step) {
            return
        }

        this.state.currentStep = step;
        this.history = this.history.slice(0, index);
        this.renderQuestion();
    }

    getData(): Partial<Data> {
        const entries: Array<[keyof Data, Data[keyof Data]]> =  this.history
            .map(key => [key, this.state.data[key]]);

        return entries.reduce((acc, [key, value]) => {
            return Object.assign(acc, { [key]: value })
        }, {})
    }
}
