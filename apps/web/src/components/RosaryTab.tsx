import { useState } from 'react';

// Rosary mysteries organized by day
const rosaryMysteries = {
  joyful: {
    name: 'Joyful Mysteries',
    icon: '🌟',
    day: 'Monday & Saturday',
    color: 'from-yellow-400 to-amber-500',
    mysteries: [
      { name: 'The Annunciation', scripture: 'Luke 1:26-38', fruit: 'Humility' },
      { name: 'The Visitation', scripture: 'Luke 1:39-56', fruit: 'Love of Neighbor' },
      { name: 'The Nativity', scripture: 'Luke 2:1-20', fruit: 'Poverty of Spirit' },
      { name: 'The Presentation', scripture: 'Luke 2:22-38', fruit: 'Purity' },
      { name: 'The Finding in the Temple', scripture: 'Luke 2:41-52', fruit: 'Obedience' },
    ]
  },
  sorrowful: {
    name: 'Sorrowful Mysteries',
    icon: '💜',
    day: 'Tuesday & Friday',
    color: 'from-purple-500 to-violet-600',
    mysteries: [
      { name: 'The Agony in the Garden', scripture: 'Matthew 26:36-46', fruit: 'Contrition' },
      { name: 'The Scourging at the Pillar', scripture: 'Matthew 27:26', fruit: 'Purity' },
      { name: 'The Crowning with Thorns', scripture: 'Matthew 27:27-31', fruit: 'Courage' },
      { name: 'The Carrying of the Cross', scripture: 'John 19:16-22', fruit: 'Patience' },
      { name: 'The Crucifixion', scripture: 'John 19:25-30', fruit: 'Perseverance' },
    ]
  },
  glorious: {
    name: 'Glorious Mysteries',
    icon: '✨',
    day: 'Wednesday & Sunday',
    color: 'from-amber-400 to-yellow-500',
    mysteries: [
      { name: 'The Resurrection', scripture: 'Matthew 28:1-10', fruit: 'Faith' },
      { name: 'The Ascension', scripture: 'Luke 24:50-53', fruit: 'Hope' },
      { name: 'The Descent of the Holy Spirit', scripture: 'Acts 2:1-4', fruit: 'Love of God' },
      { name: 'The Assumption', scripture: 'Revelation 12:1', fruit: 'Grace of Final Perserverance' },
      { name: 'The Coronation of Mary', scripture: 'Revelation 12:1', fruit: 'Trust in Mary\'s Intercession' },
    ]
  },
  luminous: {
    name: 'Luminous Mysteries',
    icon: '💫',
    day: 'Thursday',
    color: 'from-blue-400 to-cyan-500',
    mysteries: [
      { name: 'The Baptism of Jesus', scripture: 'Matthew 3:13-17', fruit: 'Openness to the Holy Spirit' },
      { name: 'The Wedding at Cana', scripture: 'John 2:1-12', fruit: 'To Jesus through Mary' },
      { name: 'The Proclamation of the Kingdom', scripture: 'Mark 1:15', fruit: 'Conversion' },
      { name: 'The Transfiguration', scripture: 'Matthew 17:1-8', fruit: 'Desire for Holiness' },
      { name: 'The Institution of the Eucharist', scripture: 'Matthew 26:26-30', fruit: 'Eucharistic Adoration' },
    ]
  }
};

// Get today's mysteries based on the day of week
const getTodaysMysteries = () => {
  const day = new Date().getDay();
  switch (day) {
    case 0: // Sunday
      return rosaryMysteries.glorious;
    case 1: // Monday
      return rosaryMysteries.joyful;
    case 2: // Tuesday
      return rosaryMysteries.sorrowful;
    case 3: // Wednesday
      return rosaryMysteries.glorious;
    case 4: // Thursday
      return rosaryMysteries.luminous;
    case 5: // Friday
      return rosaryMysteries.sorrowful;
    case 6: // Saturday
      return rosaryMysteries.joyful;
    default:
      return rosaryMysteries.glorious;
  }
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function RosaryTab({ onClose }: { onClose: () => void }) {
  const [selectedMystery, setSelectedMystery] = useState(getTodaysMysteries());
  const [showPrayerGuide, setShowPrayerGuide] = useState(false);

  const todaysMystery = getTodaysMysteries();
  const today = days[new Date().getDay()];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">📿</span>
          <div>
            <h1 className="text-2xl font-bold font-playfair">Holy Rosary</h1>
            <p className="text-sm text-purple-100">Pray the rosary daily</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Today's Mystery Highlight */}
        <div className={`bg-gradient-to-br ${todaysMystery.color} rounded-2xl p-5 mb-6 text-white shadow-lg`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{todaysMystery.icon}</span>
            <span className="text-sm font-medium opacity-90">Today ({today})</span>
          </div>
          <h2 className="text-2xl font-bold font-playfair mb-1">{todaysMystery.name}</h2>
          <p className="text-sm opacity-90">Pray these mysteries today</p>
        </div>

        {/* All Mysteries */}
        <h3 className="font-semibold text-gray-800 mb-3 font-geist">All Mysteries</h3>
        <div className="space-y-3 mb-6">
          {Object.entries(rosaryMysteries).map(([key, mystery]) => (
            <button
              key={key}
              onClick={() => setSelectedMystery(mystery)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedMystery.name === mystery.name
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mystery.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{mystery.name}</h4>
                  <p className="text-xs text-gray-500">{mystery.day}</p>
                </div>
                {selectedMystery.name === mystery.name && (
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Mystery Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedMystery.color} px-4 py-4 text-white`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedMystery.icon}</span>
              <div>
                <h3 className="text-xl font-bold font-playfair">{selectedMystery.name}</h3>
                <p className="text-sm opacity-90">{selectedMystery.day}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h4 className="font-semibold text-gray-800 mb-3 font-geist">The Five Decades</h4>
            <div className="space-y-3">
              {selectedMystery.mysteries.map((mystery, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedMystery.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">{mystery.name}</h5>
                      <p className="text-xs text-gray-500 mb-1">{mystery.scripture}</p>
                      <p className="text-sm text-purple-600">Fruit: {mystery.fruit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prayer Guide Button */}
            <button
              onClick={() => setShowPrayerGuide(!showPrayerGuide)}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-geist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showPrayerGuide ? 'Hide' : 'Show'} Prayer Guide
            </button>

            {showPrayerGuide && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h5 className="font-semibold text-blue-900 mb-2 font-geist">How to Pray the Rosary</h5>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Make the Sign of the Cross</li>
                  <li>Say the Apostles' Creed</li>
                  <li>Say one Our Father</li>
                  <li>Say three Hail Marys</li>
                  <li>Say the Glory Be</li>
                  <li>Announce the First Mystery, then say one Our Father</li>
                  <li>Say ten Hail Marys while meditating on the Mystery</li>
                  <li>Say the Glory Be and the Fatima Prayer</li>
                  <li>Repeat for each of the five Mysteries</li>
                  <li>End with the Hail Holy Queen</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Prayers Reference */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h4 className="font-semibold text-gray-800 font-geist">Essential Prayers</h4>
          </div>
          <div className="divide-y divide-gray-100">
            <details className="px-4 py-3">
              <summary className="font-medium text-gray-700 cursor-pointer">Our Father</summary>
              <p className="mt-2 text-sm text-gray-600 italic">
                "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen."
              </p>
            </details>
            <details className="px-4 py-3">
              <summary className="font-medium text-gray-700 cursor-pointer">Hail Mary</summary>
              <p className="mt-2 text-sm text-gray-600 italic">
                "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
              </p>
            </details>
            <details className="px-4 py-3">
              <summary className="font-medium text-gray-700 cursor-pointer">Glory Be</summary>
              <p className="mt-2 text-sm text-gray-600 italic">
                "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen."
              </p>
            </details>
            <details className="px-4 py-3">
              <summary className="font-medium text-gray-700 cursor-pointer">Hail Holy Queen</summary>
              <p className="mt-2 text-sm text-gray-600 italic">
                "Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
