import { FormControlsOf } from "../form/form.interface";

export interface ApiFilter {
  searchTerm: string | null;
}

export type ApiFilterForm = FormControlsOf<ApiFilter>;
