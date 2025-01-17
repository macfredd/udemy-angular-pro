import { ChangeDetectionStrategy, Component, inject, Inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import RecipeListComponent from '../../recipes/components/recipe-list/recipe-list.component';
import { RecipeListSkeletonComponent } from './ui/recipe-list-skeleton/recipe-list-skeleton.component';
import { RecipesService } from '../../recipes/services/recipes.service';
import { MealResponse } from '../../recipes/interfaces/meals';

@Component({
  selector: 'recipes-page',
  standalone: true,
  imports: [RecipeListComponent, RecipeListSkeletonComponent],
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipesPageComponent  implements OnInit{
  public isLoading = signal(true);
  public isServer = isPlatformServer(this.platformId);

  private recipeService = inject(RecipesService);
  public recipesList = signal<MealResponse>( { meals: [] });

  public category = input('Pasta');

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!this.isServer) {
      setTimeout(() => this.isLoading.set(false), 1000);
    }
  }
  ngOnInit(): void {
    this.recipeService.loadRecipesByCategory(this.category());
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.recipeService.goToPage(page);
    this.recipesList.set(this.recipeService.pagRecipesByCategory);
    console.log(this.recipesList());
  }
}
