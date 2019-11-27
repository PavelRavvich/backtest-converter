import { Injectable } from '@angular/core';

// UUID generator lib.
import * as uuid from 'uuid-random';

@Injectable({
    providedIn: 'root'
})
export class UuidService {
    public random(): string {
        return uuid();
    }
}
