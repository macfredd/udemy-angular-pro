import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not process invalida value', () => {
    service.constructNumber('f');
    expect(service.resultText()).toBe('0');
  });

  it('should clear the calculator', () => {
    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should remove the last character', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    expect(service.resultText()).toBe('12');

    service.constructNumber('CE')
    expect(service.resultText()).toBe('1');

    service.constructNumber('CE')
    expect(service.resultText()).toBe('0');
  });

  it('should change the sign of the number', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');

    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should accept an operator +', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('+');
  });

  it('should accept an operator -', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('-');
  });

  it('should accept an operator *', () => {
    service.constructNumber('1');
    service.constructNumber('*');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('*');
  });

  it('should accept an operator /', () => {
    service.constructNumber('1');
    service.constructNumber('/');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('/');
  });

  it('should calculate the result', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it('should calculate the percentage', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('0');
    service.constructNumber('%');
    expect(service.resultText()).toBe('1');
  });

  it('should accept a decimal point', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    expect(service.resultText()).toBe('1.2');
  });

});
