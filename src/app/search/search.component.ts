import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" placeholder="Search" class="form-control">

    <style>
      input {
        background-color: #282841;
        border-color: #282841;
        color: #ffffffcc;
      }

      input::placeholder {
        color: white;
        opacity: 0.6;
      }
    </style>
  `
})
export class SearchComponent {

}
