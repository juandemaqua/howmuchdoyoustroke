// ScoreboardPage.tsx
import React, { useState, useEffect } from 'react';
// import { collection, getDocs, query, orderBy } from '../../../backend/node_modules/firebase/firestore';
import { db } from '../../../backend/node_modules/firebase/firebaseConfig'; // Adjust path as needed

type Score = {
  id: string;
  username: string;
  highestScore: number;
};

const ScoreboardPage: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const loadScores = async () => {
      const q = query(collection(db, "scores"), orderBy("highestScore", "desc"));

      const querySnapshot = await getDocs(q);
      const fetchedScores: Score[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Score[];

      setScores(fetchedScores);
    };

    loadScores();
  }, []);

  return (
    <div style={{ border: '1px solid #000', padding: '10px', width: '300px' }}>
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            <strong>{score.username}:</strong> {score.highestScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreboardPage;
