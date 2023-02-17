import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import counterReducer from '../features/counter/counterSlice';


const reducer = (state: any, action: PayloadAction<any>) => {
  // hydration이 발생했을 때 처리하는 부분을 별도로 작성
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    counter: counterReducer,
  })(state, action);
};


const makeStore = () =>
  configureStore({
    reducer,
  });


const store = makeStore;
// const store = makeStore(); // 이렇게 하면 두개 생김
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// wrapper 생성
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;