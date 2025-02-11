import { ChangeDetectionStrategy, Component, inject, Inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import RecipeListComponent from '../../recipes/components/recipe-list/recipe-list.component';
import { RecipeListSkeletonComponent } from './ui/recipe-list-skeleton/recipe-list-skeleton.component';
import { RecipesService } from '../../recipes/services/recipes.service';
import { Meal, MealResponse } from '../../recipes/interfaces/meals';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

  public title = inject(Title);

  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router)

  /** Varialbes to implement a pagination on client side
   *  Food API does not support Pagination */

    recipes: Meal[] = [];
    itemsPerPage: number = 10;
    pagRecipesByCategory: MealResponse = { meals: [] };

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

  ngOnInit(): void {    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith({ url: this.router.url } as NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.startsWith('/recipes')) {
        console.log('point c1');
        this.recipeService.loadRecipesByCategory(this.category())
        .subscribe((response) => {
          this.recipes = response.meals ? response.meals : [];
          this.updatePagination();
          this.loadPage(this.currentPage());
        });
      }
    });
  }

  public updatePagination() {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagRecipesByCategory = {
      meals: [...this.recipes.slice(startIndex, endIndex)]
    };
  }

  public goToPage(page: number): number {
    if (!page ||
      isNaN(page)||
      page < 1 ||
      page > Math.ceil(this.recipes.length / this.itemsPerPage)) {
        page = 1;
    }

    //this.currentPage.set(page);
    this.updatePagination();
    return page;
  }

  loadPage(page: number) {
    this.title.setTitle(`Recipes - Page ${page}`);
    this.goToPage(page);
    this.recipesList.set(this.pagRecipesByCategory);
  }

  stepPage(jump : number) {
    var newPage = this.currentPage() + jump;
    newPage = this.goToPage(newPage);
    this.updateQueryParam({ page : newPage });
    this.title.setTitle(`Recipes - Page ${newPage}`);
    this.recipesList.set(this.pagRecipesByCategory);
  }

  updateQueryParam(obj: object) {
    this.router.navigate([], {
      queryParams: obj,
      queryParamsHandling: 'merge'
    });
  }
}
