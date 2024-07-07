import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../../firebaseConfig";

export const authOptions = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        const userCredential = await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
        const user = userCredential.user;
        
        if (user) {
          // Ambil data tambahan dari Firestore
          const userDoc = await getDoc(doc(firestore, "pengguna" ,user.uid));
          if (userDoc.exists()) {
            return {
              ...user,
              ...userDoc.data()
            };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.uid;
        token.email = user.email;
        token.nama = user?.nama;
        token.alamat = user?.alamat;
        token.noTelpon = user?.noTelpon;
        token.peran = user?.peran;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.nama = token?.nama;
      session.user.alamat = token?.alamat;
      session.user.noTelpon = token?.noTelpon;
      session.user.peran = token?.peran;
      return session;
    }
  }
};

export default NextAuth(authOptions);
