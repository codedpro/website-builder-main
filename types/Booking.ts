export interface Booking {
    service_id: string;
    service_name: string;
    description: string;
    base_price: number;
    resources: Array<{
      resource_id: string;
      resource_name: string;
      resource_type: string;
      description: string;
      time_blocks: Array<{
        time_block_id: string;
        duration: number;
        default_price: number;
        specific_price: number | null;
      }>;
      schedules: Array<{
        specific_date: string | null;
        start_time: string;
        end_time: string;
        is_recurring: boolean;
        recurrence_pattern: string | null;
      }>;
    }>;
    add_ons: Array<{
      add_on_id: string;
      add_on_name: string;
      price: number;
      quantity_available: number;
      unit: string;
    }>;
    
    available_bookings?: Booking[];
  }
  