import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTasksComponent } from './update-tasks.component';

describe('UpdateTasksComponent', () => {
  let component: UpdateTasksComponent;
  let fixture: ComponentFixture<UpdateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
