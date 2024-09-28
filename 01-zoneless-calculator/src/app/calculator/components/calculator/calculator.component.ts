import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public handleClick (key: string) {
    console.log({key});
  }

  public handleKeyboardEvent( event: KeyboardEvent ) {

    const equivalentKeys: Record<string, string> = {
      'Enter': '=',
      'Escape': 'C',
      'Backspace': 'CE',
      '/': '÷',
    }

    const key = equivalentKeys[event.key] || event.key;

    this.handleClick(key);
    this.calculatorButtons().forEach(button => button.keyboardPressedStyle(key));
  }
}
