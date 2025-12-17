import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  orderType: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    orderType: ''
  });

  isSubmitted = signal(false);

  submitForm() {
    console.log('Form submitted:', this.formData());
    this.isSubmitted.set(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.isSubmitted.set(false);
      this.formData.set({
        name: '',
        email: '',
        phone: '',
        message: '',
        orderType: ''
      });
    }, 3000);
  }
}
