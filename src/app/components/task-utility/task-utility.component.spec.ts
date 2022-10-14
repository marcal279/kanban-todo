import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUtilityComponent } from './task-utility.component';

describe('TaskUtilityComponent', () => {
  let component: TaskUtilityComponent;
  let fixture: ComponentFixture<TaskUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskUtilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
