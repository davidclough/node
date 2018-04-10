import React from 'react';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);

    // Yes, you can have multiple refs.
    for (let sv of Object.getOwnPropertyNames(this.state)) {
      this[sv + 'Ref'] = React.createRef();
    }
    this.setInitialFocus = this.setInitialFocus.bind(this);
  }

  // OBSERVATION: He has not used a constructor to set this.
  state = this.getEmptyState();

  //getEmptyState = () => {       // OBSERVATION: This syntax only worked when declared method BEFORE the "state = " line.
  getEmptyState() {
    return {firstName: 'dog', lastName: '', userName: '', email: '', password: ''};
  }

  setInitialFocus() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.userNameRef.current.focus();
  }

  componentDidMount(prevProps, prevState, snapshot) {
    this.setInitialFocus();
  }

  change = e => {
    ////this.setState({
    ////  [e.target.name]: e.target.value
    ////});

    // setState is "ASYNCHRONOUS"W". It does not update straight away. THIS COMPONENT will only rerender once state has changed, hence will see updated text box text.
    // https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b
    // NOTE: It is "asynchronous" so that multiple calls to setState() do not trigger a component update for each call - React will also try to batch multiple calls.
    //       It is not quite async, it may be more like debounced or queued.
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(this.state);
    //this.props.onChange(this.state);

    // HACK: Just to make work for moment. IN REALITY we don't want to be passing our state back to parent, we want to give it enough info to update its own state.
    ////this.props.onChange(Object.assign({}, this.state, {[e.target.name]: e.target.value}));

    // We can replace the //// lines with this call which accepts a callback. It still doesn't seem like the best of ideas to send the whole state without good reason.
    // NOTE: There are also alternatives for the first parameter: (prevState, props) => { }
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.onChange(this.state);
    });
  };

  onSubmit(e) {
    e.preventDefault();   // Without this you see the submitted form values in the query string.
    this.setState(this.getEmptyState());
    //this.props.onChange(this.state);
  }

  render() {
    let textInputs = [];
    for (let sv of Object.getOwnPropertyNames(this.state)) {
      textInputs.push(
        <p key={sv}>
          <input name={sv} placeholder={sv} value={this.state[sv]} onChange={e => this.change(e)}
                 type={sv === 'password' ? 'password' : 'text'} ref={this[sv + 'Ref']} />
        </p>
      );
    }

    return (
      <form>
        {textInputs}
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
