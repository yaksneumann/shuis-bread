import { Component, signal } from '@angular/core';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: string;
  placeholder: string;
}

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  protected readonly activeCategory = signal<string>('All');
  protected readonly selectedImage = signal<GalleryImage | null>(null);
  
  protected readonly categories = signal<string[]>([
    'All', 'Sourdough', 'Process', 'Traditional', 'Finished'
  ]);

  private readonly galleryImages = signal<GalleryImage[]>([
    {
      id: 1,
      title: 'Classic Sourdough Loaves',
      description: 'Fresh sourdough loaves with golden crusts, straight from our stone oven.',
      category: 'Sourdough',
      placeholder: '🍞'
    },
    {
      id: 2,
      title: 'Sourdough Starter',
      description: 'Our 5-year-old sourdough starter, the heart of our fermentation process.',
      category: 'Process',
      placeholder: '🫙'
    },
    {
      id: 3,
      title: 'Hand-Braided Challah',
      description: 'Traditional six-strand challah, braided with care for Shabbat celebrations.',
      category: 'Traditional',
      placeholder: '🥖'
    },
    {
      id: 4,
      title: 'German Pretzel Making',
      description: 'Behind the scenes of our authentic laugenbrezeln preparation.',
      category: 'Process',
      placeholder: '🥨'
    },
    {
      id: 5,
      title: 'Fresh Bagels',
      description: 'Hand-rolled bagels with everything seasoning, boiled and baked to perfection.',
      category: 'Finished',
      placeholder: '🥯'
    },
    {
      id: 6,
      title: 'Kneading Dough',
      description: 'The meditative process of hand-kneading dough for our artisan breads.',
      category: 'Process',
      placeholder: '👐'
    },
    {
      id: 7,
      title: 'Whole Grain Sourdough',
      description: 'Nutritious whole grain loaves with seeds and ancient grains.',
      category: 'Sourdough',
      placeholder: '🌾'
    },
    {
      id: 8,
      title: 'Oven Fresh',
      description: 'Steam rising from freshly baked loaves in our stone oven.',
      category: 'Finished',
      placeholder: '♨️'
    },
    {
      id: 9,
      title: 'Rye Sourdough',
      description: 'Dense, flavorful rye bread with caraway seeds and traditional flavor.',
      category: 'Sourdough',
      placeholder: '🍞'
    },
    {
      id: 10,
      title: 'Pretzel Shaping',
      description: 'The art of shaping traditional German pretzels by hand.',
      category: 'Process',
      placeholder: '🤲'
    },
    {
      id: 11,
      title: 'Round Challah',
      description: 'Special round challah for Rosh Hashanah, symbolizing the cycle of the year.',
      category: 'Traditional',
      placeholder: '⭕'
    },
    {
      id: 12,
      title: 'Daily Selection',
      description: 'Our daily bread selection, fresh from the oven each morning.',
      category: 'Finished',
      placeholder: '🏪'
    }
  ]);

  protected readonly filteredImages = signal<GalleryImage[]>(this.galleryImages());

  constructor() {
    this.updateFilteredImages();
  }

  protected setActiveCategory(category: string): void {
    this.activeCategory.set(category);
    this.updateFilteredImages();
  }

  protected openModal(image: GalleryImage): void {
    this.selectedImage.set(image);
  }

  protected closeModal(): void {
    this.selectedImage.set(null);
  }

  private updateFilteredImages(): void {
    const category = this.activeCategory();
    if (category === 'All') {
      this.filteredImages.set(this.galleryImages());
    } else {
      this.filteredImages.set(
        this.galleryImages().filter(image => image.category === category)
      );
    }
  }
}