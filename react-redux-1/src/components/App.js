// This component handles the App template on every page.
import React, { PropTypes } from "react";
import Header from "./common/Header";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} />
        {this.props.children}
      </div>
    );
  }
}

// DC: Not sure why this is declared externally rather than within the class at moment.
//     Some sort of validator ensuring that "children" has been set.
App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// OBSERVATION: He doesn't call "connect()" with a reference to this function in the export (as in coursesPage).
// LATER:       He didn't at first but then he added it.
function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
