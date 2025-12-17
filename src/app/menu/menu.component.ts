import { Component, signal, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

export interface BreadItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable?: boolean;
  ingredients?: string[];
}

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private cartService = inject(CartService);
  
  protected readonly activeCategory = signal<string>('All');
  
  protected readonly categories = signal<string[]>([
    'All', 'Sourdough', 'Bagels', 'Traditional', 'German'
  ]);

  private readonly menuItems = signal<BreadItem[]>([
    {
      id: 1,
      name: 'Classic Sourdough',
      description: 'Our signature naturally leavened bread with a golden crust and tangy flavor. Made with our 5-year-old starter.',
      price: '₪30',
      category: 'Sourdough',
      image: 'sourdough-classic.jpg',
      isAvailable: true,
      ingredients: ['Organic wheat flour', 'Natural sourdough starter', 'Sea salt', 'Water']
    },
    {
      id: 2,
      name: 'Whole Grain Sourdough',
      description: 'Hearty and nutritious bread featuring a blend of whole grains and seeds, naturally fermented for easy digestion.',
      price: '₪30',
      category: 'Sourdough',
      image: 'sourdough-whole-grain.jpg',
      isAvailable: true,
      ingredients: ['Organic whole wheat flour', 'Rye flour', 'Sourdough starter', 'Sunflower seeds', 'Sea salt']
    },
    // {
    //   id: 3,
    //   name: 'Rye Sourdough',
    //   description: 'Dense, flavorful European-style rye bread with caraway seeds and a distinctive tangy taste.',
    //   price: '₪36',
    //   category: 'Sourdough',
    //   image: 'sourdough-rye.jpg',
    //   isAvailable: true,
    //   ingredients: ['Organic rye flour', 'Wheat flour', 'Sourdough starter', 'Caraway seeds', 'Sea salt']
    // },
    {
      id: 4,
      name: 'Everything Bagels',
      description: 'Hand-rolled bagels topped with our signature everything seasoning blend. Boiled and baked fresh daily.',
      price: '₪8 each',
      category: 'Bagels',
      image: 'bagel-everything.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Water', 'Salt', 'Everything seasoning']
    },
    {
      id: 5,
      name: 'Sesame Bagels',
      description: 'Traditional New York-style bagels with a generous coating of toasted sesame seeds.',
      price: '₪8 each',
      category: 'Bagels',
      image: 'bagel-sesame.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Water', 'Yeast', 'Salt', 'Sesame seeds']
    },
    {
      id: 6,
      name: 'Plain Bagels',
      description: 'Simple, classic bagels perfect for any topping. Crispy outside, chewy inside.',
      price: '₪8 each',
      category: 'Bagels',
      image: 'bagel-plain.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Water', 'Salt']
    },
    {
      id: 7,
      name: 'Traditional Challah',
      description: 'Braided egg bread that\'s slightly sweet and incredibly soft. Perfect for Shabbat or any special occasion.',
      price: '₪25',
      category: 'Traditional',
      image: 'challah-traditional.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Eggs', 'Honey', 'Oil', 'Yeast', 'Salt']
    },
    {
      id: 8,
      name: 'Rosh Hashanah Round Challah',
      description: 'Special round challah symbolizing the cycle of the year, made with honey for a sweet new year.',
      price: '₪54',
      category: 'Traditional',
      image: 'challah-round.jpg',
      isAvailable: false,
      ingredients: ['Bread flour', 'Eggs', 'Honey', 'Oil', 'Yeast', 'Salt', 'Raisins']
    },
    {
      id: 9,
      name: 'German Pretzels (Laugenbrezeln)',
      description: 'Authentic Bavarian-style soft pretzels with coarse salt. Made with traditional lye wash for that distinctive flavor.',
      price: '₪10 each',
      category: 'German',
      image: 'pretzel-german.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Water', 'Yeast', 'Salt', 'Lye solution', 'Coarse salt']
    },
    {
      id: 10,
      name: 'Pretzel Rolls',
      description: 'Soft, chewy rolls with the distinctive pretzel flavor. Perfect for sandwiches.',
      price: '₪10 each',
      category: 'German',
      image: 'pretzel-rolls.jpg',
      isAvailable: true,
      ingredients: ['Bread flour', 'Water', 'Yeast', 'Salt', 'Lye solution']
    },
    {
      id: 11,
      name: 'Pumpernickel',
      description: 'Dark, dense German rye bread with a deep, complex flavor. Slow-baked for 24 hours.',
      price: '₪40',
      category: 'German',
      image: 'pumpernickel.jpg',
      isAvailable: false,
      ingredients: ['Dark rye flour', 'Rye berries', 'Sourdough starter', 'Molasses', 'Salt']
    }
  ]);

  protected readonly filteredItems = signal<BreadItem[]>(this.menuItems());

  constructor() {
    // Watch for category changes and update filtered items
    this.updateFilteredItems();
  }

  protected setActiveCategory(category: string): void {
    this.activeCategory.set(category);
    this.updateFilteredItems();
  }

  private updateFilteredItems(): void {
    const category = this.activeCategory();
    if (category === 'All') {
      this.filteredItems.set(this.menuItems());
    } else {
      this.filteredItems.set(
        this.menuItems().filter(item => item.category === category)
      );
    }
  }

  addToCart(bread: BreadItem): void {
    this.cartService.addToCart(bread);
  }

  getCartQuantity(breadId: number): number {
    return this.cartService.getItemQuantity(breadId);
  }
}