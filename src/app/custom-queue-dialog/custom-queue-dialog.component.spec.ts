import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQueueDialogComponent } from './custom-queue-dialog.component';

describe('CustomQueueDialogComponent', () => {
  let component: CustomQueueDialogComponent;
  let fixture: ComponentFixture<CustomQueueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomQueueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQueueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
