import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkContainerComponent } from './artwork-container.component';

describe('ArtworkContainerComponent', () => {
  let component: ArtworkContainerComponent;
  let fixture: ComponentFixture<ArtworkContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
