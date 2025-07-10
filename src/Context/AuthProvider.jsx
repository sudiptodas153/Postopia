import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../Hooks/useAxiosSecure';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

    // Provider
    const provider = new GoogleAuthProvider();




    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // SignIn
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    // google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    // SignOut
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // OnAuthChange

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])


    // All-Post

    const { data: posts } = useQuery({
        queryKey: ['my-posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user.email}`);
            return res.data
        }
    })


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        signOutUser,
        posts,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;