import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);

  // Expose cart data via signals
  cartItems = this.cartService.items;
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;

  updateQuantity(breadId: number, quantity: number): void {
    this.cartService.updateQuantity(breadId, quantity);
  }

  removeItem(breadId: number): void {
    this.cartService.removeFromCart(breadId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  increaseQuantity(breadId: number): void {
    const currentQuantity = this.cartService.getItemQuantity(breadId);
    this.cartService.updateQuantity(breadId, currentQuantity + 1);
  }

  decreaseQuantity(breadId: number): void {
    const currentQuantity = this.cartService.getItemQuantity(breadId);
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(breadId, currentQuantity - 1);
    }
  }

  getOrderMessage(): string {
    const items = this.cartItems();
    const itemList = items.map(item => 
      `${item.quantity}x ${item.bread.name} (${item.bread.price})`
    ).join('\n');
    
    return `${itemList}\n\nTotal: ₪${this.totalPrice().toFixed(0)}`;
  }

  getItemTotal(item: any): number {
    const price = parseFloat(item.bread.price.replace(/[₪,\s]/g, '').replace(/each$/, ''));
    return price * item.quantity;
  }
}