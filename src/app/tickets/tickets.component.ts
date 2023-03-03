import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const destCode = this.route.snapshot.paramMap.get('code');
    if (destCode) {
      this.clickTravelService.getTickets(destCode).subscribe((tickets) => {
        this.tickets = tickets
      })
    }
  }
}
