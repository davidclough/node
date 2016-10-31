import React, { PropTypes } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../actions/courseActions";

class CoursesPage extends React.Component {
  // When added Course.
  constructor(props, context) {
    super(props, context);

    this.state = {
      //courses: { title: "" }
      course: { title: "" }
    };
    //console.log(this.state);

    // DC: In ES5 the functions will be bound to the component. In this ES6 class the functions are
    //     not being automatically bound to the class. In the usages further down "this" will be bound to the <input>s.
    // Good for performance to do these binds here rather than in the <input>s.
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    // *** course is undefined at the moment.     BECAUSE had set the property as "courses" above.
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    ////alert(`Saving ${this.state.course.title}`);

    // With this we only called "connect" at the bottom with one parameter.
    // He is showing us the ugly way first.
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, index) {
    // DC: The key does not seem to appear in the output.
    return <div key={index}>{course.title}</div>;
  }

  render() {
    debugger;
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}

//export default CoursesPage;

// Static member...
CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

// Now we want a Component that can interact with redux. Both "map"s are functions.
function mapStateToProps(state, ownProps) {
  debugger;
  return {
    courses: state.courses          // CourseReducer - see file (he named it that for distinguishability of tabs).
  };
}

function mapDispatchToProps() {
}

//export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// When omit second parameter, the Component gets a dispatch() property attached to it (to this.props).
export default connect(mapStateToProps)(CoursesPage);
