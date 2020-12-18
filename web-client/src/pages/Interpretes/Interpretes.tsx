import React from 'react';
import '../Interpretes/interpretes.scss';
import { FiCalendar } from 'react-icons/fi';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import { RiMenu5Fill } from 'react-icons/ri';

// FAKE DATA
const interpretes = [
  {
    name: 'Julia Anne',
    note: 4,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl'],
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Julia Anne',
    note: 5,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    name: 'Julia Anne',
    note: 3,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    name: 'Julia Anne',
    note: 4,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl'],
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Julia Anne',
    note: 5,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    name: 'Julia Anne',
    note: 3,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    name: 'Julia Anne',
    note: 4,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl'],
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Julia Anne',
    note: 5,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    name: 'Julia Anne',
    note: 4,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl'],
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Julia Anne',
    note: 5,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    name: 'Julia Anne',
    note: 4,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl'],
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Julia Anne',
    note: 5,
    notices: 10,
    city: 'Orléans , France',
    langues: ['lsb', 'asl', 'bsl'],
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
];

const Interpretes = (): JSX.Element => (
  <section className="interpretesPage">
    <section className="interpretesFilter">
      <div className="interpretesFilter-searchblock">
        <div className="searchbar">
          <input type="text" placeholder="Search interpreter" />
        </div>
        <div className="filterbutton">
          <button>
            <RiMenu5Fill />
            Filters
          </button>
        </div>
      </div>

      <form className="interpretesFilter-filtersblock">
        <div className="rates">
          <label htmlFor="rates">Ratings</label>
          <input list="rates" name="All Rates" placeholder="All Rates" />
          <datalist id="rates">
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
          </datalist>
        </div>
        <div className="languages">
          <label htmlFor="languages">Languages</label>
          <input
            list="languages"
            name="LSF,ASl,BSL"
            placeholder="lSF, ASL, BSL"
          />
          <datalist id="languages">
            <option value="LSF" />
            <option value="ASL" />
            <option value="BSL" />
          </datalist>
        </div>
        <div className="Disponibility">
          <label htmlFor="disponibility">Disponibility</label>
          <button name="Date">
            Select Date And Time
            <FiCalendar />
          </button>
        </div>
      </form>
    </section>
    <section className="interpretes">
      <ul className="interpretes-grid">
        {interpretes.map((interprete, index) => {
          return (
            <li className="interpretes-cards" key={index}>
              <img
                className="interpretes-photo"
                src={interprete.photo}
                alt="interprete img"
              />
              <div className="interpretes-nameBlock">
                <h3 className="name">{interprete.name}</h3>
                <span className="calendar">
                  <FiCalendar />
                </span>
              </div>
              <div className="interpretes-noteBlock">
                <div className="note">
                  <Rater total={5} rating={interprete.note} />
                </div>
                <p className="notices">{interprete.notices}</p>
              </div>
              <p className="interpretes-city">{interprete.city}</p>
              <p className="interpretes-language">{interprete.langues}</p>
            </li>
          );
        })}
      </ul>
    </section>
  </section>
);

export default Interpretes;
