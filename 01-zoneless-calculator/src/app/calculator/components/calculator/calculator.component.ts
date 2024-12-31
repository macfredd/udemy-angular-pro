import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  public handleClick (key: string) {
    this.calculatorService.constructNumber(key);
  }

  public handleKeyboardEvent( event: KeyboardEvent ) {

    const equivalentKeys: Record<string, string> = {
      'Enter': '=',
      'Escape': 'C',
      'Backspace': 'CE',
    }

    const key = equivalentKeys[event.key] || event.key;

    this.handleClick(key);
    this.calculatorButtons().forEach(button => button.keyboardPressedStyle(key));
  }
}
