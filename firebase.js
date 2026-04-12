import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBnBvRWlbKp-_ulZRKbIqtmludKB9ZLRY",
  authDomain: "ai-tutor-86558.firebaseapp.com",
  projectId: "ai-tutor-86558",
  storageBucket: "ai-tutor-86558.firebasestorage.app",
  messagingSenderId: "745192305658",
  appId: "1:745192305658:web:fae3d83fa83309d1ccea43"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

export async function saveScore(studentName, level, score, total, lang, studentClass = '') {
  try {
    await addDoc(collection(db, "scores"), {
      name: studentName,
      studentClass: studentClass,
      level: level,
      score: score,
      total: total,
      language: lang,
      timestamp: new Date().toISOString()
    });
    console.log("Score saved!");
  } catch (e) {
    console.error("Error saving score:", e);
  }
}

export async function getAllScores() {
  try {
    const q = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const scores = [];
    snapshot.forEach(doc => scores.push({ id: doc.id, ...doc.data() }));
    return scores;
  } catch (e) {
    console.error("Error getting scores:", e);
    return [];
  }
}