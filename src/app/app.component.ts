import { Component } from '@angular/core';
import { Category, CategoryService } from 'src/services/category.service'
import { Product, ProductService } from 'src/services/product.service'
import { SortParams } from './sort/sort.component';

type ProductWithCategory = {
  name: string,
  id: string,
  extra: string,
  category: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // If the original set or random products should be used can be set here
  private readonly SHOW_ALOT_OF_PRODUCTS = false
  
  // Categories, with subcategories and belonging products
  productPage: Category
  // All products which has additional information, as well as its category
  allProducts: ProductWithCategory[] = []
  // The products which are displayed, depending on filters
  shownProducts = this.allProducts
  
  // Contains the current filters
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
  // When true, the category list is shown instead of all products
  noQuery = true

  // Contains the current search query
  private searchQuery = ""

  constructor() {

    // Fetch all categoriess
    let categories: Category[] = []
    if (!this.SHOW_ALOT_OF_PRODUCTS) {
      new CategoryService().getCategories().subscribe(category => categories.push(category))
    } else {
      let mainCategory: Category = {
        name: "Main category",
        id: "1",
        children: []
      }
      let randomCategories: Category[] = []
      new CategoryService().getAlotOfCategories().subscribe(category => randomCategories.push(category))
      randomCategories[0].children.forEach(category => mainCategory.children.push(category))
      randomCategories[0].children = [mainCategory]
      categories.push(randomCategories[0])
    }
    this.productPage = categories[0]

    // Fetch all products
    this.productPage.children.forEach(category => {
      category.children.forEach(subcategory => {
        subcategory.children.forEach(product => {
          this.allProducts.push(
            !this.SHOW_ALOT_OF_PRODUCTS ?
            {
              ...this.fetchProduct(product.id),
              category: subcategory.name
            }
            :
            {
              ...this.fetchProduct(product.id, true),
              id: product.id,
              category: subcategory.name
            }
          )
        })
      })
    })
  }

  // Fetches a product from the API
  fetchProduct(id: string, isRandom = false) {
    let product: Product = {
      name: "",
      id: "",
      extra: {}
    }

    isRandom ?
    new ProductService().getRandomProduct(id).subscribe(p => {
      product = p
    })
    :
    new ProductService().getProduct(id).subscribe(p => {
      product = p
    })

    return {
      ...product,
      extra: JSON.stringify(product.extra, null, 1)
    }
  }

  // Returns a product from the local array with the given id
  getProduct(id: string): ProductWithCategory {
    return this.allProducts.find(product => product.id === id) as ProductWithCategory
  }

  // Removes the quotes and start/end brackets from the 'extra' string
  formatExtras(extras: string): string {
    return extras.replace(/"/g, '').slice(1, -1)
  }

  // Updates the search query and updates the shown products
  setQuery(query: string) {
    this.searchQuery = query.toLowerCase()
    this.applyFilters()
  }

  // Updates the chosen filters and updates the shown products
  setFilters(params: SortParams) {
    this.sortParams = params
    this.applyFilters()
  }

  // Changes the shown products based on the chosen filters and search query
  private applyFilters() {
    const f = this.sortParams.filters
    this.noQuery = this.sortParams.orderBy === "none" && (!f.inStock && !f.hasCategory && !f.inRange) && this.searchQuery === ""

    let productsToShow = this.allProducts

    if (this.sortParams.orderBy === "name") {
      productsToShow = productsToShow.sort((a, b) => a.name > b.name ? 1 : 0)
    } else if (this.sortParams.orderBy === "id") {
      productsToShow = productsToShow.sort((a, b) => a.id > b.id ? 1 : 0)
    } else if (this.sortParams.orderBy === "price") {
      productsToShow = productsToShow.sort((a, b) => this.getAGA(a).PRI > this.getAGA(b).PRI ? 1 : 0)
    }

    if (f.inStock) {
      productsToShow = productsToShow.filter(product => this.getAGA(product).LGA > 0)
    }
    if (f.hasCategory) {
      productsToShow = productsToShow.filter(product => product.category !== null)
    }
    if (f.inRange) {
      productsToShow = productsToShow.filter(product => {
        const volume = this.getAGA(product).VOL
        return f.rangeMin <= volume && volume <= f.rangeMax
      })
    }

    productsToShow = productsToShow.filter(product => {
      return ( 
        product.name.toLowerCase().includes(this.searchQuery) ||
        product.id.toLowerCase().includes(this.searchQuery)
      )
    })

    this.shownProducts = productsToShow
  }

  // Shorthand for getting the AGA object from the 'extra' string
  private getAGA(product: ProductWithCategory) {
    return JSON.parse(product.extra).AGA
  }
}
