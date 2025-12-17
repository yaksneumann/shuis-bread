import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form data', () => {
    const formData = component.formData();
    expect(formData).toEqual({
      name: '',
      email: '',
      phone: '',
      orderType: '',
      message: ''
    });
  });

  it('should not be submitted initially', () => {
    expect(component.isSubmitted()).toBeFalsy();
  });

  it('should update form data when signal is updated', () => {
    const newFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      orderType: 'order',
      message: 'I would like to order some sourdough'
    };

    component.formData.set(newFormData);
    fixture.detectChanges();

    expect(component.formData()).toEqual(newFormData);
  });

  it('should mark as submitted when form is submitted', () => {
    component.submitForm();
    expect(component.isSubmitted()).toBeTruthy();
  });

  it('should reset form data after submission', () => {
    // Set some form data
    component.formData.set({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      orderType: 'order',
      message: 'Test message'
    });

    // Submit form
    component.submitForm();

    // Check that form is reset
    const formData = component.formData();
    expect(formData).toEqual({
      name: '',
      email: '',
      phone: '',
      orderType: '',
      message: ''
    });
  });

  it('should display contact methods', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.contact-methods')).toBeTruthy();
  });

  it('should display business hours', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.business-hours')).toBeTruthy();
  });

  it('should display contact form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.contact-form')).toBeTruthy();
  });

  it('should display quick order section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.quick-order-section')).toBeTruthy();
  });

  it('should have WhatsApp link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const whatsappLink = compiled.querySelector('a[href*="wa.me"]');
    expect(whatsappLink).toBeTruthy();
  });

  it('should have Instagram link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instagramLink = compiled.querySelector('a[href*="instagram"]');
    expect(instagramLink).toBeTruthy();
  });

  it('should have email link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailLink = compiled.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
  });

  it('should have phone link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const phoneLink = compiled.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
  });

  it('should show success message after submission', () => {
    component.submitForm();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const successMessage = compiled.querySelector('.success-message');
    expect(successMessage).toBeTruthy();
    expect(successMessage?.textContent).toContain('Message Sent!');
  });

  it('should have all form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="phone"]')).toBeTruthy();
    expect(compiled.querySelector('select[name="orderType"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="message"]')).toBeTruthy();
  });

  it('should have submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton?.textContent?.trim()).toBe('Send Message');
  });

  it('should display order steps', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderSteps = compiled.querySelectorAll('.order-step');
    expect(orderSteps.length).toBe(4);
  });

  it('should have step numbers 1-4', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stepNumbers = compiled.querySelectorAll('.step-number');
    
    expect(stepNumbers[0].textContent?.trim()).toBe('1');
    expect(stepNumbers[1].textContent?.trim()).toBe('2');
    expect(stepNumbers[2].textContent?.trim()).toBe('3');
    expect(stepNumbers[3].textContent?.trim()).toBe('4');
  });

  it('should display business hours correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const hoursRows = compiled.querySelectorAll('.hours-row');
    
    expect(hoursRows.length).toBeGreaterThan(0);
    
    // Check for weekday hours
    const weekdayRow = Array.from(hoursRows).find(row => 
      row.textContent?.includes('Monday - Friday')
    );
    expect(weekdayRow).toBeTruthy();
  });
});