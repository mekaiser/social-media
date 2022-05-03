import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from '../components/Login';
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  if(!session) return <Login/>
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  const posts = await getDocs(q);

  const docs = posts.docs.map(post => (
    {
      id: post.id,
      ...post.data(),
      timestamp: null
    }
  ))

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
