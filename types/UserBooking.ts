export interface UserBooking {
    booking_id: string;
    booking_date: Date;
    start_time: string;
    end_time: string;
    status: string;
    resource_name: string;
    service_name: string;
    base_amount: string;
    add_on_amount: string;
    total_amount: string;
  }
  