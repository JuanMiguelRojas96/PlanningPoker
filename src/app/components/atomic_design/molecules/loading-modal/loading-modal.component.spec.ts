import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingModalComponent } from './loading-modal.component';
import { Store, StoreModule } from '@ngrx/store';
import { LoadingModalState } from 'src/app/components/core/models/loading-modal.state';
import { of } from 'rxjs';
import { startLoading } from 'src/app/state/actions/loading-modal.action';

describe('LoadingModalComponent', () => {
  let component: LoadingModalComponent;
  let fixture: ComponentFixture<LoadingModalComponent>;
  let store: Store<{ isLoading: LoadingModalState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingModalComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create loading-modal', () => {
    expect(component).toBeTruthy();
  });

  it('should start loading on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(startLoading());
  });

  it('should render loading modal when isLoading$ is true', () => {
    const loadingModalElement: HTMLElement = fixture.nativeElement.querySelector('.loading-modal');
    expect(loadingModalElement).toBeTruthy();
  });

  it('should not render loading modal when isLoading$ is false', () => {
    fixture.detectChanges();
    const loadingModalElement: HTMLElement = fixture.nativeElement.querySelector('.loading-modal');
    expect(!loadingModalElement).toBeFalsy();
  });

});
