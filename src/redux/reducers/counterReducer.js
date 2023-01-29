import { INCREMENT, DECREMENT } from '../actions/counter';

const counterReducer = (state = { valorAtual: 0 }, action) => {
  switch (action.type) {
  case INCREMENT:
    return { valorAtual: state.valorAtual + 1 };
  case DECREMENT:
    return { valorAtual: state.valorAtual - 1 };
  default:
    return state;
  }
};

export default counterReducer;
