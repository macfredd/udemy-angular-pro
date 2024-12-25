import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorButtonComponent } from './calculator-button.component';
import { ElementRef, signal } from '@angular/core';

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;

    // Mock the contentValue viewChild
    const buttonElement = document.createElement('button');
    buttonElement.innerText = '1';
    component.contentValue = signal (new ElementRef(buttonElement));



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', (done) => {
    expect(component.isPressed()).toBe(false);
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBe(true);

    // Wait for the timeout to check if it resets to false
    setTimeout(() => {
      expect(component.isPressed()).toBe(false);
      done();
    }, 100);
  });

  it('should not change isPressed when keyboardPressedStyle is called with non-matching key', () => {
    expect(component.isPressed()).toBe(false);
    component.keyboardPressedStyle('f');
    expect(component.isPressed()).toBe(false);
  });

  it('should handle click event', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalledWith('1');
  });

  it('should handle click event with empty ', () => {

    const buttonElement = document.createElement('button');
    buttonElement.innerText = '';
    component.contentValue = signal (new ElementRef(buttonElement));

    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalledWith('');
  });
});
