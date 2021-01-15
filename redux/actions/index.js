import firebase from 'firebase'
import 'firebase/firestore'
import { USER_STATE_CHANGE } from '../constants/index'

export function fetchUser(){
    return( (dispatch)=> {
        firebase.firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then( (snapshot)=> {
            if(snapshot.exists){
                // console.log(snapshot.data())
                dispatch({currentUser: snapshot.date()})
            }
            else{
                console.log('does not exist')
            }

        })
    })
}