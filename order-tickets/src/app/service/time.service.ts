import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Time } from '../models/time.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class TimeService {
    http: HttpClient;
    baseUrl = "https://localhost:7286/api/Order/";

    constructor(http: HttpClient) {
        this.http = http;
    }

    public getTicketsByStartTime(startTime1: string, startTime2: string, startTime3: string, startTime4: string): Observable<Time[]> {
        return this.http.get<Time[]>(`${this.baseUrl}GetTicketsByStartTime?startTime1=${startTime1}&startTime2=${startTime2}&startTime3=${startTime3}&startTime4=${startTime4}`);
    }

    public doOrder(startTime: string, seats: number): Observable<void> {
        const url = `${this.baseUrl}DoOrder?startTime=${startTime}&seats=${seats}`;
        return this.http.post<void>(url, {});
    }  

    // public doOrder1(id: number, seats: number): Observable<void> {
    //     const url = `${this.baseUrl}DoOrder?id=${id}&seats=${seats}`;
    //     return this.http.post<void>(url, {});
    // }

    // public doOrder2(startTime: string, seats: number): Observable<void> {
    //     const url = `${this.baseUrl}DoOrder?id=${startTime}&seats=${seats}`;
    //     return this.http.post<void>(url, {});
    // }
    
    // public getTicketsByStartTime4(startTime1: string, startTime2: string, startTime3: string, startTime4: string): Observable<Time[]> {
    //     return this.http.get<Time[]>(`${this.baseUrl}GetTicketsByStartTime?startTime1="${startTime1}"&startTime2="${startTime2}"&startTime3="${startTime3}"&startTime4="${startTime4}"`);
    // }

    // public getTicketsByCategory(category: string): Observable<Time[]> {
    //     return this.http.get<Time[]>(`${this.baseUrl}GetTicketsByCategory/${category}`);
    // }  
}