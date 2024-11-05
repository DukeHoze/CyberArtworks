import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArtworkComponent } from './new-artwork.component';

describe('NewArtworkComponent', () => {
  let component: NewArtworkComponent;
  let fixture: ComponentFixture<NewArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArtworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
