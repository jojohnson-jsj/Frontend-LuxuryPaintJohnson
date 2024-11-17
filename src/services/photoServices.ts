import axios from "axios";

const apiClient = axios.create
({
    baseURL: "https://luxurypaintapi-dmb6a2bdecesggdk.centralus-01.azurewebsites.net/api",
    headers: 
    {
        "Content-Type": "application/json",
    },
});

export const fetchPhotos = async (page = 1, pageSize = 10) => 
{
    try {
        const response = await apiClient.get(`/photos`, {
            params: { page, pageSize },
        });
        
        return{
            photos: response.data.data,
            totalCount: response.data.totalCount, 
        }
    } catch (error: any) {
        console.error("Error fetching photos:", error.message);

        throw error;
    }
};