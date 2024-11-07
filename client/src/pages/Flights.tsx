import './Home.css';

const Flights = () => (
<section className="search-section">
<input type="text" placeholder="Flying From" />
<input type="text" placeholder="To" />
<input type="date" placeholder="Departing" />
<input type="date" placeholder="Returning" />
<input type="number" placeholder="Adults" />
<button onClick={() => console.log("Searching Flights...")}>Search</button>

</section>
)

export default Flights;