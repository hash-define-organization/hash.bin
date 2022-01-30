export function CustomUrlInput ( props: any )
{
  return <input
    className={ `custom-url ${ props.customUrlError ? "error" : "no-error" } ${ props.customUrl.length == 0 ? "inactive" : "active" }` }
    type="text"
    placeholder="Custom URL"
    value={ props.customUrl }
    spellCheck="false"
    onChange={ ( event ) =>
    {
      props.setCustomUrl( event.target.value );
      props.setCustomUrlError( false );
    } } />;
}
