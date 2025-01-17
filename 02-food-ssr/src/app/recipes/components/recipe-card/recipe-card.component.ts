import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Meal } from '../../interfaces/meals';

@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipeCardComponent {
  public recipe = input.required<Meal>();
}
