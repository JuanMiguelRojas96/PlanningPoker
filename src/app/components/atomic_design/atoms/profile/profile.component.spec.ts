import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent, ProfileProps } from './profile.component';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const defaultProfileProps: ProfileProps = {
    width: '100px',
    height: '100px',
    fontSize: '16px',
    name: 'Juan Miguel'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.profileProps = { ...defaultProfileProps };
  });

  it('should create profile', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct styles', () => {
    const profileElement = fixture.debugElement.query(By.css('.profile')).nativeElement;
    fixture.detectChanges();
    expect(profileElement.style.width).toBe(defaultProfileProps.width);
    expect(profileElement.style.height).toBe(defaultProfileProps.height);
    expect(profileElement.style.fontSize).toBe(defaultProfileProps.fontSize);
  });

  it('should render the profile name', () => {
    fixture.detectChanges();
    const profileNameElement = fixture.debugElement.query(By.css('.profile__name')).nativeElement;
    expect(profileNameElement.textContent).toBe(defaultProfileProps.name);
  });

  it('should update the profile name when profileProps change', () => {
    component.profileProps.name = 'Juancho';
    fixture.detectChanges();

    const profileNameElement = fixture.debugElement.query(By.css('.profile__name')).nativeElement;
    expect(profileNameElement.textContent).toBe('Juancho');
  });

  it('should update the styles when profileProps change', () => {
    component.profileProps.width = '200px';
    component.profileProps.height = '200px';
    component.profileProps.fontSize = '24px';
    fixture.detectChanges();

    const profileElement = fixture.debugElement.query(By.css('.profile')).nativeElement;

    expect(profileElement.style.width).toBe('200px');
    expect(profileElement.style.height).toBe('200px');
    expect(profileElement.style.fontSize).toBe('24px');
  });



});
