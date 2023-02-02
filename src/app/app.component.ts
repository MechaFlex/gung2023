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
  allProducts: {
    name: string,
    id: string,
    extra: string,
    category: string,
  }[] = []

  constructor() {
    let categories: Category[] = []
    new CategoryService().getCategories().subscribe(category => categories.push(category))
    this.productPage = categories[0]
    console.log(this.productPage.children)

    this.productPage.children.forEach(category => {
      category.children.forEach(subcategory => {
        subcategory.children.forEach(product => {
          this.allProducts.push({
            name: product.name,
            id: product.id,
            extra: this.getExtras(product.id),
            category: subcategory.name
          })
        })
      })
    })
    console.log(this.allProducts)
  }

  getExtras(id: string) {
    let products: Product[] = []
    new ProductService().getProduct(id).subscribe(p => {
      products.push(p)
    })

    if (products.length === 0) return ""

    const product = products[0]

    return JSON.stringify(product.extra, null, 1)
  }

  formatExtras(extras: string): string {
    return extras.replace(/"/g, '').slice(1, -1)
  }

  // getExtras(id: string) {
  //   let products: Product[] = []
  //   new ProductService().getProduct(id).subscribe(p => {
  //     products.push(p)
  //   })

  //   if (products.length === 0) return ""

  //   const product = products[0]

  //   return product.extra
  // }

  // formatExtras(extras: { [s: string]: any }): string {
  //   return JSON.stringify(extras, null, 1).replace(/"/g, '').slice(1, -1)
  // }

  
}
