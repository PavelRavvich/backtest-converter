// UUID generator lib.
import * as uuid from 'uuid-random';

export function randomUUID(): string {
    return uuid();
}
