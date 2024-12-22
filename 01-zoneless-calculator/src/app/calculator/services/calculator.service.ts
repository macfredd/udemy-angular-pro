import { effect, Injectable, signal } from '@angular/core';
import { Parser } from 'expr-eval';

const numberRegex = /^\d+$/;
const operatorRegex = /^[+\-*/\\/]$/;
const specialOperators = ['C', '+/-', '%', '=', 'CE', '.'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value : string) : void {

    // Check if the value is a valid number, operator or special operator
    if (!numberRegex.test(value) && !operatorRegex.test(value) && !specialOperators.includes(value)) {
      return;
    }

    // Calculate the result
    if (value === '=') {
      this.calculateResult();
      return;
    }

    // Reset the calculator
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Remove the last character
    if (value === 'CE') {
      const result = this.resultText();
      if (result.length === 1 ||
        (result.length === 2 && result.charAt(0) === '-')) {
        this.resultText.set('0');
      } else {
        this.resultText.set(result.slice(0, -1));
      }
      return;
    }

    // Change the sign of the number
    if (value === '+/-') {
      const result = this.resultText();
      if (result.charAt(0) === '-') {
        this.resultText.set(result.slice(1));
      } else if (result !== '0') {
        this.resultText.set('-' + result);
      }
      return;
    }

    // Calculate the percentage
    if (value === '%') {
      const result = this.resultText();
      if (result !== '0') {
        this.resultText.set((parseFloat(result) / 100).toString());
      }
      return;
    }

    // A Digit is pressed
    if (numberRegex.test(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
      } else {
        this.resultText.set(this.resultText() + value);
      }
      return;
    }

    // An operator is pressed
    if (operatorRegex.test(value)) {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return
    }

    // Decimal point is pressed
    if ( value === '.' ) {
      if ( !this.resultText().includes('.') ) {
        this.resultText.set(this.resultText() + '.');
      }
      return;
    }

  }

  /**
   * Calculate the result of the expression
   */
  private calculateResult() {
    const parser = new Parser();
    const expression = this.subResultText() + this.lastOperator() + this.resultText();
    const result = parser.parse(expression).evaluate();

    console.log(expression, result);
    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }
}
