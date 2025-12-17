import { Injectable, signal, computed } from '@angular/core';
import { BreadItem } from '../menu/menu.component';

export interface CartItem {
  bread: BreadItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Public readonly signals
  readonly items = this.cartItems.asReadonly();
  
  readonly totalItems = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      const price = parseFloat(item.bread.price.replace(/[₪,]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
  });

  addToCart(bread: BreadItem): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.bread.id === bread.id);
    
    if (existingItemIndex >= 0) {
      // Item already exists, increase quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this.cartItems.set(updatedItems);
    } else {
      // New item, add to cart
      this.cartItems.set([...currentItems, { bread, quantity: 1 }]);
    }
  }

  removeFromCart(breadId: number): void {
    const updatedItems = this.cartItems().filter(item => item.bread.id !== breadId);
    this.cartItems.set(updatedItems);
  }

  updateQuantity(breadId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(breadId);
      return;
    }
    
    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item =>
      item.bread.id === breadId ? { ...item, quantity } : item
    );
    this.cartItems.set(updatedItems);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  getItemQuantity(breadId: number): number {
    const item = this.cartItems().find(item => item.bread.id === breadId);
    return item ? item.quantity : 0;
  }
}