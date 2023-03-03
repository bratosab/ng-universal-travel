import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClickTravelService } from '../click-travel.service';
import destinationsMock from '../mocks/destinations.mock';

import { DestinationsComponent } from './destinations.component';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;
  let clickTravelServiceStub: Partial<ClickTravelService>;

  beforeEach(async () => {
    clickTravelServiceStub = {
      getDestinations: () => {
        return of(destinationsMock);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [DestinationsComponent],
      providers: [
        { provide: ClickTravelService, useValue: clickTravelServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show destinations defined in mocks', () => {
    const compiledComponent = fixture.nativeElement as HTMLElement;
    expect(
      compiledComponent.querySelector('.links')?.getElementsByTagName('a')
        .length
    ).toEqual(destinationsMock.length);
  });
});
