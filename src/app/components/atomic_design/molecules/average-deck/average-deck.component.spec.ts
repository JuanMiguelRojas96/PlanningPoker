import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDeckComponent } from './average-deck.component';

describe('AverageDeckComponent', () => {
  let component: AverageDeckComponent;
  let fixture: ComponentFixture<AverageDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
