import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { ProfileComponent } from '../profile/profile.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const defaultCardProps = {
    text: 'Test Card Text',
    width: '2.188rem',
    height: '3.75rem',
    type: 'Player'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent,ProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = { ...defaultCardProps };
  });

  it('should create card', () => {
    expect(component).toBeTruthy();
  });


  it('should render the card text', () => {
    component.card.text = 'Test Card Text';
    fixture.detectChanges();
    const cardText = fixture.debugElement.query(By.css('.card__container-text')).nativeElement;
    expect(cardText.textContent).toContain('Test Card Text');
  });

  it('should apply selected styles when card is selected', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const cardContainer = fixture.debugElement.query(By.css('.card__container')).nativeElement;
    expect(cardContainer.style.backgroundColor).toBe('rgb(228, 164, 255)');
  });

  it('should apply default styles when card is not selected', () => {
    component.card.selected = true;
    fixture.detectChanges();
    const cardContainer = fixture.debugElement.query(By.css('.card__container')).nativeElement;
    expect(cardContainer.style.backgroundColor).toBe('rgb(187, 101, 255)');
  });

  it('should render <app-profile> when card type is "Specter"', () => {
    component.card.type = 'Specter';
    fixture.detectChanges();
    const profileComponent = fixture.debugElement.query(By.css('app-profile'));
    expect(profileComponent).toBeTruthy();
  });

  it('should emit cardSelected event when the card is clicked', () => {
    spyOn(component.cardSelected, 'emit');
    const cardElement = fixture.debugElement.query(By.css('.card')).nativeElement;
    cardElement.click();
    expect(component.cardSelected.emit).toHaveBeenCalled();
  });

});
