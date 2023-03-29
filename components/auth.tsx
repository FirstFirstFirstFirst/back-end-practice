import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuth from "../hooks/useAuth";
import Image from 'next/image'


const Auth = () => {


   const { isLoggedIn, user } = useAuth();


   const handleAuth = async () => {
       const provider = new GoogleAuthProvider();
       signInWithPopup(auth, provider)
           .then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const credential = GoogleAuthProvider.credentialFromResult(result);
               const token = credential?.accessToken;
               // The signed-in user info.
               const user = result.user;
               console.log("User: ", user)
               console.log("User: ", user.providerData[0].photoURL)
           })
           .catch((error) => {
               // Handle Errors here.
               const errorCode = error.code;
               const errorMessage = error.message;
               // The email of the user's account used.
               const email = error.customData.email;
               // The AuthCredential type that was used.
               const credential = GoogleAuthProvider.credentialFromError(error);
               console.log(error)
           });
   };


   return (
       <div>
           {isLoggedIn && (
               <>
                   <div className="flex justify-between items-center w-full">
                       <div className="flex items-center">
                           <Image
                               className="rounded-full shadow-xl"
                               src={user.providerData[0].photoURL}
                               alt="Picture of the author"
                               width={50}
                               height={50}
                           />
                           <div className="ml-4 flex flex-col items-start justify-center">
                            <span className="text-xl">{user.email}</span>
                            <span className="text-xl">{user.displayName}</span>
                           </div>
                       </div>


                       <button
                           className="border-2 border-black px-2 rounded-xl"
                           onClick={() => auth.signOut()}>
                           Logout
                       </button>
                   </div>


               </>
           )}
           {!isLoggedIn && (
               <button
                   className="border-2 border-black p-2 px-4 rounded-full"
                   onClick={() => handleAuth()}>
                   Login with Google
               </button>
           )}
       </div>
   );
};


export default Auth;