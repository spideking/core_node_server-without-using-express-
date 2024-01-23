import EventEmitter from 'node:events';
import {
  listeningToHomeRoute,
  listeningToFriendRoutes,
  addingFriendToDataBases,
} from '../controllers/user.controller.js';

const userRouterEvent = new EventEmitter();

//! Router FOR home listner
userRouterEvent.on('/', listeningToHomeRoute);
userRouterEvent.on('/addFriends', addingFriendToDataBases);

//? Router for friend event
userRouterEvent.on('/friends', listeningToFriendRoutes);

export { userRouterEvent };
