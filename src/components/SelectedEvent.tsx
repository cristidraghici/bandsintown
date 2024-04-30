import useGlobalContext from "@/hooks/useGlobalContext";
import formatEventDate from "@/utils/formatEventDate";

const SelectedEvent: React.FunctionComponent = () => {
  const { selectedEvent } = useGlobalContext();

  if (!selectedEvent) {
    return <div>No selected event</div>;
  }

  return (
    <article className="SelectedEvent">
      <section className="SelectedEvent__Event">
        <p>{formatEventDate(selectedEvent.datetime)}</p>
        <p>{selectedEvent.description}</p>
      </section>

      <section className="SelectedEvent__Venue">
        <h4>Venue</h4>
        <p>{selectedEvent.venue.name}</p>
        <p>{selectedEvent.venue.city}</p>
        <p>{selectedEvent.venue.region}</p>
        <p>{selectedEvent.venue.country}</p>
      </section>

      <section className="SelectedEvent__Offers">
        <h4>Offers</h4>
        {selectedEvent.offers.map((offer) => (
          <p key={offer.url}>
            {offer.type} - {offer.status} -{" "}
            <a href={offer.url} target="_blank">
              More info
            </a>
          </p>
        ))}
      </section>
    </article>
  );
};
export default SelectedEvent;
