import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faClock } from "@fortawesome/free-solid-svg-icons";

import './App.scss';

import { getBin } from "./logic/getBin";
import { saveBin } from "./logic/saveBin";
import { SaveStates, Bin, SaveIcons } from "./logic/constants";
import { CustomUrlInput } from "./components/CustomUrlInput";
import { ExpiryMenu } from "./components/ExpiryMenu";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";


function App ()
{
  const [ customUrl, setCustomUrl ] = useState( "" );
  const [ customUrlError, setCustomUrlError ] = useState( false );

  const [ binData, setBinData ] = useState( "" );
  const [ language, setLanguage ] = useState( "javascript" );
  const [ expiryDate, setExpiryDate ] = useState( "Never" );

  const [ saveIcon, setSaveIcon ] = useState( faSave );
  const [ saveState, setSaveState ] = useState( SaveStates.neutral );

  const [ newBinIcon, setNewBinIcon ] = useState( faPlus );
  const [ expiryIcon, setExpiryIcon ] = useState( faClock );


  function displayBin ( bin: Bin )
  {
    setCustomUrl( bin.customUrl );
    setBinData( bin.code );
  }

  function newBin ()
  {
    window.location.pathname = '/';
    setCustomUrl( "" );
    setBinData( "" );
  }

  async function onSaveClick ()
  {
    const status = await saveBin( {
      language: language,
      customUrl: customUrl,
      code: binData,
      expiryDate: expiryDate,
    } );

    console.log( status );

    switch ( status )
    {
      case 200:
        setSaveIcon( SaveIcons.saveSuccessIcon );
        setSaveState( SaveStates.success );
        window.location.pathname = customUrl;
        break;

      default:
        setSaveIcon( SaveIcons.saveFailureIcon );
        setSaveState( SaveStates.failure );
        setCustomUrlError( true );
        break;
    }

    console.log( saveState, customUrlError );

    setTimeout( () =>
    {
      setSaveIcon( SaveIcons.saveNeutralIcon );
      setSaveState( SaveStates.neutral );
    }, 1200 );
  }

  useEffect( () =>
  {
    const binUrl = window.location.pathname;

    async function checkBinUrl () 
    {
      if ( binUrl != '/' )
      {
        let bin: Bin = await getBin( binUrl );
        displayBin( bin );
      }

      else
      {
        return null;
      }
    };

    checkBinUrl();
  }, [] );

  return (
    <div className="App">

      <section className="header">
        <span className="site-name">hash.bin</span>
        < CustomUrlInput customUrlError={ customUrlError } customUrl={ customUrl } setCustomUrl={ setCustomUrl } setCustomUrlError={ setCustomUrlError } />

        <div className="btn-wrapper">
          <FontAwesomeIcon
            title="Save Bin"
            icon={ saveIcon }
            className={
              `save btn ${ saveState }`
            }
            onClick={ async () =>
            {
              await onSaveClick();
            } } />
          <FontAwesomeIcon
            title="New Bin"
            icon={ newBinIcon }
            className="new btn"
            onClick={ () =>
            {
              newBin();
            } }
          />
          <FontAwesomeIcon
            title="Set Expiry Time"
            icon={ expiryIcon }
            className="timer btn"
            onClick={ () =>
            {
              console.log( expiryDate );
            } }
          />
          <ExpiryMenu setExpiryDate={ setExpiryDate } />
        </div>
      </section>

      <Main binData={ binData } language={ language } setBinData={ setBinData } />

      <Footer />

    </div>
  );
}

export default App;