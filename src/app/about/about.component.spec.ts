import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-section h1')?.textContent).toContain('Meet Our Master Baker');
  });

  it('should have story cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const storyCards = compiled.querySelectorAll('.story-card');
    expect(storyCards.length).toBeGreaterThan(0);
  });

  it('should have process steps', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const processSteps = compiled.querySelectorAll('.process-step');
    expect(processSteps.length).toBe(4);
  });

  it('should have values section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valuesSection = compiled.querySelector('.values-section');
    expect(valuesSection).toBeTruthy();
  });

  it('should have value items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valueItems = compiled.querySelectorAll('.value-item');
    expect(valueItems.length).toBe(4);
  });
});