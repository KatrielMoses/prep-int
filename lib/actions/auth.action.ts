'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        // Check if a Firestore user already exists with this email
        const userSnap = await db.collection('users').where('email', '==', email).limit(1).get();

        if (!userSnap.empty) {
            return {
                success: false,
                message: 'Email is already in use.'
            };
        }

        // Create Firestore user doc with UID as the document ID
        await db.collection('users').doc(uid).set({
            name,
            email,
        });

        return {
            success: true,
            message: 'Account created successfully!',
        };
    } catch (error: any) {
        console.error('Error during sign up:', error);

        return {
            success: false,
            message: error?.message || 'Failed to create an account.',
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    console.log("🔧 Server signIn action called with:", { email, hasIdToken: !!idToken });

    try {
        console.log("🔍 Looking up user by email...");
        const userRecord = await auth.getUserByEmail(email);
        console.log("👤 User record found:", { uid: userRecord.uid, email: userRecord.email });

        if (!userRecord) {
            console.error("❌ No user record found");
            return {
                success: false,
                message: 'User does not exist.',
            };
        }

        console.log("🍪 Setting session cookie...");
        await setSessionCookie(idToken);
        console.log("✅ Session cookie set successfully");

        return {
            success: true,
            message: "Signed in.",
        };
    } catch (error) {
        console.error('❌ Error during sign in:', error);

        return {
            success: false,
            message: 'Failed to log into account.',
        };
    }
}

export async function setSessionCookie(idToken: string) {
    console.log("🍪 Creating session cookie...");
    const cookieStore = await cookies();

    console.log("🔐 Creating Firebase session cookie...");
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000 }); // 7 days
    console.log("📝 Session cookie created, length:", sessionCookie.length);

    console.log("💾 Setting cookie in browser...");
    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
    console.log("✅ Cookie set with config:", {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}


export async function getCurrentUser(): Promise<User | null> {
    console.log("👤 Getting current user...");
    const cookieStore = await cookies();

    const sessioncookie = cookieStore.get('session')?.value;
    console.log("🍪 Session cookie exists?", !!sessioncookie);

    if (!sessioncookie) {
        console.log("❌ No session cookie found");
        return null;
    }

    try {
        console.log("🔍 Verifying session cookie...");
        const decodedClaims = await auth.verifySessionCookie(sessioncookie, true);
        console.log("✅ Session cookie verified for user:", decodedClaims.uid);

        console.log("📄 Fetching user document from Firestore...");
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            console.log("❌ User document not found in Firestore");
            console.log("🔧 Attempting to create missing user document...");

            // Get user info from Firebase Auth to create the document
            try {
                const authUser = await auth.getUser(decodedClaims.uid);
                console.log("👤 Found auth user:", { uid: authUser.uid, email: authUser.email });

                // Create the missing Firestore document
                await db.collection('users').doc(decodedClaims.uid).set({
                    name: authUser.displayName || authUser.email?.split('@')[0] || 'User',
                    email: authUser.email || '',
                });

                console.log("✅ Created missing user document in Firestore");

                // Return the newly created user
                return {
                    id: decodedClaims.uid,
                    name: authUser.displayName || authUser.email?.split('@')[0] || 'User',
                    email: authUser.email || '',
                } as User;
            } catch (error) {
                console.error("❌ Failed to create missing user document:", error);
                return null;
            }
        }

        console.log("✅ User document found:", userRecord.id);
        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error('❌ Error getting current user:', error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user;
}