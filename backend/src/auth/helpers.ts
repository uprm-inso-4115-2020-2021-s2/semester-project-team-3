
export interface VerifyOptions {
    message: string;
}

export interface VerifyFunction {
    (error: any, user?: any, msg?: VerifyOptions): void;
}

export interface DeserializedJwtToken {
    sub: string
}