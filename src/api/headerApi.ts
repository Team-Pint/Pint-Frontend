import type { HeaderResponse } from "../types/HeaderResponse";
import api from "./apiClient";

export const headerApi = async () => {
    const response = await api.get<HeaderResponse>("/header/profile");

    return response.data;
}