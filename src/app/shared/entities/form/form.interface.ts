import { FormControl } from '@angular/forms';

export declare type FormControlsOf<T> = {
    [K in keyof T]: FormControl<T[K]>;
  };