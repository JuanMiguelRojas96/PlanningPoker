import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteModalComponent } from './invite-modal.component';

describe('InviteModalComponent', () => {
  let component: InviteModalComponent;
  let fixture: ComponentFixture<InviteModalComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteModalComponent);
    component = fixture.componentInstance;
    spyOn(document, 'execCommand');
    fixture.detectChanges();
  });

  it('should create invite-modal', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize viewModal to false', () => {
    expect(component.viewModal).toBeFalse();
  });

  it('should toggle viewModal when changeShow is called', () => {
    component.changeShow();
    expect(component.viewModal).toBeTrue();

    component.changeShow();
    expect(component.viewModal).toBeFalse();
  });

});
