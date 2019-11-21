import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Modules
import {
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
} from '@angular/material';


// Components
import {
    RowComponent,
    CardComponent,
    TitleComponent,
    ButtonsComponent,
    BreadcrumbsComponent,
} from './components';


@NgModule({
    declarations: [
        RowComponent,
        CardComponent,
        TitleComponent,
        ButtonsComponent,
        BreadcrumbsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ]
})
export class SharedModule {
}
