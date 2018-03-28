import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about-page.css';

// DC: https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
const Fragment = React.Fragment;

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    // DC: No point a class within a Fragment as the tag is not rendered on the page.
    //     Also key and children are the only valid props for a Fragment component.
    <Fragment>
      <div>
        <h2 className="alt-header">About</h2>
        <p>
          This example app is part of the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot
          starter kit</a>.
        </p>
        <p>
          <Link to="/badlink">Click this bad link</Link> to see the 404 page.
        </p>
      </div>
      {/* DC: BrowserSync tests. Had problems with state not being updated so trying vanilla HTML form items.
              In https://www.youtube.com/watch?v=W02aj4ZYUro I noticed that the javascript-driven error indicator did not show in the synced browsers
              when the text updated. */}
      <form id="myForm">
        <p>
          {/* OBSERVATION: This updated OK when changed within Firefox although had to change twice when switching brower.
                           No syncing was performed when changed within Chrome. */}
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </p>
        <p>
          {/* OBSERVATION: These are synced perfectly by BrowserSync. */}
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" value="male" /><br />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" value="female" /><br />
          <label htmlFor="other">Other</label>
          <input type="radio" id="other" value="other" />
        </p>
        <p className="about-text-boxes">
          {/* OBSERVATION: These VANILLA TEXT BOXES are also synced perfectly by BrowserSync.
                           The ones on the DemoApp page had problems. I think now that this is because BrowserSync changes the text OK but
                           does not trigger the javascript necessary to update the react state.
                           That would explain why the text updated OK when change in another browser but then reverted to its previous value. */}
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" /><br />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" /><br />
          <label htmlFor="town">Town:</label>
          <input type="text" id="town" />
        </p>
      </form>
    </Fragment>
  );
};

export default AboutPage;
