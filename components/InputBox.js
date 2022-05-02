import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  addDoc,
  collection,
  db,
  doc,
  serverTimestamp,
  setDoc,
  storage
} from "../firebase";

export default function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;


    // ====== Create a collection in db named posts ======
    const colRef = collection(db, "posts");

    // ====== Create data to upload in firestore ====== 
    const data = {
      message: inputRef.current.value,
      name: session ? session.user.name : "John",
      email: session ? session.user.email : "john@example.com",
      image: session
        ? session.user.image
        : "https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      timestamp: serverTimestamp(),
    };

    // ====== Initialize data adding to firestore ====== 
    addDoc(colRef, data)
      .then((document) => {
        if (imageToPost) {

          // ====== Create a storage named posts and set the image name to document id ====== 
          const storageRef = ref(storage, `posts/${document.id}`);

          // ====== Initialize uploading image string to firebase storage ======
          uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
            console.log("Uploaded a base64 string!");

            // ====== Remove image preview from UI ====== 
            removeImage();

            // ====== Get downloadURL from firebase storage and link that to linked document in firestore ====== 
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              const postRef = doc(db, "posts", document.id);
              setDoc(postRef, { postImage: downloadURL }, { merge: true });
            });
          });

          console.log("here");
        }
        console.log("Document written with ID: ", document.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      // ====== Reading the image as data url ====== 
      reader.readAsDataURL(e.target.files[0]);
    }

    // ====== When it loads, means when the reader event comes back, set the state (as it's asynchronous). Its basically like a base64 encoding ======
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
    filePickerRef.current.value = null;
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={
            session
              ? session.user.image
              : "https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
          }
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${
              session ? session.user.name : "John"
            }?`}
          />
          <button type="submit" className="hidden" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={() => removeImage()}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center"> Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}
