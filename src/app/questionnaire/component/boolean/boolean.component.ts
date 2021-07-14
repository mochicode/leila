import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type Data = {
  choice?: boolean;
}

export type Config = {
  title: string;
  label: Partial<{
    yes: string;
    no: string;
  }>
}

export let defaultConfig = {
  title: '',
  label: {
    yes: 'Yes',
    no: 'No',
  }
}

@Component({
  selector: 'app-question-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.css']
})
export class BooleanComponent implements OnInit {

  @Input() data: Data = {};
  @Input() config: Config = defaultConfig;

  @Output() onChange = new EventEmitter<Data>();

  constructor() { }

  ngOnInit(): void {
  }


  handleChange(choice: boolean) {
    this.onChange.next({ choice });
  }

}