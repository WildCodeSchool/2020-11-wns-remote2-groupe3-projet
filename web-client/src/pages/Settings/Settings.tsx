import React, { Fragment, useState } from 'react';
import '../Settings/settings.scss';

const Profil = (): JSX.Element => {
  const [
    togglePasswordInputsVisibility,
    setTogglePasswordInputsVisibility,
  ] = useState(false);
  const profilMenu = ['Edit Profile'];

  const toggleInputs = () => {
    setTogglePasswordInputsVisibility(!togglePasswordInputsVisibility);
  };

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
              {profilMenu.map((item, index) => (
                <li className="menu-item" key={index}>
                  {item}
                </li>
              ))}
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
          <div className="password-inputs-block">
            {togglePasswordInputsVisibility ? (
              <div className="password-inputs-block-wrapper">
                <div className="password-blocks">
                  <div className="password">
                    <label htmlFor="label-password">Password</label>
                    <input
                      className="input-password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="password">
                    <label htmlFor="label-new-password">
                      Enter new password
                    </label>
                    <input
                      className="input-password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="password">
                    <label htmlFor="label-confirm-password">
                      Confirm new password
                    </label>
                    <input
                      className="input-password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <div className="password-button-cancel">
                  <button className="button-cancel" onClick={toggleInputs}>
                    X
                  </button>
                </div>
              </div>
            ) : (
              <div className="password-inputs-block-wrapper">
                <button
                  className="toggle-inputs-password"
                  onClick={toggleInputs}
                >
                  Edit password
                </button>
              </div>
            )}
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
