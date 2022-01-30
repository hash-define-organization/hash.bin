export function ExpiryMenu ( props: any )
{
  const ExpiryTimes = [ "15 minutes", "30 minutes", "1 hour", "6 hours", "1 day", "Never" ];

  return (
    // <div className="expiry-menu-overlay">
    <div className="expiry-menu">
      <span>Expire After</span>
      <ul>
        { ExpiryTimes.map(
          ( time: string ) =>
          {
            return <li title={`Expire After ${time}`} onClick={ () => { props.setExpiryDate( time ); } }>{ time }</li>;
          }
        ) }
      </ul>
    </div>
    // </div>
  );
}
