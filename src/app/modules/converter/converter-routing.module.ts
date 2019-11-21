import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { LayoutComponent, ListComponent } from './components';

const routes: Routes = [
    {
        path: 'converter',
        component: LayoutComponent,
        data: { title: 'Конвертер' },
        children: [
            {
                path: 'list',
                component: ListComponent,
            }
        ],
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConverterRoutingModule {}
