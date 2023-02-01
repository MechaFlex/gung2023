import { Component } from '@angular/core';
import { Category, CategoryService } from 'src/services/category.service'
import { Product, ProductService } from 'src/services/product.service'

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
    new CategoryService().getCategories().subscribe(category => categories.push(category))
    this.productPage = categories[0]
    console.log(this.productPage.children)
  }

  getExtras(id: string): string {
    let products: Product[] = []
    new ProductService().getProduct(id).subscribe(p => {
      products.push(p)
    })

    if (products.length === 0) return ""

    const product = products[0]

    return JSON.stringify(product.extra, null, 1).replace(/"/g, '').slice(1, -1)
  }
}
