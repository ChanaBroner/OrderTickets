import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Time } from 'src/app/models/time.model';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {

  @Input() list: Time[] = [];
  @Input() seats: number;
  @Output() ticketSelected: EventEmitter<Time> = new EventEmitter<Time>();

  constructor() { }

  ngOnInit(): void {
  }

  handleTicketSelected(ticket: Time): void {
    this.ticketSelected.emit(ticket);
  }
}