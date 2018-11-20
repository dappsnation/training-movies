import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MovieStore, MovieService } from '../../+state';
import { By } from 'protractor';

describe('ListComponent', () => {
  let component: ListComponent;
  let store: MovieStore;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [{
        provide: MovieService,
        useValue: jasmine.createSpyObj('MovieService', ['get'])
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(MovieStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
