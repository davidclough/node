import React, {PropTypes} from 'react';

class LoadingDots extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {frame:1};
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
      this.interval = setInterval(() => {
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  // DC: I added this,
  //       (1) because I wondered how the timer would be cleared, and then
  //       (2) after having saved a new course, we got a constantly repeated error somewhere around where we set the state above.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while(dots > 0) {
      text += '.';
      dots--;
    }

    // DC: I am not convinced the {...this.props} achieves anything (it wasn't his code, he pinched it from someone else).
    return <span {...this.props}>{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300,
  dots: 3
};

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default LoadingDots;
