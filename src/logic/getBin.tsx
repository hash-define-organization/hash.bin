import axios from "axios";
import config from '../config.json';

export async function getBin ( binUrl: String )
{
  const response = await axios.get( `${ config.homeUrl }/api/v1${ binUrl }` );
  return response.data;
}
