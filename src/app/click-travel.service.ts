import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { PlatformService } from './core/platform.service';
import { TransferService } from './core/transfer.service';
import { Destination } from './models/destination.interface';
import { Ticket } from './models/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class ClickTravelService {
  readonly baseUrl = 'https://travel-api.clicksomeone.com';
  constructor(
    private http: HttpClient,
    private transferService: TransferService,
    private plateform: PlatformService
  ) {}

  /**
   * Fetches all the destinations from the server
   * @returns an Observable with an array of Destination Interface
   */
  getDestinations(): Observable<Destination[]> {
    const key = 'destinations';

    if (
      this.plateform.isBrowser &&
      this.transferService.hasState<Destination[]>(key)
    ) {
      return of(this.transferService.getState<Destination[]>(key, []));
    } else {
      return this.http.get<Destination[]>(`${this.baseUrl}/destinations`).pipe(
        tap((destinations) => {
          if (this.plateform.isServer) {
            this.transferService.saveState<Destination[]>(key, destinations);
          }
        })
      );
    }
  }

  getDreamDestinations() {
    return this.getDestinations().pipe(
      map((destinations) =>
        destinations.filter((dest) => dest.isDreamDestination)
      )
    );
  }

  getTickets(destCode: string): Observable<Ticket[]> {
    console.log('getTickets');

    const params: HttpParams = new HttpParams().set(
      'filter',
      JSON.stringify({ where: { to: destCode } })
    );
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets`, { params });
  }
}
