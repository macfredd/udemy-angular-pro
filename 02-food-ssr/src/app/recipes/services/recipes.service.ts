import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Meal, MealResponse } from '../interfaces/meals';
import { Observable } from 'rxjs';

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
}