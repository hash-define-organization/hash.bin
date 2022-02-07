import axios from "axios";
import config from '../config.json';
import { Bin } from "./constants";

export async function saveBin ( bin: Bin )
{

  try
  {
    const axiosConfig = {
      method: 'POST',
      url: config.apiUrl + '/api/v1/saveCode',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: JSON.stringify( bin ),

    };

    const response = await axios( axiosConfig as any );
    console.log( response );
    return response.status;
  }

  catch ( e )
  {
    console.log( e );
  }
  return 401;
}
