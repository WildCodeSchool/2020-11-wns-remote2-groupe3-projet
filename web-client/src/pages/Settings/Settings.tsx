import React, { Fragment } from 'react';
import '../Settings/settings.scss';

const profil = [
  {
    firstname: 'helena',
    lastname: 'thomassin',
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    firstname: 'lou',
    lastname: 'bassard',
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
];
const Profil = (): JSX.Element => {
  return (
    <>
      <section className="profilPage">
        <form className="profil">
          <div className="profil-photo-block">
            <img
              className="photo"
              src="https://randomuser.me/api/portraits/women/43.jpg"
              alt="profil img"
            />
            <div className="user">
              <h1>THOMASSIN Hélèna /</h1>
            </div>
          </div>
          <div className="profil-menu-block">
            <ul className="menu">
              <li className="menu-item">Edit Profile</li>
              <li className="menu-item">Password</li>
              <li className="menu-item">Email Notifications</li>
            </ul>
            <img
              className="menu-photo"
              src="https://randomuser.me/api/portraits/women/43.jpg"
              alt="profil img"
            />
            <div className="menu-buttons">
              <button className="menu-upload"> Upload </button>
              <button className="menu-delete"> Delete </button>
            </div>
          </div>
          <div className="name-block">
            <div className="firstname">
              <label htmlFor="label-firstname">Firstname</label>
              <input className="input-firstname" type="text" />
            </div>
            <div className="lastname">
              <label htmlFor="label-lastname">Lastname</label>
              <input className="input-lastname" type="text" />
            </div>
          </div>
          <div className="username">
            <label htmlFor="label-username">Username</label>
            <input className="input-username" type="text" />
          </div>
          <div className="email">
            <label htmlFor="label-email">Email</label>
            <input className="input-mail" type="text" />
          </div>
          <div className="languages">
            <label htmlFor="languages">Languages</label>
            <input
              className="input-languages"
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
          <div className="button-save">
            <button className="save">Save</button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Profil;
