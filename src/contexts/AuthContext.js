import React, { useContext, useState, useEffect } from "react"
import {auth, db} from "../api/firebase"
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, updateEmail,
signInWithPopup, FacebookAuthProvider, GoogleAuthProvider} from "firebase/auth";
import { doc, setDoc, onSnapshot  } from "firebase/firestore";


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const [favourites, setFavourites] = useState({});

    useEffect(() => {
        if (currentUser){
            const unsubscribe = onSnapshot(doc(db, "favourites", currentUser.uid), (doc) => {
                setFavourites(doc.data())
            });

            //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
            return () => unsubscribe()
        }else {
            return setFavourites([])
        }
    }, [currentUser]);

    function signup(email, password, username) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function loginPopup(providerName = "google", email, password) {
        const provider = providerName === "facebook" ? new FacebookAuthProvider() : new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function changeEmail(email) {
        return updateEmail(currentUser, email)
    }

    function changePassword(password) {
        return updatePassword(currentUser, password)
    }

    function setDefault(username, photoUrl = "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-1.jpg") {
        return updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: photoUrl
        })
    }

    async function getFavouriteAnimes() {
        return favourites;
    }

    async function addFavouriteAnime(id, animeName, coverUrl, genres, year) {
        const docRef = doc(db, "favourites", currentUser.uid);
        setFavourites({
            ...favourites,
            [id]: {
                animeName,
                coverUrl,
                genres,
                year
            }
        })
        await setDoc(docRef, {
            [id]: {
                animeName,
                coverUrl,
                genres,
                year
            }
        }, {merge: true});
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        changeEmail,
        changePassword,
        setDefault,
        loginPopup,
        addFavouriteAnime,
        getFavouriteAnimes,
        favourites
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}