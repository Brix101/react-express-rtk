import { useAppDispatch, useAppSelector } from './app/store';
import { Button } from './components/ui/button';
import {
  useRefreshTokenQuery,
  useSignInMutation,
} from './features/auth/authApi';
import { increment } from './features/counter/counterSlice';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useRefreshTokenQuery();

  const user = useAppSelector((state) => state.auth.user);

  const [signIn] = useSignInMutation();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">{JSON.stringify(user)}</p>
      <Button
        onClick={() =>
          signIn({
            email: 'John.doe12@example.com',
            password: 'password',
          })
        }
      >
        SignIn
      </Button>
    </>
  );
}

export default App;
