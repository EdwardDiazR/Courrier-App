export interface Package {
  id: string;
  status: string | undefined;
  statusId: number;
  weight: number;
  date: string;
  hasPreAlert: boolean;
  transportCompany: string;
  category: string;
  total: number;
  seller: string;
  trackingId: string;
  articlesQuantity: number;
  statusHistorial: StatusHistorial[];
}

export interface StatusHistorial {
  status: string;
  time: string;
}


export interface PreAlert {
  created_at:string,
  tracking: string;
  article: string;
  supplier: string;
  transportist: string;
  fobUSD: number;
  receptionDate:string|null
}
