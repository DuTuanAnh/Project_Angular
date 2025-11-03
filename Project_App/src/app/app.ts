import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ProductService } from '../service/product.service';
import { Product } from './domain/product';

import { ImportsModule } from './imports';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TableModule,ImportsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  providers: [ ProductService ]
})
export class App implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

   ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
                default:
                    return ;
        }
    }
}
