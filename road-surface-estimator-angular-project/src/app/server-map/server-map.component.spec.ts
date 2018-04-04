import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMapComponent } from './server-map.component';

describe('ServerMapComponent', () => {
  let component: ServerMapComponent;
  let fixture: ComponentFixture<ServerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
