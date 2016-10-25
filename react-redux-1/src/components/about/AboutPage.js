import React from "react";

// NOTE: He used a class component, even though he should technically be able to use a stateless component, to overcome
//       a problem with stateless at the top of the component hierarchies currently have with hot reloading.
class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
      </div>
    );
  }
}

export default AboutPage;
