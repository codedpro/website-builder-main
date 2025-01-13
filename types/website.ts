export interface Website {
    website_uuid: string;
    domain_name: string;
    website_status: "active" | "pending" | "disabled";
    hosting_start_date: string; // ISO 8601 string
    hosting_end_date: string; // ISO 8601 string
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    created_at: string; // ISO 8601 string
    updated_at: string; // ISO 8601 string
  }
  