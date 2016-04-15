import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {MosaicBinder, keysInit, keysReducer, activeKeyBinder} from '../src';


const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.info('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}), applyMiddleware(logger));

keysInit({store: store});

const PureMosaic = ({selectedKeyId}) => {
  return (
    <MosaicBinder
      binderId="mosaic-1"
      onEnter={onEnter}
    >
      <ul>
        <li id="1" className={selectedKeyId === '1' ? 'selected' : ''}>#1</li>
        <li id="2" className={selectedKeyId === '2' ? 'selected' : ''}>#2</li>
        <li id="3" className={selectedKeyId === '3' ? 'selected' : ''}>#3</li>
        <li id="4" className={selectedKeyId === '4' ? 'selected' : ''}>#4</li>
        <li id="5" className={selectedKeyId === '5' ? 'selected' : ''}>#5</li>
        <li id="6" className={selectedKeyId === '6' ? 'selected' : ''}>#6</li>
        <li id="7" className={selectedKeyId === '7' ? 'selected' : ''}>#7</li>
        <li id="8" className={selectedKeyId === '8' ? 'selected' : ''}>#8</li>
        <li id="9" className={selectedKeyId === '9' ? 'selected' : ''}>#9</li>
        <li id="10" className={selectedKeyId === '10' ? 'selected' : ''}>#10</li>
        <li id="11" className={selectedKeyId === '11' ? 'selected' : ''}>#11</li>
        <li id="12" className={selectedKeyId === '12' ? 'selected' : ''}>#12</li>
      </ul>
    </MosaicBinder>
  );
};

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(state => state['@@keys'])(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <div>
    <Mosaic/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('mosaic-1');

