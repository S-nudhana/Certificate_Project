export interface StudentGenerateExample {
    eventId: string;
    name: string;
    surname: string;
}

export interface Certificate {
  event_Certificate: string;
  event_name: string;
  student_event_nameOnCertificate: string;
  student_event_surnameOnCertificate: string;
  student_event_mailToSendCertificate: string;
  student_event_generatedCertificate: boolean;
  event_certificate_position_y: number;
  event_certificate_text_size: number;
}

export interface StudentGenerateCertificate {
    student_event_generatedCertificate: boolean;
}

export interface StudentEventCertificateGenerate {
  student_event_eventCertificateGenerated: number;
}

export interface CertificateInfo {
  student_nameOnCertificate: string;
  student_surnameOnCertificate: string;
  student_emailTostudent_sendCertificate: string;
}

export interface Event {
  event_id: string;
  event_name: string;
  event_startDate: string;
  event_endDate: string;
  event_thumbnail: string;
}

export interface StudentLoginRequest {
    email: string;
    password: string;
}

export interface CertificateRequestBody {
  eventId: string;
  name: string;
  surname: string;
  email: string;
  modifiedPdf?: string;
}