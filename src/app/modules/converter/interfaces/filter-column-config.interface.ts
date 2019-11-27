import { FormGroup } from '@angular/forms';

// Filter column output
export interface IFilterColumnConfig {

    // Filter storage field key
    key: string;

    // Filter form
    form: FormGroup;
}
