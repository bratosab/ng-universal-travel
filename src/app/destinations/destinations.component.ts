import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ClickTravelService } from '../click-travel.service';
import { Destination } from '../models/destination.interface';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  isDreamDestinationForm = new FormControl(false);
  destinations!: Observable<Destination[]>;

  constructor(private clickTravelService: ClickTravelService) {}

  ngOnInit(): void {
    this.destinations = combineLatest([
      this.clickTravelService.getDestinations(),
      this.isDreamDestinationForm.valueChanges.pipe(startWith(false)),
    ]).pipe(
      map(([destinations, isDreamDestination]) =>
        destinations.filter((dest) =>
          isDreamDestination ? dest.isDreamDestination : true
        )
      )
    );
  }
}
