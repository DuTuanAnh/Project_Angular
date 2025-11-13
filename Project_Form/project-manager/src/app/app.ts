import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { ImportsModule } from './imports';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { Product } from '../domain/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportsModule, InputIcon, IconField, InputTextModule, FormsModule],
  providers: [MessageService, ProductService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  products!: Product[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Product } = {};

  searchQuery: string = ''; 

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit() {
    this.products = [
      { id: '1', code: 'PRD001', name: 'Laptop Acer Nitro 5', inventoryStatus: 'INSTOCK', price: 25000000 },
      { id: '2', code: 'PRD002', name: 'Laptop Dell Inspiron 14 5440 D0F3W', inventoryStatus: 'INSTOCK', price: 22000000 },
      { id: '3', code: 'PRD003', name: 'Chuột Razer Viper V3', inventoryStatus: 'INSTOCK', price: 1290000 },
      { id: '4', code: 'PRD004', name: 'Chuột Dareu M901X', inventoryStatus: 'OUTOFSTOCK', price: 320000 },
      { id: '5', code: 'PRD005', name: 'Tai nghe HyperX Cloud Stinger 2', inventoryStatus: 'INSTOCK', price: 1590000 },
      { id: '6', code: 'PRD006', name: 'Màn Hình EDRa EGM24F1', inventoryStatus: 'OUTOFSTOCK', price: 1500000 },
      { id: '7', code: 'PRD007', name: 'Bàn Phím Aula F87', inventoryStatus: 'INSTOCK', price: 907000 },
      { id: '8', code: 'PRD008', name: 'Bàn Phím MADLIONS 68HE', inventoryStatus: 'INSTOCK', price: 1220000 },
      { id: '9', code: 'PRD009', name: 'Màn hình Gaming Samsung Odyssey G5 LS27CG552 27 inch', inventoryStatus: 'INSTOCK', price: 4490000 },
      { id: '10', code: 'PRD0010', name: 'Tai nghe Ulisten', inventoryStatus: 'OUTOFSTOCK', price: 1025000 }
    ];

    this.statuses = [
      { label: 'Còn hàng', value: 'INSTOCK' },
      { label: 'Hết hàng', value: 'OUTOFSTOCK' }
    ];
  }

  addNewProduct() {
    const newId = (this.products.length + 1).toString();
    this.products.push({
      id: newId,
      code: 'NEW' + newId,
      name: '',
      inventoryStatus: 'INSTOCK',
      price: 0
    });
    this.messageService.add({ severity: 'info', summary: 'New Product', detail: 'Đã thêm sản phẩm mới' });
  }

  
  get filteredProducts(): Product[] {
    if (!this.searchQuery.trim()) return this.products;
    return this.products.filter(p =>
      p.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  
  exportProducts() {
    const dataStr = JSON.stringify(this.products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    window.URL.revokeObjectURL(url);
    this.messageService.add({ severity: 'success', summary: 'Export', detail: 'Đã xuất danh sách sản phẩm' });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price !== undefined && product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  }
}
