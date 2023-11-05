import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";

import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const form = document.querySelector("form");

const pass = document.querySelector(".pass");
const email = document.querySelector(".email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      pass.value
    );
    console.log(res.user);
  } catch (error) {
    // console.log(error);
  }

  const userD = {
    email: email.value,
    pass: pass.value,
  };

  console.log(userD);
  try {
    const docRef = await addDoc(collection(db, "post"), userD);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  const querySnapshot = await getDocs(collection(db, "post"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
});
