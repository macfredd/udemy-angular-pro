import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import RecipeCardComponent from "../recipe-card/recipe-card.component";
import { MealResponse } from '../../interfaces/meals';

@Component({
  selector: 'recipe-list',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipeListComponent {

  recipeList = input.required<MealResponse>();
}
