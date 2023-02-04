import { Component, EventEmitter, Output } from '@angular/core';

export type SortParams = {
    orderBy: string,
    filters: {
      inStock: boolean,
      hasCategory: boolean,
      inRange: boolean,
      rangeMin: number,
      rangeMax: number
    }
}

@Component({
  selector: 'sort',
  template: `
    <div style="position: relative;">
      <button type="button" class="btn btn-primary sortbutton" (click)="toggleShow()">Sort</button>
      <div id="filters-wrapper">
        Order by
        <div class="controls">
          <div>
            <input (click)="setSortParams()" type="radio" checked="true" name="order" id="none"><label for="none">Nothing</label>
          </div>
          <div>
            <input (click)="setSortParams()" type="radio" name="order" id="name"><label for="name">Name</label>
          </div>
          <div>
            <input (click)="setSortParams()" type="radio" name="order" id="id"><label for="id">ID</label>
          </div>
          <div>
            <input (click)="setSortParams()" type="radio" name="order" id="price"><label for="price">Price</label>
          </div>
        </div>

        Only show items
        <div class="controls">
          <div>
            <input (change)="setSortParams()" type="checkbox" id="inStock"><label for="stock">In stock</label>
          </div>
          <div>
            <input (change)="setSortParams()" type="checkbox" id="hasCategory"><label for="withCategory">With a category</label>
          </div>
          Volume in range
          <div style="display: flex;">
            <input (change)="setSortParams()" type="checkbox" id="inRange">
            <input (input)="setSortParams()" type="number" id="rangeMin" class="form-control form-control-sm range">
            to
            <input (input)="setSortParams()" type="number" id="rangeMax" class="form-control form-control-sm range">
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

      #filters-wrapper {
        display: none;
        border-radius: 0.4em;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        padding: 1em;
        background-color: #282841;
        top: 3em;
        z-index: 10;
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

  sortParams: SortParams = {
    orderBy: "none",
    filters: {
      inStock: false,
      hasCategory: false,
      inRange: false,
      rangeMin: 0,
      rangeMax: 0
    }  
  }

  @Output() sortEvent = new EventEmitter<SortParams>()

  toggleShow() {
    this.isShown = !this.isShown

    const filters = document.getElementById("filters-wrapper")
    if (!filters) return
    if (this.isShown ) {
      filters.style.display = "flex"
    } else {
      filters.style.display = "none"
    }
  }

  setSortParams() {
    const orderBy = (document.querySelector('input[name="order"]:checked') as HTMLInputElement)?.id || "none"

    const isChecked = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked || false

    const params: SortParams = {
      orderBy: orderBy,
      filters: {
        inStock: isChecked("inStock"),
        hasCategory: isChecked("hasCategory"),
        inRange: isChecked("inRange"),
        rangeMin: (document.getElementById("rangeMin") as HTMLInputElement)?.valueAsNumber || 0,
        rangeMax: (document.getElementById("rangeMax") as HTMLInputElement)?.valueAsNumber || 0
      }
    }

    this.sortParams = params
    console.log(this.sortParams)
    this.sortEvent.emit(this.sortParams)
  }
}
