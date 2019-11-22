import { Injectable } from '@angular/core';

// Interfaces
import { ICase } from '../interfaces';

@Injectable()
export class BacktestService {
    public cases: ICase[];
}
