export interface ProfCreateComment {
    eventId: string;
    detail: string;
}

export interface ProfLoginRequest {
    email: string;
    password: string;
}

export interface ProfRegisterRequest {
    username: string;
    fullname: string;
    email: string;
    password: string;
}