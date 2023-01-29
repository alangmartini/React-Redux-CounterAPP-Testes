import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { rootReducer } from '../redux/store';
import '@testing-library/jest-dom';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(rootReducer, initialState),
  } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
});

test(
  'Se o estado inicial é 0, se existem dois botões e se existe um display com "0"',
  () => {
    const { store } = renderWithRedux(<App />);

    const botaoMais = screen.getByText('+');
    expect(botaoMais).toBeInTheDocument();

    const botaoMenos = screen.getByText('-');
    expect(botaoMenos).toBeInTheDocument();

    const display = screen.getByText('0');
    expect(display).toBeInTheDocument();

    expect(store.getState().counter.valorAtual).toEqual(0);
  },
);

test(
  'Se ao clickar o display altera corretamente, assim como o estado global',
  () => {
    const { store } = renderWithRedux(<App />);

    const botaoMais = screen.getByText('+');
    const botaoMenos = screen.getByText('-');
    const display = screen.getByText('0');

    userEvent.click(botaoMais);
    expect(display).toHaveTextContent('1');
    expect(store.getState().counter.valorAtual).toEqual(1);

    userEvent.click(botaoMenos);
    expect(display).toHaveTextContent('0');
    expect(store.getState().counter.valorAtual).toEqual(0);
  },
);

test(
  'Se quando o valor for 99, atualiza corretamente para o 100',
  () => {
    const INITIAL_STATE = { counter: { valorAtual: 99 } };
    const { store } = renderWithRedux(<App />, { initialState: INITIAL_STATE });

    const botaoMais = screen.getByText('+');
    const botaoMenos = screen.getByText('-');
    const display = screen.getByText('99');

    const NOVENTA_E_NOVE = 99;
    expect(store.getState().counter.valorAtual).toEqual(NOVENTA_E_NOVE);

    userEvent.click(botaoMais);
    expect(display).toHaveTextContent('100');
    expect(store.getState().counter.valorAtual).toEqual(100);

    userEvent.click(botaoMenos);
    expect(display).toHaveTextContent('99');
    expect(store.getState().counter.valorAtual).toEqual(NOVENTA_E_NOVE);
  },
);

test(
  'Se ao clickar 101 vezes quando o valor é 100, o display mostra -1',
  () => {
    const INITIAL_STATE = { counter: { valorAtual: 100 } };
    const { store } = renderWithRedux(<App />, { initialState: INITIAL_STATE });

    const botaoMenos = screen.getByText('-');
    const display = screen.getByText('100');

    const NOVENTA_E_NOVE = 99;
    const CENTO_E_UM = 101;
    const arrayCom101Elementos = Array.from(Array(CENTO_E_UM));

    arrayCom101Elementos.forEach((__, index) => {
      userEvent.click(botaoMenos);
      expect(display).toHaveTextContent(`${NOVENTA_E_NOVE - index}`);
      expect(store.getState().counter.valorAtual).toEqual(NOVENTA_E_NOVE - index);
    });

    const MENOS_UM = -1;
    expect(display).toHaveTextContent('-1');
    expect(store.getState().counter.valorAtual).toEqual(MENOS_UM);
  },
);
