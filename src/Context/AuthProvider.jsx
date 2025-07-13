import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../Hooks/useAxiosSecure';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const axiosSecure = useAxiosSecure()

    // Provider
    const provider = new GoogleAuthProvider();




    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // profile update
    const profileUpdate = (userDetails) => {

        return updateProfile(auth.currentUser, userDetails)
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

    const { data: posts, refetch } = useQuery({
        queryKey: ['my-posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user.email}`);
            return res.data
        }
    })


    const { data: userInfo = {} } = useQuery({
        queryKey: ['user-info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });


    // announcement
    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        },
    });

    // console.log(announcements.length)



    const authInfo = {
        user,
        setUser,
        setLoading,
        loading,
        setLoading2,
        loading2,
        createUser,
        profileUpdate,
        signIn,
        googleLogin,
        signOutUser,
        posts,
        refetch,
        userInfo,
        announcements
    }

    return (
        <AuthContext value={authInfo} >
            {children}
        </AuthContext >
    );
};

export default AuthProvider;