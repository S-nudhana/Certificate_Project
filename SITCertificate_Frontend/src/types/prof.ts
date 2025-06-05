export interface CommentType {
  comment_Id: number;
  comment_username: string;
  comment_detail: string;
  comment_status: boolean;
}

export interface EventDataType {
  event_name: string;
  event_owner: string;
  event_startDate: string;
  event_endDate: string;
  event_approve: number;
  event_certificate: string;
  event_excel: string;
  event_emailTemplate: string;
}

export interface HistoryData {
  event_thumbnail: string;
  event_name: string;
  event_owner: string;
  event_startDate: string;
  event_endDate: string;
  event_id: string;
  event_approve: boolean;
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