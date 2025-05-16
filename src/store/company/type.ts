export interface Company {
  id: string;
  name: string;
}

export interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
  loading: boolean;
  error: string | null;
}
