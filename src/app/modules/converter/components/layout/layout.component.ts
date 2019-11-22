import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
    Router,
    NavigationEnd,
    ActivatedRoute,
} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        this.routerSubscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(this.updateRoute.bind(this));
    }

    // Subscription on route changing
    private routerSubscription: Subscription;

    // Is route 'converter'
    public isBaseRoute: boolean;

    // Update flag by route
    private updateRoute(): void {
        this.isBaseRoute = this.router.isActive(
            this.router.createUrlTree([ '.' ], { relativeTo: this.route }),
            true
        );
    }
}
