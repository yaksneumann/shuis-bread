import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render gallery header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.gallery-header h1')?.textContent).toContain('Our Bread Gallery');
  });

  it('should have filter buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filterButtons = compiled.querySelectorAll('.filter-btn');
    expect(filterButtons.length).toBeGreaterThan(0);
  });

  it('should display gallery items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const galleryItems = compiled.querySelectorAll('.gallery-item');
    expect(galleryItems.length).toBeGreaterThan(0);
  });

  it('should have placeholder message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const placeholderMessage = compiled.querySelector('.placeholder-message');
    expect(placeholderMessage).toBeTruthy();
  });
});