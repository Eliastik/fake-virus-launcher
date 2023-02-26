import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchDialogErrorComponent } from './launch-dialog-error.component';

describe('LaunchDialogErrorComponent', () => {
  let component: LaunchDialogErrorComponent;
  let fixture: ComponentFixture<LaunchDialogErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchDialogErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchDialogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
