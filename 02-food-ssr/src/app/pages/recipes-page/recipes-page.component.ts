import { ChangeDetectionStrategy, Component } from '@angular/core';
import RecipeListComponent from "../../recipes/components/recipe-list/recipe-list.component";

@Component({
  selector: 'recipes-page',
  standalone: true,
  imports: [RecipeListComponent],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipesPageComponent {

}
