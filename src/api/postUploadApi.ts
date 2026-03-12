import type { PostUploadRequest } from "../types/PostUpload";
import api from "./axios";

export const postUploadApi = async (data: PostUploadRequest) => {
    {
        const formData = new FormData();

        formData.append("description", data.description);
        formData.append("location", data.location);
        if (data.filter) formData.append("filter", data.filter);
        if (data.image) formData.append("image", data.image);

        const response = await api.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    }
}