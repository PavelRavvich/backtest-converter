import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Modules
import {
    MatIconModule,
    MatSortModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
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
    LoadingOverlayComponent,
} from './components';

// Directives
import { InputMaskDirective } from './directives';


@NgModule({
    declarations: [
        RowComponent,
        CardComponent,
        TitleComponent,
        ButtonsComponent,
        InputMaskDirective,
        BreadcrumbsComponent,
        LoadingOverlayComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        RowComponent,
        CardComponent,
        TitleComponent,
        ButtonsComponent,
        InputMaskDirective,
        BreadcrumbsComponent,
        LoadingOverlayComponent,
        MatIconModule,
        MatSortModule,
        MatListModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ]
})
export class SharedModule {
}
