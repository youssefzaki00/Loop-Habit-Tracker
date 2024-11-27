// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   Timestamp,
// } from "firebase/firestore";

// // Initialize Firestore
// const firestore = getFirestore();

// /**
//  * Initialize user data in Firestore if it doesn't exist.
//  *
//  * @param userUid The user's unique identifier (UID).
//  */
// export const initializeUserData = async (userUid: string) => {
//   try {
//     // Use a 'users' collection to store user-specific data
//     const userHabitsDocRef = doc(firestore, `users/${userUid}/habits/`);
//     const userDocRef = doc(firestore, `users/${userUid}`);
//     const docSnapshot = await getDoc(userDocRef);
//     await setDoc(userDocRef, { id: userUid });
//     if (!docSnapshot.exists()) {
//       // Create an initial document for the user's habits with example data
//       await setDoc(userHabitsDocRef, {
//         name: "Morning Exercise", // Example habit name
//         type: "boolean",
//         color: "#213f14",
//         frequency: "Every day", // Example frequency
//         description: "Exercise every morning for 30 minutes.", // Example description
//         question: "did you exercise today?",
//         createdAt: Timestamp.now(), // Use Firestore's Timestamp for when the habit was created
//       });

//       console.log("Initialized user data in Firestore with example habit.");
//       return { initialized: true }; // Indicate that the data was initialized
//     } else {
//       console.log("User data already exists.");
//       return { initialized: false }; // Indicate that the data already existed
//     }
//   } catch (error) {
//     console.error("Error initializing user data:", error);
//     throw error; // Propagate the error so it can be caught where this function is called
//   }
// };
