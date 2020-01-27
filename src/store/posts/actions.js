import uuid from 'uuid/v1';
import moment from 'moment';
import firebase from '../../firebase';
import * as types from './actionTypes';
// import { setLoading as defaultLoading } from '../loading/actions';
import { store } from '../index';

const db = firebase.firestore();

const storePosts = posts => ({
  type: types.STORE_POSTS,
  posts: posts.sort((a, b) => {
    const dateA = moment(a.created);
    const dateB = moment(b.created);
    return dateA.diff(dateB) > 0 ? -1 : 1;
  }),
  loading: false
});

const isRelease = release => ({
  type: types.RELEASE_POSTS,
  release
});

const setLoading = postsLoading => ({
  type: types.LOADING_POSTS,
  postsLoading
});

export const listenerNewPosts = () => dispatch => {
  let firstLoad = true;
  db.collection('posts').onSnapshot(snap => {
    const posts = store.getState().posts.list.length;
    if (snap.size > posts && !firstLoad) {
      setTimeout(() => dispatch(isRelease(snap.size - posts)));
    } else if (firstLoad) {
      firstLoad = false;
    }
  });
}

export const getPosts = () => dispatch => {
  dispatch(setLoading(true));
  dispatch(isRelease(0));
  db.collection('posts').get()
    .then(data => {
      const posts = data.docs.map(doc => doc.data());
      dispatch(storePosts(posts));
    })
    .catch(error => {
      console.log('get posts error', error);
    })
    .then(() => {
      dispatch(setLoading(false));
    })
}

export const uploadPost = file => dispatch => {
  dispatch(setLoading(true));
  const fileUid = uuid();
  const { user } = store.getState();
  let extension = file.name.split('.');
  extension = extension[extension.length - 1];
  const storage = firebase.storage().ref().child(`${user.uid}/${fileUid}.${extension}`);
  storage.put(file)
    .then(snap => {
      const img = `https://firebasestorage.googleapis.com/v0/b/${snap.metadata.bucket}/o/${encodeURIComponent(snap.metadata.fullPath)}?alt=media`;
      db.collection('posts').doc(fileUid).set({
        user,
        img,
        uid: fileUid,
        created: moment().format()
      })
        .then(() => {
          dispatch(getPosts());
        })
        .catch(error => {
          console.log('create post error', error);
        })
    })
    .catch(error => {
      console.log('error upload img', error);
    })
    .then(() => {
      dispatch(setLoading(false));
    })
}