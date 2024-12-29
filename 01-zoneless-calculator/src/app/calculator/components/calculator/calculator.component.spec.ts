import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

class CalculatorServiceMock {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0 ');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');
  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorServiceMock: CalculatorServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService, useClass: CalculatorServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    calculatorServiceMock = TestBed.inject(CalculatorService) as unknown as CalculatorServiceMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize values', () => {
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('0 ');
    expect(component.lastOperator()).toBe('+');
  });

  it('should handle click', () => {
    component.handleClick('1');
    expect(calculatorServiceMock.constructNumber).toHaveBeenCalledWith('1');
  });

  it('should handle keyboard event', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    component.handleKeyboardEvent(event);
    expect(calculatorServiceMock.constructNumber).toHaveBeenCalledWith('1');
  });
});
