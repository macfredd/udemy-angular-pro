import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListSkeletonComponent } from './recipe-list-skeleton.component';

describe('RecipeListSkeletonComponent', () => {
  let component: RecipeListSkeletonComponent;
  let fixture: ComponentFixture<RecipeListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
