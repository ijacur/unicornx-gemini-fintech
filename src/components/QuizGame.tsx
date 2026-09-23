import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
  time: number;
}

const QUESTIONS = [
  {
    question: "Iqtisodiy tahlilning paydo bo'lishi qaysi jarayon bilan bog'liq?",
    options: [
      "Inson iqtisodiy faoliyatining rivojlanishi",
      "Kompyuterlarning ixtiro qilinishi",
      "Sanoat inqilobi",
      "Qishloq xo'jaligining paydo bo'lishi"
    ],
    answer: 0
  },
  {
    question: "XV asrda ikki tomonlama yozuvli buxgalteriya hisobi tamoyillarini kim ishlab chiqdi?",
    options: [
      "Adam Smit",
      "Karl Marks",
      "Luka Pachioli",
      "Alfred Marshall"
    ],
    answer: 2
  },
  {
    question: "Iqtisodiy tahlil qachon mustaqil ilmiy fan sifatida faol rivojlana boshladi?",
    options: [
      "15-asrda",
      "18-asr boshlarida",
      "19-asr oxiri va 20-asr boshlarida",
      "21-asrda"
    ],
    answer: 2
  },
  {
    question: "Sovet davrida iqtisodiy tahlilning asosiy vazifalaridan biri nima edi?",
    options: [
      "Bozor raqobatini oshirish",
      "Davlat rejalarining bajarilishini baholash",
      "Kriptovalyutalarni tahlil qilish",
      "Foydani yashirish"
    ],
    answer: 1
  },
  {
    question: "Zamonaviy iqtisodiy tahlilda qanday texnologiyalardan keng foydalaniladi?",
    options: [
      "Faqat qog'ozli hisobotlar",
      "Faqat boshlang'ich arifmetika",
      "Raqamli texnologiyalar va kompyuter dasturlari",
      "Siyosiy debatlar"
    ],
    answer: 2
  }
];

const API_URL = '/api/sync';

export const QuizGame: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if played before
    if (localStorage.getItem('quiz_completed')) {
      setHasPlayed(true);
    }

    let isActive = true;
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}?type=leaderboard`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setLeaderboard(data.sort((a, b) => b.score - a.score));
          }
        }
      } catch (e) {
        console.error(e);
      }
      if (isActive) {
        setTimeout(fetchLeaderboard, 3000);
      }
    };

    fetchLeaderboard();

    return () => {
      isActive = false;
    };
  }, []);

  const startQuiz = () => {
    if (!playerName.trim()) return alert("Ismingizni kiriting!");
    if (hasPlayed) return alert("Siz allaqachon qatnashgansiz!");
    setIsPlaying(true);
  };

  const handleAnswer = (selectedIndex: number) => {
    let newScore = score;
    if (selectedIndex === QUESTIONS[currentQuestion].answer) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(newScore);
    }
  };

  const finishQuiz = async (finalScore: number) => {
    setIsPlaying(false);
    setHasPlayed(true);
    localStorage.setItem('quiz_completed', 'true');
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'leaderboard',
          entry: {
            name: playerName,
            score: finalScore,
            time: Date.now()
          }
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!isPlaying && !hasPlayed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Iqtisodiy tahlil - Bilimlar Sinovi</h1>
          <p className="text-gray-600 mb-6">Faqat 1 marta qatnashish mumkin!</p>
          <input
            type="text"
            placeholder="Ismingizni kiriting"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={startQuiz}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            Boshlash
          </button>
        </div>
      </div>
    );
  }

  if (isPlaying) {
    const q = QUESTIONS[currentQuestion];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <span>Savol: {currentQuestion + 1} / {QUESTIONS.length}</span>
            <span>Ball: {score}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">🏆 Liderlar Do'skasi</h1>
        {hasPlayed && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-6">
            Sizning natijangiz: <strong>{score} / {QUESTIONS.length}</strong>
          </div>
        )}
        <div className="space-y-2">
          {leaderboard.map((entry, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border-b">
              <span className="font-bold text-gray-700">{idx + 1}. {entry.name}</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                {entry.score} ball
              </span>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <p className="text-center text-gray-500 py-4">Hozircha natijalar yo'q.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
