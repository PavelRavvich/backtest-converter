// List request
export interface IListRequest {

  // Title for search
  title?: string;

  // Page length
  limit?: number;

  // Rows before page
  offset?: number;

  // Addition field
  [key: string]: any;
}
