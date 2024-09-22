import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebaseConfig"
import { FirebaseAuthErrorCode, Register, User } from "../../types/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { enqueueSnackbar } from "notistack";


export const firebaseAuthErrorMessages: Record<FirebaseAuthErrorCode, string> = {
    'auth/email-already-in-use': 'Este correo ya está en uso.',
    'auth/invalid-email': 'El formato del correo no es válido.',
};

export const emailSignUp = async (userToRegister: Register): Promise<User | null> => {
    const { name, lastname, email, password } = userToRegister;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const docRef = doc(db, `users/${user.uid}`);
        await setDoc(docRef, {
            uuid: user.uid,
            name,
            lastName: lastname,
            email,
            provider: "email",
            createdAt: serverTimestamp(),
        });

        return {
            uuid: user.uid,
            name,
            lastname,
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
        // Retornar null en caso de error
        return null;
    }
};