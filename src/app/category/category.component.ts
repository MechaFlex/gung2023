import { Component, Input } from '@angular/core';

@Component({
  selector: 'category',
  template: `
    <div>
      {{name}}
    </div>
  `,
  styles: [

  ]
})
export class CategoryComponent {
  @Input() level = 1
  @Input() name = "" 
}
