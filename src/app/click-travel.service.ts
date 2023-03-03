import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Destination } from './models/destination.interface';
import { Ticket } from './models/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class ClickTravelService {
  readonly baseUrl = 'https://travel-api.clicksomeone.com';
  constructor(private http: HttpClient) {}

  /**
   * Fetches all the destinations from the server
   * @returns an Observable with an array of Destination Interface
   */
  getDestinations(): Observable<Destination[]> {
    console.log('getDestinations')
    return this.http.get<Destination[]>(`${this.baseUrl}/destinations`);
  }

  getDreamDestinations() {
    return this.getDestinations().pipe(
      map((destinations) =>
        destinations.filter((dest) => dest.isDreamDestination)
      )
    );
  }

  getTickets(destCode: string): Observable<Ticket[]> {
    console.log('getTickets')

    const params: HttpParams = new HttpParams().set(
      'filter',
      JSON.stringify({ where: { to: destCode } })
    );
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets`, { params });
  }
}
