import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recipe-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './recipe-list-skeleton.component.html',
  styleUrl: './recipe-list-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListSkeletonComponent {

}
