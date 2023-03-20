import axios from "axios";
import config from '../config.json';

export async function getBin ( binUrl: String )
{
  const axiosConfig = {
    method: 'GET',
    url: config.apiUrl + `/api/v1${ binUrl }`,
    headers: {
      'Content-Type': 'application/json',
    }
    ,
  }

  const response = await axios.get( `${ config.apiUrl }/api/v1${ binUrl }` );
  return response.data;
}
