

export interface UseCaseOutput<E> {
    success: boolean,
    msg?: string,
    data?: E 
}

export enum ErrorMessages {
    CreationError = "Error ocurred while persisting object"
}