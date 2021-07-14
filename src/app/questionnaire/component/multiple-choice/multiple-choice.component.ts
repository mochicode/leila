import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

export type Data = {
  selected?: string;
}

type Option = {
  label: string;
  value: string;
}

export type Config = {
  title: string;
  options: Array<Option>
}

export let defaultConfig = {
  title: '',
  options: [],
}

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() data: Data = {};
  @Input() config: Config = defaultConfig;

  @Output() onChange = new EventEmitter<Data>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSelect(selected: string) {
    this.onChange.next({ selected });
  }
}
