import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    imports: [RouterModule]
})

export class MenuComponent {
    cantidadItems=0;
}