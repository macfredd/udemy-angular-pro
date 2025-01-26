import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Meal, MealResponse } from '../interfaces/meals';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private httpClient = inject(HttpClient);

  /** Varialbes to implement a pagination on client side
   * Food API does not support Pagination */

  recipes: Meal[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagRecipesByCategory: MealResponse = { meals: [] };

  constructor() { }

  public loadRecipesByCategory(category: string) {

    var url = `${environment.foodApiUrl}filter.php?c=${category}`;
    this.httpClient
      .get<MealResponse>(url)
      .subscribe((response) => {
        this.recipes = response.meals ? response.meals : [];
        this.updatePagination();
      });
  }

  public updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagRecipesByCategory.meals = this.recipes.slice(startIndex, endIndex);
  }

  public goToPage(page: number) {
    if (!page ||
      isNaN(page)||
      page < 1 ||
      page > Math.ceil(this.recipes.length / this.itemsPerPage)) {
        page = 1;
    }

    this.currentPage = page;
    this.updatePagination();
  }
}