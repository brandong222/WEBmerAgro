export interface superInterfazI {
  id?: number | null;
  peo_name?: string | null;
  peo_lastname?: string | null;
  peo_adress?: string | null;
  peo_dateBirth?: string | null;
  peo_image?: string | null;
  peo_mail?: string | null;
  peo_phone?: string | null;
  pro_name?: string | null;
  pro_type?: string | null;
  pro_price?: number | null;
  pro_certs?: string | null;
  pro_image?: string | null;
  pro_unit?: string | null;
  pro_description?: string | null;
  pro_status?: number | null;
  providers_id?: number | null;
  categories_id?: number | null;
  prov_ranking?: number | null;
  prov_group: string | null;
  prov_description: string | null;
  prov_status: boolean | null;
  people_peo_id: number | null;
  req_dateRequest: string | null;
  req_type: string | null;
  req_description: string | null;
  req_status: boolean | null;
  people_id: number | null;
  use_cc?: string | null;
  use_password?: string | null;
  use_rol?: any | null;
  use_status?: number | null;
  users_id?: number | null;
  provider_id?: number | null;
  product_id?: number | null;
}