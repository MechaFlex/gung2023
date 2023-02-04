import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search',
  template: `
    <input type="text" id="search" placeholder="Search" class="form-control" (input)="emitSearchQuery()"/>

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
  @Output() searchEvent = new EventEmitter<string>()

  emitSearchQuery() {
    const query = (document.getElementById("search") as HTMLInputElement)?.value
    return this.searchEvent.emit(query)
  }
}
