import uuid from 'uuid/v1';
import moment from 'moment';
import firebase from '../../firebase';
import * as types from './actionTypes';
// import { setLoading as defaultLoading } from '../loading/actions';
import { store } from '../index';

const db = firebase.firestore();

const setChats = chats => ({
  type: types.SET_CHATS,
  chats
});

const setUsers = users => ({
  type: types.SET_USERS,
  users
});

export const setActiveChat = active => ({
  type: types.SET_ACTIVE,
  active
});

export const listenerChats = () => dispatch => {
  const user = store.getState().user;
  db.collection('chats').where('owner', '==', user.uid).onSnapshot(snap => {
    const chats = snap.docs.map(chat => chat.data());
    db.collection('chats').where('secondary', '==', user.uid).get()
      .then(snapChats => {
        const chats2 = snapChats.docs.map(chat => chat.data());
        const mergedChats = [...chats, ...chats2].sort((a, b) => {
          const dateA = moment(a.messages[a.messages.length - 1].created).format();
          const dateB = moment(b.messages[b.messages.length - 1].created).format();
          return dateA.diff(dateB) > 0 ? -1 : 1;
        });
        dispatch(setChats(mergedChats));
        db.collection('users').get()
          .then(snapUsers => {
            const users = snapUsers.docs.map(user => user.data());
            dispatch(
              setUsers(
                users.filter(
                  userItem => userItem.uid !== user.uid && !mergedChats.find(chat => chat.owner === userItem.uid || chat.secondary === userItem.uid)
                )
              )
            );
          })
      })
      .catch(error => {
        console.log('store chats error', error);
      });
  });

  db.collection('chats').where('secondary', '==', user.uid).onSnapshot(snap => {
    const chats = snap.docs.map(chat => chat.data());
    db.collection('chats').where('owner', '==', user.uid).get()
      .then(snapChats => {
        const chats2 = snapChats.docs.map(chat => chat.data());
        const mergedChats = [...chats, ...chats2].sort((a, b) => {
          const dateA = moment(a.messages[a.messages.length - 1].created).format();
          const dateB = moment(b.messages[b.messages.length - 1].created).format();
          return dateA.diff(dateB) > 0 ? -1 : 1;
        });
        dispatch(setChats(mergedChats));
        db.collection('users').get()
          .then(snapUsers => {
            const users = snapUsers.docs.map(user => user.data());
            dispatch(
              setUsers(
                users.filter(
                  userItem => userItem.uid !== user.uid && !mergedChats.find(chat => chat.owner === userItem.uid || chat.secondary === userItem.uid)
                )
              )
            );
          })
      })
      .catch(error => {
        console.log('store chats error', error);
      });
  });
}

export const sendMessage = (msg, chatContainer) => dispatch => {
  const activeChat = store.getState().chat.active;
  const user = store.getState().user;
  if (!activeChat.uid) {
    const uid = uuid();
    const messages = [{
      msg,
      user,
      created: moment().format()
    }];
    db.collection('chats').doc(uid).set({
      ...activeChat,
      messages,
      uid
    })
    .then(() => {
      dispatch(setActiveChat({
        ...activeChat,
        messages,
        uid
      }));
    })
    .catch(error => console.log('create chat error', error))
    .then(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
  } else {
    const messages = [
      ...activeChat.messages,
      {
        msg,
        user,
        created: moment().format()
      }
    ];
    db.collection('chats').doc(activeChat.uid).set({
      messages
    }, { merge: true })
    .then(() => {
      dispatch(setActiveChat({
        ...activeChat,
        messages
      }));
    })
    .catch(error => console.log('send msg error', error))
    .then(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
  }
}