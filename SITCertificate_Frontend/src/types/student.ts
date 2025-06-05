export interface EventData {
  event_name: string;
  event_startDate: string;
  event_endDate: string;
  event_thumbnail: string;
}

export interface Event {
  event_thumbnail: string;
  event_name: string;
  event_owner: string;
  event_startDate: string;
  event_endDate: string;
  event_id: string;
  event_approve: boolean;
}