import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ConverterModule } from './modules/converter/converter.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

// Components
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CoreModule,
        FormsModule,
        SharedModule,
        CommonModule,
        BrowserModule,
        ConverterModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}
