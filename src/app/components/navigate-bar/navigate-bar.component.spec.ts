import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBarComponent } from './navigate-bar.component';

describe('NavigateBarComponent', () => {
  let component: NavigateBarComponent;
  let fixture: ComponentFixture<NavigateBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigateBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
