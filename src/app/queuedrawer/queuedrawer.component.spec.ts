import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedrawerComponent } from './queuedrawer.component';

describe('QueuedrawerComponent', () => {
  let component: QueuedrawerComponent;
  let fixture: ComponentFixture<QueuedrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuedrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
