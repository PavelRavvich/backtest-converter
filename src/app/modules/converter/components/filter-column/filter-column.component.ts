import {
    Input,
    Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// Enums
import { ComparisonType } from '../../enums';

@Component({
    selector: 'app-filter-column',
    templateUrl: './filter-column.component.html',
    styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent {

    // Filter form
    @Input() form: FormGroup;

    // Comparison types enum
    public ComparisonType = ComparisonType;

}
