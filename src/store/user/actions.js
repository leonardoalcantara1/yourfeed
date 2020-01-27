import firebaseSDK from 'firebase';
import firebase from '../../firebase';
import * as types from './actionTypes';
import { listenerChats } from '../chat/actions';
import { setLoading } from '../loading/actions';
import { store } from '../index';

const auth = firebase.auth();
const db = firebase.firestore();

const setUser = user => ({
  type: types.SET_USER,
  user,
  loading: false
});

export const listenerLogin = () => dispatch => {
  dispatch(setLoading(true));
  auth.onAuthStateChanged(fbUser => {
    if (!fbUser) {
      dispatch(setUser(null));
    } else {
      const {
        uid,
        displayName,
        photoURL='',
        email,
        phoneNumber=''
      } = fbUser;
      const user = {
        uid,
        displayName,
        photoURL,
        email,
        phoneNumber
      };
      db.collection('users').doc(user.uid).set(user, { merge: true })
        .then(() => {
          db.collection('users').doc(user.uid).get()
            .then(doc => {
              dispatch(setUser(doc.data()));
              setTimeout(() => dispatch(listenerChats()));
            })
            .catch(error => {
              console.log('get user info', error);
            })
        })
        .catch(error => {
          console.log('update user info', error);
        })
    }
  });

  auth.getRedirectResult().then(result => {
    dispatch(setUser(result.user));
  }).catch(error => {
    console.log('error get redirect user', error)
  });
}

export const login = () => dispatch => {
  dispatch(setLoading(true));
  const provider = new firebaseSDK.auth.GoogleAuthProvider();
  auth.signInWithRedirect(provider)
    .catch(error => {
      const { errorCode, errorMessage } = error;
      console.log('error', errorCode, errorMessage);
    })
    .then(() => dispatch(setLoading(false)));
}

export const registerFeedName = feedname => async dispatch => {
  dispatch(setLoading(true));
  const { user } = store.getState();
  if (user.uid) {
    await db.collection('feednames').doc(feedname).set({ uid: user.uid })
      .then(async () => {
        await db.collection('users').doc(user.uid).set({ feedname }, { merge: true })
          .then(async () => {
            await db.collection('users').doc(user.uid).get()
              .then(doc => dispatch(setUser(doc.data())))
              .catch(error => {
                console.log('get user after set feedname error', error);
              })
          })
          .catch(error => {
            console.log('set feedname user collection', error);
          })
      })
      .catch(error => {
        console.log('set feedname error', error);
      })
      .then(() => {
        dispatch(setLoading(false));
      })
  }
}

export const validateFeedName = (feedname, cb) => async () => {
  if (!feedname) {
    cb(null);
  } else {
    await db.collection('feednames').doc(feedname).get()
      .then(doc => {
        cb(!doc.exists);
      })
      .catch(error => {
        console.log('verify feedname error', error);
      })
  }
}