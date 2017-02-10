import Firebase from 'firebase';
import Firedux from 'firedux';

const config = {
  apiKey: "AIzaSyCCYaZZ623P_pQu276vuGf761kZk_EhOBI",
  authDomain: "todo-85f3f.firebaseapp.com",
  databaseURL: "http://todo-85f3f.firebaseio.com",
  storageBucket: "todo-85f3f.appspot.com",
  messagingSenderId: "1034314432668"
};

var app = Firebase.initializeApp(config);

var ref = app.database().ref();

const newFireduxInstance = new Firedux({ ref });

export const setDispatch = (dispatchFromStore) => {
  newFireduxInstance.dispatch = dispatchFromStore;
}

export default newFireduxInstance;
