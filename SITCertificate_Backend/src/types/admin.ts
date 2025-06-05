export interface EventData {
    eventName: string,
    eventOwner: string,
    openDate: string,
    closeDate: string,
    thumbnail: string,
    template: string,
    excel: string,
    emailTemplate: string,
    inputSize: number,
    inputY: number,
    eventId: number
}

export interface EventRecord {
    event_thumbnail: string | null;
    event_certificate: string | null;
    event_excel: string | null;
}

export interface ProfessorEmail {
    professor_email: string;
}

export interface AdminResetPassword {
    admin_forgotpasswordPin: string;
    admin_iv: string;
    admin_refCode: string;
}

export interface AdminCreateEventRequest {
    eventName: string;
    eventOwner: string;
    openDate: any;
    closeDate: any;
    thumbnail: string;
    template: string;
    excel: string;
    emailTemplate: string;
    inputSize: number;
    inputY: number;
}

export interface AdminResetPasswordRequest {
    email: string;
    pin: string;
    refCode: string;
    password: string;
}

export interface AdminLoginRequest {
    email: string;
    password: string;
}

export interface AdminRegisterRequest {
    username: string;
    fullname: string;
    email: string;
    password: string;
}