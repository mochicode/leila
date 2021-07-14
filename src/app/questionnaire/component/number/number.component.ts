import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Data = {
  value?: number;
}

export type Config = {
  title: string;
}

export let defaultConfig = {
  title: ''
}

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent {

  @Input() data: Data = {};
  @Input() config: Config = defaultConfig;

  @Output() onChange = new EventEmitter<Data>();

  handleChange(e: Event) {
    let target = e.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    this.onChange.next({ value });
  }

}
