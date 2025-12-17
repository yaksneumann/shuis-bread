import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { BreadItem } from '../menu/menu.component';

describe('CartService', () => {
  let service: CartService;

  const mockBreadItem: BreadItem = {
    id: 1,
    name: 'Classic Sourdough',
    description: 'Traditional sourdough with perfect crust',
    price: '₪30',
    category: 'sourdough',
    image: 'sourdough-classic.jpg'
  };

  const mockBreadItem2: BreadItem = {
    id: 2,
    name: 'Everything Bagel',
    description: 'Topped with sesame, poppy seeds, garlic, and onion',
    price: '₪9 each',
    category: 'bagels',
    image: 'bagel-everything.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('should add item to cart', () => {
    service.addToCart(mockBreadItem);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0].bread).toEqual(mockBreadItem);
    expect(service.items()[0].quantity).toBe(1);
    expect(service.totalItems()).toBe(1);
  });

  it('should increase quantity when adding same item', () => {
    service.addToCart(mockBreadItem);
    service.addToCart(mockBreadItem);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.totalItems()).toBe(2);
  });

  it('should add different items separately', () => {
    service.addToCart(mockBreadItem);
    service.addToCart(mockBreadItem2);
    
    expect(service.items().length).toBe(2);
    expect(service.totalItems()).toBe(2);
  });

  it('should remove item from cart', () => {
    service.addToCart(mockBreadItem);
    service.addToCart(mockBreadItem2);
    service.removeFromCart(mockBreadItem.id);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0].bread).toEqual(mockBreadItem2);
  });

  it('should update item quantity', () => {
    service.addToCart(mockBreadItem);
    service.updateQuantity(mockBreadItem.id, 5);
    
    expect(service.items()[0].quantity).toBe(5);
    expect(service.totalItems()).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    service.addToCart(mockBreadItem);
    service.updateQuantity(mockBreadItem.id, 0);
    
    expect(service.items().length).toBe(0);
  });

  it('should clear entire cart', () => {
    service.addToCart(mockBreadItem);
    service.addToCart(mockBreadItem2);
    service.clearCart();
    
    expect(service.items().length).toBe(0);
    expect(service.totalItems()).toBe(0);
  });

  it('should get item quantity', () => {
    service.addToCart(mockBreadItem);
    service.updateQuantity(mockBreadItem.id, 3);
    
    expect(service.getItemQuantity(mockBreadItem.id)).toBe(3);
    expect(service.getItemQuantity(999)).toBe(0);
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockBreadItem); // ₪30
    service.addToCart(mockBreadItem2); // ₪9
    
    expect(service.totalPrice()).toBe(39);
  });

  it('should handle prices with "each" suffix', () => {
    service.addToCart(mockBreadItem2); // ₪9 each
    service.updateQuantity(mockBreadItem2.id, 2);
    
    expect(service.totalPrice()).toBe(18);
  });
});