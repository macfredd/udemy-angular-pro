import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Meal } from '../../interfaces/meals.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipeCardComponent {
  public recipe = input.required<Meal>();
}
