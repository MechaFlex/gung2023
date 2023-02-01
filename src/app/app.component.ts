import { Component } from '@angular/core';
import { Category, CategoryService } from 'src/services/category.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gung2023';
  productPage: Category

  constructor() {
    let categories: Category[] = []
    new CategoryService().getCategories().subscribe(x => categories.push(x))
    this.productPage = categories[0]
    console.log(this.productPage.children)
  }

}
