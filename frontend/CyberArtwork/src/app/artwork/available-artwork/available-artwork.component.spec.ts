import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableArtworkComponent } from './available-artwork.component';

describe('AvailableArtworkComponent', () => {
  let component: AvailableArtworkComponent;
  let fixture: ComponentFixture<AvailableArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableArtworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
