// This component handles the App template on every page.
import React, { PropTypes } from "react";
import Header from "./common/Header";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

// DC: Not sure why this is declared externally rather than within the class at moment.
//     Some sort of validator ensuring that "children" has been set.
App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;