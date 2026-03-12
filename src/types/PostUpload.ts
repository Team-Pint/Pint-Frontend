export interface PostUploadRequest {
    image: File | null;
    previewImage: string;
    location: string;
    filter: File | null;
    description: string;
}

export interface PostUploadResponse {
    code: number;
    message: string;
    data: string;
}