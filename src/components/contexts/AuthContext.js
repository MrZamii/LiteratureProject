import React, { createContext, lazy, Suspense } from 'react';
import { firebase } from '../../firebase.config';
import { default as firebaseOriginal } from 'firebase';
const Loader = lazy(() => import('../Loader'));
const Context = createContext({
  isLoggedIn: null,
  isLoading: false,
  user: {
    displayName: '',
    image: '',
    email: '',
  },
  signInWithGoogle() {},
});
class Provider extends React.Component {
  providers = {
    google: new firebaseOriginal.auth.GoogleAuthProvider(),
  };
  constructor(props) {
    super(props);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signOut = this.signOut.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }
  state = {
    isLoggedIn: null,
    isLoading: false,
    user: {
      displayName: '',
      image: '',
      email: '',
    },
    listener: null,
  };
  setLoading(value) {
    this.setState({ isLoading: value });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(usr =>
      this.setState({
        isLoggedIn: usr !== null,
        ...(usr !== null
          ? {
              user: {
                displayName: usr.displayName,
                image: usr.photoURL,
                email: usr.email,
              },
            }
          : {}),
      })
    );
  }
  async signOut() {
    await firebase.auth().signOut();
  }
  async signInWithGoogle() {
    this.setState({ isLoading: true });
    console.log(1);
    try {
      const { google } = this.providers;
      const { result } = await firebase.auth().signInWithPopup(google);
      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
      console.log(e);
    }
  }
  render() {
    const {
      signInWithGoogle,
      signOut,
      setLoading,
      state: { isLoggedIn, isLoading },
    } = this;
    const { children } = this.props;
    const store = {
      ...this.state,
      signInWithGoogle,
      signOut,
      setLoading,
    };
    return (
      <Context.Provider value={store}>
        {isLoggedIn === null || isLoading ? (
          <Suspense fallback={<></>}>
            <Loader isLoading={true} />
          </Suspense>
        ) : (
          children
        )}
      </Context.Provider>
    );
  }
}

export { Provider, Context };
