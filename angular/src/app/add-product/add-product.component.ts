import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  addProductForm!: FormGroup;
  status: 'idle' | 'success' | 'error' = 'idle';
  message = '';

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    const formOptions: AbstractControlOptions = { };
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+([,.][0-9]{1,2})?$")]],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.*')]],
    }, formOptions);
  }

  onSubmitForm() {
    if (this.addProductForm.invalid)
      return;

    this.status = 'idle';
    this.message = '';

    const formData = { ...this.addProductForm.value };
    formData.price = formData.price.toString().replace(',', '.');

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.status = 'success';
        this.message = 'Product added successfully!';
        this.addProductForm.reset();
      },
      error: (error) => {
        if (error.status === 409) {
          this.status = 'error';
          this.message = 'Duplicate product name';
        } else {
          this.status = 'error';
          this.message = 'Adding product failed. Please try again.';
        }
      }
    });
  }
}
