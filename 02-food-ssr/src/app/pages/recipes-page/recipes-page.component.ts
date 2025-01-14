import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import RecipeListComponent from '../../recipes/components/recipe-list/recipe-list.component';
import { RecipeListSkeletonComponent } from './ui/recipe-list-skeleton/recipe-list-skeleton.component';

@Component({
  selector: 'recipes-page',
  standalone: true,
  imports: [RecipeListComponent, RecipeListSkeletonComponent],
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipesPageComponent {
  public isLoading = signal(true);
  public isServer = isPlatformServer(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!this.isServer) {
      setTimeout(() => this.isLoading.set(false), 1000);
    }
  }
}
