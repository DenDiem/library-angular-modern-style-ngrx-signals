import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

import { ApiFilter as AppFilter, ApiFilterForm } from '../../entities/api/filters.interface';
import { DEBOUNCE_TIME } from '../../entities/input/input.constant';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  private destroyRef = inject(DestroyRef);

  public readonly filters = input<AppFilter>();
  public readonly filter = output<AppFilter>();

  protected readonly filterForm = this.createForm();

  constructor() {
    this.filterForm.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.filter.emit(this.filterForm.getRawValue());
    });

    effect(() => {
      this.filterForm.patchValue(this.filters() ?? {});
    });
  }

  private createForm(): FormGroup<ApiFilterForm> {
    return new FormGroup<ApiFilterForm>({
      searchTerm: new FormControl<string | null>(null),
    });
  }

  protected submit(): void {
    this.filter.emit(this.filterForm.getRawValue());
  }
}
