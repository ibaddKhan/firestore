import { db } from "./config.js";

import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const form = document.querySelector("form");

const pass = document.querySelector(".pass");
const email = document.querySelector(".email");
const div = document.querySelector(".main");
const delet = document.querySelectorAll(".delete");
const update = document.querySelectorAll(".update");
let arr = [];

function renderData() {
  div.innerHTML = "";
  arr.map((item) => {
    div.innerHTML += `<div
  class="max-w-sm mt-20 ml-10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
 <div class="flex">
 <li  class="mb-3 font-normal text-gray-700 dark:text-gray-400">
 ${item.email}
 </li>
 <li> 
 ${item.pass}
 </li></div>
  <a
    href="#"
    class="inline-flex delete items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Delete
  </a>
  <a
    href="#"
    class="inline-flex update items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Update
  </a>
</div>`;
    div.addEventListener("click", (event) => {
      delet.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          console.log("delete called", arr[index]);
        });
      });
    });
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userD = {
    pass: pass.value,
    email: email.value,
    postDate: Timestamp.fromDate(new Date()),
  };

  console.log(userD);

  try {
    const docRef = await addDoc(collection(db, "post"), userD);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  const querySnapshot = await getDocs(
    query(collection(db, "post"), orderBy("postDate", "desc"))
  );
  arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    // div.innerHTML = "";
    console.log(arr);

    div.innerHTML = "";
    arr.push(doc.data());
    renderData();
  });
});
