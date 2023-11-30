import { Component, OnInit, Output } from '@angular/core';
import { Time } from 'src/app/models/time.model';
import { TimeService } from 'src/app/service/time.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {

  timeList: Time[] = [];
  morningList: Time[] = [];
  afternoonList: Time[] = [];
  eveningList: Time[] = [];

  enterPressed: boolean = false;
  nextPressed: boolean = false;

  seats: number;
  currentDate: Date;
  idTicket: number;
  startTime: string;
  

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  handleTicketSelected(t: Time): void {
    //this.idTicket = t.id;
    this.startTime = t.startTime;
    console.log(this.startTime);
  }


  calculateTotalRemainingTickets(): number {
    const morningTickets = this.calculateArrayTickets(this.morningList);
    const afternoonTickets = this.calculateArrayTickets(this.afternoonList);
    const eveningTickets = this.calculateArrayTickets(this.eveningList);

    return morningTickets + afternoonTickets + eveningTickets;
  }

  calculateArrayTickets(arr: any[]): number {
    const totalAvailablePlaces = arr.reduce((total, item) => {
      const availablePlaces = parseInt(item.availablePlaces, 10) || 0;
      return total + availablePlaces;
    }, 0);

    return totalAvailablePlaces;
  }


  enter() {

    this.enterPressed = true;

    this.timeService.getTicketsByStartTime("8", "9", "10", "11").subscribe(
      result => {
        this.morningList = result;
        this.timeList = result;
        console.log(this.morningList);
      },
      error => {
        console.error(error);
      }
    );
    this.timeService.getTicketsByStartTime("12", "13", "14", "3").subscribe(
      result => {
        this.afternoonList = result;
        console.log(this.afternoonList);
      },
      error => {
        console.error(error);
      }
    );
    this.timeService.getTicketsByStartTime("15", "3", "3", "3").subscribe(
      result => {
        this.eveningList = result;
        console.log(this.eveningList);
      },
      error => {
        console.error(error);
      }
    );

  }

  onValChange(value: string): void {
    switch (value) {
      case "morning":
        this.timeList = this.morningList;
        break;
      case "afternoon":
        this.timeList = this.afternoonList;
        break;
      default:
        this.timeList = this.eveningList;
        break;
    }
  }

  updateTicket(startTime: string, seats: number): void {
    this.updateList(this.morningList, startTime, seats);
    this.updateList(this.afternoonList, startTime, seats);
    this.updateList(this.eveningList, startTime, seats);
  }

  private updateList(list: Time[], startTime: string, seats: number): void {
    const timeIndex = list.findIndex(time => time.startTime === startTime);

    if (timeIndex !== -1) {
      list[timeIndex].availablePlaces -= seats;
    }
  }

  next() {
    console.log(this.startTime);

    this.nextPressed = true;

    this.timeService.doOrder(this.startTime, this.seats).subscribe(
      result => {
        this.updateTicket(this.startTime, this.seats);
        console.log('Order successful');
      },
      error => {
        console.error('Error during order:', error);
      }
    );
  }

  orderSuccess() {
    this.nextPressed = false;
  }
}



