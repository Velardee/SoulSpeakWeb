import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, db } from "../../firebaseConfig"
import { FirebaseAuthErrorCode, Login, Register, User, UserLogged } from "../../types/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { enqueueSnackbar } from "notistack";


export const firebaseAuthErrorMessages: Record<FirebaseAuthErrorCode, string> = {
    'auth/email-already-in-use': 'Este correo ya está en uso.',
    'auth/invalid-email': 'El formato del correo no es válido.',
    'auth/invalid-credential': 'Las credenciales proporcionadas no son válidas.',
    'auth/popup-closed-by-user': 'El proceso fue cancelado.',
};

export const emailSignUp = async (userToRegister: Register): Promise<User | null> => {
    const { username, email, password } = userToRegister;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const docRef = doc(db, `users/${user.uid}`);
        await setDoc(docRef, {
            uuid: user.uid,
            username,
            email,
            provider: "email",
            createdAt: serverTimestamp(),
        });

        return {
            uuid: user.uid,
            username,
            email,
            provider: "email",
        };
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code as FirebaseAuthErrorCode;
            const errorMessage = firebaseAuthErrorMessages[errorCode] || 'Ocurrió un error inesperado.';

            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
};

export const emailLogin = async (userToLogin: Login): Promise<UserLogged | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, userToLogin.email, userToLogin.password)
        const user = userCredential.user;
        const token = await user.getIdToken()

        const docRef = doc(db, 'users', `${user.uid}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const dbUser = docSnap.data() as User

            const userToReturn = {
                user: dbUser,
                token
            }
            return userToReturn
        } else {
            console.log("No such document!");
            return null
        }

    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code as FirebaseAuthErrorCode;
            const errorMessage = firebaseAuthErrorMessages[errorCode] || 'Ocurrió un error inesperado.';

            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export const logOut = async () => {
    const auth = getAuth();
    const response = await signOut(auth)

    console.log(response)
}

export const googleSignUp = async (): Promise<UserLogged | null> => {
    try {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        const user = userCredential.user
        const token = await user.getIdToken()

        const docRef = doc(db, `users/${user.uid}`)
        await setDoc(docRef, {
            uuid: user.uid,
            username: user.displayName,
            email: user.email,
            provider: "Google",
            createdAt: serverTimestamp()
        })

        const userToReturn = {
            user: {
                uuid: user.uid,
                username: user.displayName,
                email: user.email,
                provider: "Google",
            } as User,
            token
        }

        return userToReturn
    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code as FirebaseAuthErrorCode;
            const errorMessage = firebaseAuthErrorMessages[errorCode] || 'Ocurrió un error inesperado.';

            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export const googleSignIn = async (): Promise<UserLogged | null>  => {
    try {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        const user = userCredential.user
        const token = await user.getIdToken()

        const docRef = doc(db, 'users', `${user.uid}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const dbUser = docSnap.data() as User

            const userToReturn = {
                user: dbUser,
                token
            }
            return userToReturn
        } else {
            console.log("No such document!");
            return null
        }

    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code as FirebaseAuthErrorCode;
            const errorMessage = firebaseAuthErrorMessages[errorCode] || 'Ocurrió un error inesperado.';

            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}