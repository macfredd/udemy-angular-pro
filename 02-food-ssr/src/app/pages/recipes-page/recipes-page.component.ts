import { ChangeDetectionStrategy, Component, inject, Inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import RecipeListComponent from '../../recipes/components/recipe-list/recipe-list.component';
import { RecipeListSkeletonComponent } from './ui/recipe-list-skeleton/recipe-list-skeleton.component';
import { RecipesService } from '../../recipes/services/recipes.service';
import { MealResponse } from '../../recipes/interfaces/meals';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router)


  public currentPage = toSignal(
    this.activeRoute.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => isNaN(parseInt(page)) ? 1 : parseInt(page)),
      map(page => Math.max(1, page))
    ),
    { initialValue: 1 }
  );

  public category = toSignal(
    this.activeRoute.queryParamMap.pipe(
      map(params => params.get('c') ?? 'Miscellaneous'),
      map(category => category.trim() == '' ? 'Miscellaneous' : category)
    ),
    { initialValue: 'Miscellaneous' }
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!this.isServer) {
      setTimeout(() => this.isLoading.set(false), 1000);
    }
  }

  ngOnInit(): void {
    this.recipeService.loadRecipesByCategory(this.category());
    this.loadPage(this.currentPage());
  }

  loadPage(page: number) {
    this.recipeService.goToPage(page);
    this.recipesList.set(this.recipeService.pagRecipesByCategory);
  }

  stepPage(jump : number) {
    var newPage = this.currentPage() + jump;
    newPage = this.recipeService.goToPage(newPage);
    this.updateQueryParam({ page : newPage });
    this.recipesList.set(this.recipeService.pagRecipesByCategory);
  }

  updateQueryParam(obj: object) {
    this.router.navigate([], {
      queryParams: obj,
      queryParamsHandling: 'merge'
    });
  }
}
