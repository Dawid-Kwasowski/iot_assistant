import { Component, Input, OnInit } from '@angular/core';
import type { TSpinner } from './interfaces/TSpinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input({ required: false }) color: string = "primary";
  @Input({ required: false }) size: "sm" | "md" | "lg" = 'sm';
  @Input({ required: false }) label!: string | undefined;
  @Input({ required: false }) name!: TSpinner
  
  constructor() { }

  ngOnInit() {
  }

}
