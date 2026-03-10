export interface PostUpload {
    imageFile: File | null;
    previewImage: string;
    location: string;
    filterFile: File | null;
    description: string;
}