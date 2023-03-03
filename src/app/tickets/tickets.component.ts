import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClickTravelService } from '../click-travel.service';
import { Ticket } from '../models/ticket.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  displayedColumns: string[] = ['flight', 'from', 'to', 'class'];
  tickets$!: Observable<Ticket[]>;
  tickets!: Ticket[];

  constructor(
    private clickTravelService: ClickTravelService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private plateformID: any
  ) {}

  ngOnInit(): void {
    const destCode = this.route.snapshot.paramMap.get('code');
    if (destCode) {
      this.clickTravelService.getTickets(destCode).subscribe((tickets) => {
        this.tickets = tickets
      })
    }

    if(isPlatformServer(this.plateformID)) {
      console.log('Only server side')
    } else {
      console.log('Only client side')
    }
  }
}
