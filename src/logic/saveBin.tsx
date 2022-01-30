import axios from "axios";
import config from '../config.json';
import { Bin } from "./constants";

export async function saveBin ( bin: Bin )
{
  try
  {
    const response = await axios.post( `${ config.homeUrl }/api/v1/takeCode`, bin );
    console.log( response );
    return response.status;
  }
  catch ( e )
  {
    console.log( e );
  }
  return 401;
}
