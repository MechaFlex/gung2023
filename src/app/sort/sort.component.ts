import { Component } from '@angular/core';

@Component({
  selector: 'sort',
  template: `
    <div style="position: relative;">
      <button type="button" class="btn btn-primary sortbutton" (click)="toggleShow()">Sort</button>
      <div class="filters-wrapper" *ngIf="isShown">
        Order by
        <div class="controls">
          <div>
            <input type="radio" name="order" id="none"><label for="none">Nothing</label>
          </div>
          <div>
            <input type="radio" name="order" id="name"><label for="name">Name</label>
          </div>
          <div>
            <input type="radio" name="order" id="id"><label for="id">ID</label>
          </div>
          <div>
            <input type="radio" name="order" id="price"><label for="price">Price</label>
          </div>
        </div>

        Only show items
        <div class="controls">
          <div>
            <input type="checkbox" id="stock"><label for="stock">In stock</label>
          </div>
          <div>
            <input type="checkbox" id="withCategory"><label for="withCategory">With a category</label>
          </div>
          <div style="display: flex;">
            <input type="checkbox" id="inRange"><input type="number" name="" id="" class="form-control form-control-sm range">to<input type="number" name="" id="" class="form-control form-control-sm range">
          </div>
        </div>
      </div>
    </div>

    <style>
      button {
        background-color: #36368e;
        border-color: #36368e;
        width: 100%;
      }

      .filters-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        padding: 1em;
        background-color: #282841;
        top: 3em;
      }

      .controls {
        padding-left: 1em;
      }

      label {
        padding-left: 0.4em;
      }

      .range {
        width: 6em;
        margin-left: 0.5em;
        margin-right: 0.5em;
      }
    </style>
  `
})
export class SortComponent {

  isShown = false

  constructor() { }

  toggleShow() {
    this.isShown = !this.isShown
  }

}
