import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {

  public isPressed = signal(false);

  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(
    false, // default value
    {
      transform: (value: string) => typeof value === 'string' ? value === '' : value,
    }
  )

  public isDoubleSize = input(
    false, // default value
    {
      transform: (value: string) => typeof value === 'string' ? value === '' : value,
    }
  );

  public handleClick() {
    this.onClick.emit(this.contentValue()?.nativeElement.innerText || '');
  }

  public keyboardPressedStyle(key: string) {
    if (this.contentValue()?.nativeElement.innerText === key) {
      this.isPressed.set(true);
      setTimeout(() => this.isPressed.set(false), 100);
    }
  }
}
