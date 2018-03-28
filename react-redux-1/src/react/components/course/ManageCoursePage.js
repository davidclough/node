import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import toastr from "toastr";

import * as courseActions from "../../../redux/actions/courseActions";
// DC: The absolute path below can now be used as we have includes a "resolve" setting in WebPack ("modules in WP2").
// HOWEVER: These are more robust than relative paths but we now have the NASTY problem that ESLINT tells us there is a module path resolution error,
//// import * as courseActions from "redux/actions/courseActions";
// LATER: This worked untils added ManageCoursePage.test.js. There it seemed to confuse.

import CourseForm from "./CourseForm";
import {authorsFormattedForDropdown} from "../../selectors/selectors";

import { browserHistory } from "react-router";

// Now exporting the plain, unconnected-to-store component.
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      // He just uses local state, without redux, here. It is not necessary to use redux every time, this is only a very local thing.
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // DC: We make use of the componentWillReceiveProps event handler because the initial state of "course" is empty (because of 1s delay in mock API).
  //     We therefore need to ensure that, when the API call has finished, and the props change, we update this component's state.

  // Update state when props has changed.
  // TODO: See see if a component will update naturally when one of its props, rather than state, has changed.
  // https://facebook.github.io/react/docs/react-component.html
  componentWillReceiveProps(nextProps) {
    // This method runs when react THINKS props has changed. However, it may not have actually changed.
    if (this.props.course.id != nextProps.course.id) {
      // Need this if load the page directly rather than from a link in CoursesPage.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
    // OBSERVATION: His syntax above does not maintain the errors property.
  }

  // DC: Until we implemented onChange we could not even type changes into the text boxes or select authors.
  //     Even though they use ordinary <input>s underneath typing away at the keyboard resulted in nothing.
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }
  
  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }
  
  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    // saveCourse() in courseActions.js returns a thunk (via redux-thunk middleware) (and thunks utilise Promises, he said).
    this.props.actions.saveCourse(this.state.course)
                      .then(() => this.redirect())
                      .catch(error => {
                        toastr.error(error);
                        this.setState({saving: false});
                      });
  }

  // async/await version of saveCourse(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  // OBSERVATION: The eslint version we are using really does't like the line below.
  // async saveCourse(event) {
  //   event.preventDefault();

  //   this.setState({saving: true});
                      
  //   // OBSERVATION: Saving the file resulted in a black error in browser but OK after reloaded.
  //   try {
  //     await this.props.actions.saveCourse(this.state.course);
  //     this.redirect();
  //   } catch(error) {
  //     toastr.error(error);
  //     this.setState({saving: false});
  //   }
  // }

  // OBSERVATION: state seems to relate to component values, props is where the list of all authors for the dropdown is held.
  render() {
    return (
      <CourseForm course={this.state.course} allAuthors={this.props.authors} onChange={this.updateCourseState} onSave={this.saveCourse}
                  errors={this.state.errors} saving={this.state.saving} />
    );
  }
}

// He did a type and initially put PropTypes.
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// CONTEXT:
// An alternative way to do routing than importing from react-router (as in CoursesPage) is to use the "context" property that is passed
// into the Component's constructor. The ".contextTypes" is another "static property".
// HIM: Pull in the React Router context so router is available via this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object          // Not required.
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);

  //console.dir(course);        // Empty array is not found.
  return course ? course[0] : null;
}

// DC: It is in this function where we should transform the shape of data received from the store (in same from as received from API)
//     into a different shape. One example is authorsFormattedForDropdown.
// DC: ownProps is optional parameter that just gives immediate access to the props of this component.
// DC: react-router populates some routing-related props automatically based on the URL.
function mapStateToProps(state, ownProps) {
  let course = {id:"", watchHref:"", title:"", authorId:"", length:"", category:""};

  // ownProps provides access to our Component's props property.
  //console.dir(ownProps);
  //console.dir(this.props);      // this is this function here, not the Component.
  const courseId = ownProps.params.id;      // From the defined route "course/:id"  ****
  // course may be empty - we implemented a delay when fetching from API.
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }



  // DC: Does the job if course not found but dirty and unclean as it does not appear to redirect and end component lifecycle immediately.
  if (!course) {
    // DC: I think this failed because the context.router was not defined because the browser route was illegal.
    // this.context.router.push('/page-not-found');
    browserHistory.push("/page-not-found");
  }



  
  // OBSERVATION: So far, if we go to Manage Course via a link, the elements are populated.
  //              However, if we then refresh that page, course is populated but the elements are empty.
  // ANSWER: This is because, in the constructor, we set the state and its course property is assigned to this.props.course which,
  //         because of the delay we introduced??, is null. This is why we implemented the componentWillReceiveProps lifecycle method.

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Can also do this manually.
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// The connect function is provided by react-redux.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
