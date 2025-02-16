import {NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';

@NgModule({
  providers: [
    DatePipe
  ],
})
export class DateService {

  constructor(
    private datePipe: DatePipe,
  ) {}

  getSwissFormatDateHours(date: Date | string | number): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const newDate = this.datePipe.transform(dateObj, 'dd.MM.yyyy HH:mm');
    if (!newDate) {
      throw new Error('Date transformation failed');
    }
    return newDate;
  }

  getSwissFormatDate(date: Date | string | number): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const newDate = this.datePipe.transform(dateObj, 'dd.MM.yyyy');
    if (!newDate) {
      throw new Error('Date transformation failed');
    }
    return newDate;
  }

  getSwissFormatHours(date: Date | string | number): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const newDate = this.datePipe.transform(dateObj, 'HH:mm');
    if (!newDate) {
      throw new Error('Date transformation failed');
    }
    return newDate;
  }
}
