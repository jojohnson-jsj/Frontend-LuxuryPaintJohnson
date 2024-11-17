import axios from "axios";

const apiClient = axios.create
({
    baseURL: "https://luxurypaintapi-dmb6a2bdecesggdk.centralus-01.azurewebsites.net/api",
    headers: 
    {
        "Content-Type": "application/json",
    },
});

export const fetchPhotos = async () => 
{
    try 
    {
        const response = await apiClient.get("/photos");
        
        return response.data;
    } 
    catch (error: any) 
    {
        console.error("Error fetching photos:", error.message);

        throw error;
    }
};