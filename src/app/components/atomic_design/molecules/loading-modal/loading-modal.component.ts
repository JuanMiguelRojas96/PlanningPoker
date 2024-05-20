import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import { Observable} from 'rxjs';
import { LoadingModalState } from 'src/app/components/core/models/loading-modal.state';
import { startLoading } from 'src/app/state/actions/loading-modal.action';
import { selectIsLoadingSelector } from 'src/app/state/selectors/loading-modal.selector';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent implements OnInit {

  isLoading$: Observable<boolean>;


  constructor(private store : Store<{isLoading: LoadingModalState}>, private cdr : ChangeDetectorRef) {
    this.isLoading$ = new Observable<boolean>();
   }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoadingSelector);
     this.loadPage();
  }


  loadPage() {
    this.store.dispatch(startLoading());
  }

}
