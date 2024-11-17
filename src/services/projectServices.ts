import axios from "axios";

const BASE_URL = "https://luxurypaintapi-dmb6a2bdecesggdk.centralus-01.azurewebsites.net/api";

export const fetchProjects = async (page: number = 1, pageSize: number = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/projects`, {
            params: { page, pageSize },
        });
        console.log("Fetched Projects:", response.data);

        return {
            data: response.data,
            totalCount: response.data.length,
        };
    } catch (error: any) {
        console.error("Error fetching projects:", error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch projects");
    }
};

export const fetchPhotosForProject = async (projectId: number) => {
    const response = await axios.get(`${BASE_URL}/projects/${projectId}/photos`);

    return response.data;
}