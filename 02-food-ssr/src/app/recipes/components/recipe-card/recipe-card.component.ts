import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecipeCardComponent {

}
