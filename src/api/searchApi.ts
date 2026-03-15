import type { SearchResponse, SearchUser } from "../types/SearchResponse";
import api from "./apiClient";

export const searchApi = async (keyword: string): Promise<SearchUser[]> => {
    if (!keyword.trim()) return [];

    try {
        const response = await api.get<SearchResponse>(`/search`, {
            params: { keyword }
        });
        return response.data.data?.userList || [];
    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
};