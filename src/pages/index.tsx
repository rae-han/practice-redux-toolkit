import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { wrapper } from '../app/store';
import { decrement, increment } from '../features/counter/counterSlice';

const Home: NextPage = () => {
  const { value: count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span> {count} </span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

// wrapper에 있는 getServerSideProps 메서드를 사용
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    store.dispatch(increment());


    return {
      props: {},
    };
  });

// export const getServerSideProps: GetServerSideProps = async () => {
//   store.dispatch(increment());
//   // 서버 단에서 action을 dispatch하여 store에 접근할 경우,
//   // hydration 과정에서 에러가 발생한다.
//   // 해결하려면 서버 단에서도 redux store를 생성해주고 client state와 같은 state를 갖도록 해야 한다.
//   // 이를 위해 next-redux-wrapper 를 설치하자.
//   // 그리고 store.ts를 수정한다.
//
//   return {
//     props: {},
//   };
// };

export default Home;
