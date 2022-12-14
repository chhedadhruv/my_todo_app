import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider 
        value={{
            user,
            setUser,
            login: async (email, password) => {
                try {
                    await auth().signInWithEmailAndPassword(email, password);
                } catch (error) {
                    console.log(error);
                }
            },
            googleLogin: async () => {
                try {
                    // Get the users ID token
                    const { idToken } = await GoogleSignin.signIn();

                    // Create a Google credential with the token
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                    // Sign-in the user with the credential
                    await auth().signInWithCredential(googleCredential);
                    } catch (error) {
                    console.log(error);
                }
            },
            // fbLogin: async () => {
            //     try {
            //         // Attempt login with permissions
            //         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            //         if (result.isCancelled) {
            //         throw 'User cancelled the login process';
            //         }

            //         // Once signed in, get the users AccesToken
            //         const data = await AccessToken.getCurrentAccessToken();

            //         if (!data) {
            //         throw 'Something went wrong obtaining access token';
            //         }

            //         // Create a Firebase credential with the AccessToken
            //         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            //         // Sign-in the user with the credential
            //         await auth().signInWithCredential(facebookCredential);
            //         register: async (email, password) => {
            //         try {
            //         await auth().createUserWithEmailAndPassword(email, password);
            //         } catch (error) {
            //         console.log(error);
            //         }
            //         }
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
            register: async (email, password) => {
                try {
                    await auth().createUserWithEmailAndPassword(email, password);
                } catch (error) {
                    console.log(error);
                }
            },
                    logout: async () => {
                try {
                    await auth().signOut();
                } catch (error) {
                    console.log(error);
                }
            },
            forgotPassword: async (email) => {
                try {
                    await auth().sendPasswordResetEmail(email)
                    .then(() => {
                        alert('Password reset email sent. If not found check the spam folder.');
                    }
                    )
                    }
                 catch (error) {
                    console.log(error);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}
// export default AuthProvider;