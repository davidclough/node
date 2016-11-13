import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";
import { browserHistory } from "react-router";

class CoursesPage extends React.Component {
  // When added Course.
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    // DC: The key does not seem to appear in the output.
    //     He said key is needed when iterating.
    return <div key={index}>{course.title}</div>;
  }

  // He says, "Could use arrow function. However, standard function is better for performance best practice."
  redirectToAddCoursePage() {
    browserHistory.push("/course");
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses} />
      </div>
    );
  }
}

//export default CoursesPage;

// Static member...
// DC: Need to add things in here to avoid "... is missing in props validation".
CoursesPage.propTypes = {
  // Once defined mapDispatchToProps, dispatch is no longer injected. OK because dispatch is supplied to mapDispatchToProps.
  //dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  ////createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
// DC: This means we DO have some "type specification".

//
// Redux related functions.
//

// Now we want a Component that can interact with redux. Both "map"s are functions.
function mapStateToProps(state, ownProps) {
  return {
    // DC: This give the component the "this.props.courses" property.
    courses: state.courses          // CourseReducer - see file (he named the file that for distinguishability of tabs).
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Manual mapping:
    ////createCourse: course => dispatch(courseActions.createCourse(course))
    // actions are "dispatch"ed.

    // Now using a redux helper function. All actions in courseActions now bound in one go.
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// These names used in redux docs but could use different ones.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// DC: He used this inferior way first (no mapDispatchToProps parameter).
// When omit second parameter, the Component gets a dispatch() property attached to it (to this.props).
////export default connect(mapStateToProps)(CoursesPage);
