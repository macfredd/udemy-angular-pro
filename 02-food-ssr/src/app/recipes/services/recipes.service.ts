import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Meal, MealResponse } from '../interfaces/meals.interface';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private httpClient = inject(HttpClient);

  constructor() { }

  public loadRecipesByCategory(category: string) : Observable<MealResponse> {
    var url = `${environment.foodApiUrl}filter.php?c=${category}`;
    return this.httpClient.get<MealResponse>(url);
  }

  /// <summary>
  /// Load a recipe by its id
  /// </summary>
  /// <param name="id">The id of the recipe</param>
  /// <returns>The recipe</returns>
  public loadRecipeById(id: string) {
    var url = `${environment.foodApiUrl}lookup.php?i=${id}`;
    return this.httpClient.get<RecipeResponse>(url);
  }
}