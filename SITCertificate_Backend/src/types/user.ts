export interface Event {
  event_id: string;
  event_name: string;
  event_owner: string;
  event_startDate: Date;
  event_endDate: Date;
  event_thumbnail: string;
  event_certificate: string;
  event_excel: string;
  event_approve: number;
  event_adminId: number;
  event_emailTemplate: string;
  event_certificate_position_y: number;
  event_certificate_text_size: number;
}

export interface StatisticsResponse {
  participantsAmount: number;
  participantsDownloadAmount: number;
}
