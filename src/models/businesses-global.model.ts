import { BusinessesData } from './businesses-data.model';

export class BusinessesGlobal {
    current_page: number;
    data: BusinessesData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}
