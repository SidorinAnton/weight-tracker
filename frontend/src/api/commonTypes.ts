export interface IPaginatedBaseResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: any;
}
