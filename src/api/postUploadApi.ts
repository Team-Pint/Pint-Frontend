import type { PostUploadRequest, PostUploadResponse } from "../types/PostUpload";
import api from './apiClient';

export const postUploadApi = async (data: PostUploadRequest): Promise<PostUploadResponse> => {
    const formData = new FormData();

    formData.append("description", data.description);
    formData.append("location", data.location);
    if (data.filter) {
        formData.append("filter", data.filter);
    }
    if (data.image) formData.append("image", data.image);

    const response = await api.post<PostUploadResponse>("/posts", formData);

    return response.data;
}