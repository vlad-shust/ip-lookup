import axios from 'axios';
import { IpInfo } from '@/types/IpEntity';
import { ErrorMessages } from '@/utils/constants';

const API_URL = 'https://ipinfo.io/';

export async function getIpData(ip: string): Promise<IpInfo> {
    const endpoint = ip.trim() ? `${API_URL}/${ip}/json` : `${API_URL}/json`;

    try {
      const { data } = await axios.get<IpInfo>(endpoint);

      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          console.error(ErrorMessages.NETWORK_ERROR, error.message);
          throw new Error(ErrorMessages.NETWORK_ERROR);
        }

        switch (error.response.status) {
          case 400:
            console.error(ErrorMessages.BAD_REQUEST, error.response.data);
            throw new Error(ErrorMessages.BAD_REQUEST);
          case 401:
            console.error(ErrorMessages.UNAUTHORIZED, error.response.data);
            throw new Error(ErrorMessages.UNAUTHORIZED);
          case 403:
            console.error(ErrorMessages.FORBIDDEN, error.response.data);
            throw new Error(ErrorMessages.FORBIDDEN);
          case 404:
            console.error(ErrorMessages.NOT_FOUND, error.response.data);
            throw new Error(ErrorMessages.NOT_FOUND);
          case 500:
            console.error(ErrorMessages.INTERNAL_SERVER_ERROR, error.response.data);
            throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
          default:
            console.error(ErrorMessages.UNEXPECTED_ERROR, error.response.data);
            throw new Error(ErrorMessages.UNEXPECTED_ERROR);
        }
      } else {
          console.error(ErrorMessages.UNEXPECTED_ERROR, error);
          throw new Error(ErrorMessages.UNEXPECTED_ERROR);
      }
    }
}
