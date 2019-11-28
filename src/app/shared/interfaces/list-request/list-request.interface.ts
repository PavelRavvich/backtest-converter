import { Sort } from '@angular/material';

// List request
export interface IListRequest {

    // Title for search
    title?: string;

    // Page length
    limit?: number;

    // Rows before page
    offset?: number;

    // Sort config
    sort?: Sort;

    // Addition field
    [key: string]: any;
}
