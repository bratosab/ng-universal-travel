import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClickTravelService } from '../click-travel.service';
import destinationsMock from '../mocks/destinations.mock';
import ticketsMock from '../mocks/tickets.mock';

import { TicketsComponent } from './tickets.component';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let clickTravelServiceStub: Partial<ClickTravelService>;

  beforeEach(async () => {
    clickTravelServiceStub = {
      getTickets: () => {
        return of(ticketsMock);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ TicketsComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ClickTravelService, useValue: clickTravelServiceStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
