import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { increment, decrement } from './redux/actions/counter';

class App extends React.Component {
  render() {
    const { dispatch, counter } = this.props;
    const { valorAtual } = counter;
  
    return (
      <div className="container">
        <p className="counter">{ valorAtual }</p>
        <button className="btn btn-increment" onClick={() => dispatch(increment())}>
          +
        </button>
        <button className="btn btn-decrement" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(App);
