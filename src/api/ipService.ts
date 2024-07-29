import axios from 'axios';
import { IpInfo } from '@/types/IpEntity';

const API_URL = 'https://ipinfo.io/';

export async function getIpData(ip: string): Promise<IpInfo> {
    const endpoint = ip ? `${API_URL}/${ip}/json` : `${API_URL}/json`;

    try {
        const { data } = await axios.get<IpInfo>(endpoint);
        console.log(data);
        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.error('Network error or no response received:', error.message);
                throw new Error('Network error or no response received');
            }

            switch (error.response.status) {
                case 400:
                    console.error('Bad request:', error.response.data);
                    throw new Error('Bad request');
                case 401:
                    console.error('Unauthorized:', error.response.data);
                    throw new Error('Unauthorized');
                case 403:
                    console.error('Forbidden:', error.response.data);
                    throw new Error('Forbidden');
                case 404:
                    console.error('Not found:', error.response.data);
                    throw new Error('Not found');
                case 500:
                    console.error('Internal server error:', error.response.data);
                    throw new Error('Internal server error');
                default:
                    console.error('Unexpected error:', error.response.data);
                    throw new Error('Unexpected error occurred');
            }
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred');
        }
    }
}
