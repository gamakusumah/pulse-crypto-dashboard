/** Generic paginated request params shared across list endpoints. */
export interface PaginationParams {
  page: number;
  perPage: number;
}

/** Sort direction used by sortable tables. */
export type SortDirection = 'asc' | 'desc';

/** A column-level sort state, e.g. `{ id: 'price', direction: 'desc' }`. */
export interface SortState<TColumnId extends string = string> {
  id: TColumnId;
  direction: SortDirection;
}
