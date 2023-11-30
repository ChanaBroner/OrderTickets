import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Time } from 'src/app/models/time.model';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  @Input() time: Time;
  @Input() seats: number;
  @Output() ticketSelected: EventEmitter<Time> = new EventEmitter<Time>();


  constructor() { }

  ngOnInit(): void {
  }

  SelectionTicket(ticket: Time) {
    this.ticketSelected.emit(ticket);
  }

  isTicketDisabled(time: Time): boolean {
    const isClosed = time.isClosed;
    if (isClosed.toString().length == 4)
      return true
    const isDisabled = time.availablePlaces == 0 || this.seats > time.availablePlaces;
    return isDisabled;

  }

  ticketClosed(time: Time): boolean {
    const isClosed = time.isClosed;
    if (isClosed.toString().length == 4)
      return true;
    else
      return false
  }

  ticketSoldOut(time: Time): boolean {
    const isClosed = time.isClosed;
    if (isClosed.toString().length == 4)
      return false
    const isavailablePlaces = time.availablePlaces == 0;
    return isavailablePlaces;
  }

  freeTicket(time: Time): boolean {
    const isClosed = time.isClosed;
    if (isClosed.toString().length == 4)
      return false;
    else
      return time.availablePlaces > 0;
  }

}