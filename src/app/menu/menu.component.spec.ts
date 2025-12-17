import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.menu-header h1')?.textContent).toContain('Our Artisan Bread Menu');
  });

  it('should have category buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const categoryButtons = compiled.querySelectorAll('.category-btn');
    expect(categoryButtons.length).toBeGreaterThan(0);
  });

  it('should display menu items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('.menu-item');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('should have order section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderSection = compiled.querySelector('.order-section');
    expect(orderSection).toBeTruthy();
  });
});