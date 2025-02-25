import { Component, inject, OnInit, signal } from '@angular/core';
import { Meal, MealResponse } from '../../recipes/interfaces/meals.interface';
import { RecipesService } from '../../recipes/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipes/interfaces/recipe.interface';

@Component({
  selector: 'recipe-page',
  standalone: true,
  imports: [],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css'
})
export default class RecipePageComponent  implements OnInit {

  public recipe = signal<Recipe | null>(null);

  private recipeService: RecipesService = inject(RecipesService);

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeService.loadRecipeById(params['id']).subscribe((response) => {
        console.log(response);
        this.recipe.set(response.meals[0]);
        console.log(this.recipe()?.strMeal);
      });
    });
  }
}
