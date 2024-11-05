import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsDialogComponent } from './user-options-dialog.component';

describe('UserOptionsDialogComponent', () => {
  let component: UserOptionsDialogComponent;
  let fixture: ComponentFixture<UserOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOptionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
