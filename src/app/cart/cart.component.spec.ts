import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../services/cart.service';
import { BreadItem } from '../menu/menu.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const mockBreadItem: BreadItem = {
    id: 1,
    name: 'Classic Sourdough',
    description: 'Traditional sourdough with perfect crust',
    price: '₪30',
    category: 'sourdough',
    image: 'sourdough-classic.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-cart')).toBeTruthy();
    expect(compiled.textContent).toContain('Your cart is empty');
  });

  it('should display cart items when cart has items', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cart-items')).toBeTruthy();
    expect(compiled.querySelector('.empty-cart')).toBeFalsy();
    expect(compiled.textContent).toContain('Classic Sourdough');
  });

  it('should show correct total items count', () => {
    cartService.addToCart(mockBreadItem);
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    expect(component.totalItems()).toBe(2);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('You have 2 items in your cart');
  });

  it('should increase quantity when increase button is clicked', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    component.increaseQuantity(mockBreadItem.id);
    expect(cartService.getItemQuantity(mockBreadItem.id)).toBe(2);
  });

  it('should decrease quantity when decrease button is clicked', () => {
    cartService.addToCart(mockBreadItem);
    cartService.updateQuantity(mockBreadItem.id, 3);
    fixture.detectChanges();

    component.decreaseQuantity(mockBreadItem.id);
    expect(cartService.getItemQuantity(mockBreadItem.id)).toBe(2);
  });

  it('should remove item when remove button is clicked', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    component.removeItem(mockBreadItem.id);
    expect(cartService.items().length).toBe(0);
  });

  it('should clear cart when clear button is clicked', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    component.clearCart();
    expect(cartService.items().length).toBe(0);
  });

  it('should display cart summary with correct totals', () => {
    cartService.addToCart(mockBreadItem);
    cartService.updateQuantity(mockBreadItem.id, 2);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.summary-card')).toBeTruthy();
    expect(compiled.textContent).toContain('Total Items: 2');
    expect(compiled.textContent).toContain('Total Price: ₪60');
  });

  it('should have WhatsApp order link', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const whatsappLink = compiled.querySelector('a[href*="wa.me"]');
    expect(whatsappLink).toBeTruthy();
    expect(whatsappLink?.textContent?.trim()).toBe('Order via WhatsApp');
  });

  it('should have continue shopping link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const continueLink = compiled.querySelector('a[routerLink="/menu"]');
    expect(continueLink).toBeTruthy();
  });

  it('should display pickup information', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pickup-note')).toBeTruthy();
    expect(compiled.textContent).toContain('24 hours in advance');
  });

  it('should disable decrease button when quantity is 1', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const decreaseBtn = compiled.querySelector('.quantity-btn.decrease') as HTMLButtonElement;
    expect(decreaseBtn?.disabled).toBeTruthy();
  });

  it('should show item category', () => {
    cartService.addToCart(mockBreadItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sourdough');
  });
});