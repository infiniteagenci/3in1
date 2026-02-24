import { useState } from 'react';

// Rosary prayers
const prayers = {
  signOfCross: {
    name: 'Sign of the Cross',
    text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'
  },
  apostlesCreed: {
    name: 'Apostles\' Creed',
    text: 'I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.'
  },
  ourFather: {
    name: 'Our Father',
    text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.'
  },
  hailMary: {
    name: 'Hail Mary',
    text: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'
  },
  gloryBe: {
    name: 'Glory Be',
    text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.'
  },
  fatimaPrayer: {
    name: 'Fatima Prayer',
    text: 'O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to heaven, especially those in most need of Thy mercy.'
  },
  hailHolyQueen: {
    name: 'Hail Holy Queen',
    text: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
  },
  concludingPrayer: {
    name: 'Concluding Prayer',
    text: 'O God, whose only-begotten Son, by His life, death and resurrection, has purchased for us the rewards of eternal life; grant, we beseech Thee, that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.'
  },
  // Divine Mercy Chaplet prayers
  divineMercyOpening: {
    name: 'Opening Prayer',
    text: 'You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, immeasurable Divine Mercy, envelop the whole world and empty Yourself out upon us.'
  },
  eternalFather: {
    name: 'Eternal Father',
    text: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.'
  },
  forSakeOfSorrow: {
    name: 'For the Sake of His Sorrowful Passion',
    text: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.'
  },
  holyGod: {
    name: 'Holy God (3 times)',
    text: 'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.'
  },
  divineMercyClosing: {
    name: 'Closing Prayer',
    text: 'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You.'
  }
};

// Rosary mysteries organized by day
const rosaryMysteries = {
  joyful: {
    name: 'Joyful Mysteries',
    icon: '🌟',
    day: 'Monday & Saturday',
    color: 'from-yellow-400 to-amber-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
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
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
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
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    mysteries: [
      { name: 'The Resurrection', scripture: 'Matthew 28:1-10', fruit: 'Faith' },
      { name: 'The Ascension', scripture: 'Luke 24:50-53', fruit: 'Hope' },
      { name: 'The Descent of the Holy Spirit', scripture: 'Acts 2:1-4', fruit: 'Love of God' },
      { name: 'The Assumption', scripture: 'Revelation 12:1', fruit: 'Grace of Final Pererverance' },
      { name: 'The Coronation of Mary', scripture: 'Revelation 12:1', fruit: 'Trust in Mary\'s Intercession' },
    ]
  },
  luminous: {
    name: 'Luminous Mysteries',
    icon: '💫',
    day: 'Thursday',
    color: 'from-blue-400 to-cyan-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
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
    case 0: return rosaryMysteries.glorious;
    case 1: return rosaryMysteries.joyful;
    case 2: return rosaryMysteries.sorrowful;
    case 3: return rosaryMysteries.glorious;
    case 4: return rosaryMysteries.luminous;
    case 5: return rosaryMysteries.sorrowful;
    case 6: return rosaryMysteries.joyful;
    default: return rosaryMysteries.glorious;
  }
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Divine Mercy Chaplet data
const divineMercyChaplet = {
  name: 'Divine Mercy Chaplet',
  icon: '💜',
  day: 'Any day (especially 3 PM)',
  color: 'from-red-400 to-pink-500',
  textColor: 'text-red-700',
  bgColor: 'bg-red-50',
  description: 'The Chaplet of Divine Mercy is a powerful prayer for mercy, given by Jesus to St. Faustina. It is especially prayed at 3 PM, the Hour of Great Mercy.'
};

export default function RosaryTab({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<'rosary' | 'divine-mercy'>('rosary');
  const [selectedMystery, setSelectedMystery] = useState(getTodaysMysteries());
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);
  const [currentDecade, setCurrentDecade] = useState<number | null>(null);

  const todaysMystery = getTodaysMysteries();
  const today = days[new Date().getDay()];

  const togglePrayer = (prayerKey: string) => {
    setExpandedPrayer(expandedPrayer === prayerKey ? null : prayerKey);
  };

  const PrayerCard = ({ key, prayer, defaultOpen = false }: { key: string; prayer: typeof prayers.ourFather; defaultOpen?: boolean }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => togglePrayer(key)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800 font-geist">{prayer.name}</span>
        <svg className={`w-5 h-5 text-gray-500 transition-transform ${expandedPrayer === key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expandedPrayer === key && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-700 italic leading-relaxed">"{prayer.text}"</p>
        </div>
      )}
    </div>
  );

  // ==================== DIVINE MERCY CHAPLET VIEW ====================
  if (activeSection === 'divine-mercy') {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-red-50 to-pink-50">
        {/* Header with Section Toggle */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white px-4 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-3 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </button>

          {/* Section Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('rosary')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                activeSection === 'rosary'
                  ? 'bg-white text-red-600'
                  : 'bg-red-400/30 text-white hover:bg-red-400/50'
              }`}
            >
              🙏 Holy Rosary
            </button>
            <button
              onClick={() => setActiveSection('divine-mercy')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                activeSection === 'divine-mercy'
                  ? 'bg-white text-red-600'
                  : 'bg-red-400/30 text-white hover:bg-red-400/50'
              }`}
            >
              💜 Divine Mercy
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Title */}
          <div className="text-center mb-6">
            <span className="text-5xl">💜</span>
            <h1 className="text-2xl font-bold font-playfair text-red-700 mt-2">Divine Mercy Chaplet</h1>
            <p className="text-sm text-red-600 italic">"Jesus, I trust in You"</p>
          </div>

          {/* Intro Card */}
          <div className={`bg-gradient-to-br ${divineMercyChaplet.color} rounded-2xl p-5 mb-6 text-white shadow-lg`}>
            <p className="text-sm leading-relaxed">{divineMercyChaplet.description}</p>
            <p className="text-xs mt-3 opacity-90">💜 Best prayed at 3 PM, the Hour of Great Mercy</p>
          </div>

          {/* Chaplet Structure */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 text-white">
              <h3 className="font-bold font-playfair text-center">How to Pray the Chaplet</h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Opening Prayers */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">✝️</span>
                  Opening Prayers
                </h4>
                <div className="space-y-2">
                  <PrayerCard key="dmc-sign" prayer={prayers.signOfCross} />
                  <PrayerCard key="dmc-opening" prayer={prayers.divineMercyOpening} />
                </div>
              </div>

              {/* The Five Decades */}
              {[0, 1, 2, 3, 4].map((decadeIndex) => (
                <div key={decadeIndex} className={`rounded-xl border-2 ${divineMercyChaplet.bgColor} ${currentDecade === decadeIndex ? 'ring-2 ring-red-400' : ''}`}>
                  <button
                    onClick={() => setCurrentDecade(currentDecade === decadeIndex ? null : decadeIndex)}
                    className="w-full px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${divineMercyChaplet.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {decadeIndex + 1}
                      </span>
                      <div className="text-left">
                        <h5 className="font-semibold text-gray-800">Decade {decadeIndex + 1}</h5>
                      </div>
                    </div>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentDecade === decadeIndex ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {currentDecade === decadeIndex && (
                    <div className="px-4 pb-4 space-y-2">
                      <div className="text-xs text-gray-600 italic mb-2">
                        On the 10 small beads of this decade:
                      </div>

                      {/* Eternal Father - repeated 10 times */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-red-50 border-b border-red-200">
                          <span className="text-sm font-medium text-red-700">Eternal Father (repeat 10 times)</span>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm text-gray-700 italic">"{prayers.eternalFather.text}"</p>
                          <p className="text-xs text-gray-500 mt-2">✝️ Say this prayer 10 times on the small beads</p>
                        </div>
                      </div>

                      {/* For the Sake of His Sorrowful Passion */}
                      <div className="text-xs text-gray-600 italic mb-2 mt-3">
                        After the decade:
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-pink-50 border-b border-pink-200">
                          <span className="text-sm font-medium text-pink-700">For the Sake of His Sorrowful Passion</span>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm text-gray-700 italic">"{prayers.forSakeOfSorrow.text}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Concluding Prayers */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">🙏</span>
                  Holy God (say 3 times)
                </h4>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-2 bg-red-50 border-b border-red-200">
                    <span className="text-sm font-medium text-red-700">Holy God, Holy Mighty One, Holy Immortal One</span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-700 italic">"{prayers.holyGod.text}"</p>
                    <p className="text-xs text-gray-500 mt-2">✝️ Repeat 3 times</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">💜</span>
                  Closing Prayer
                </h4>
                <PrayerCard key="dmc-closing" prayer={prayers.divineMercyClosing} />
              </div>

              {/* Expand/Collapse All Button */}
              <button
                onClick={() => {
                  if (currentDecade !== null) {
                    setCurrentDecade(null);
                  } else {
                    setCurrentDecade(0);
                  }
                }}
                className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium font-geist"
              >
                {currentDecade !== null ? 'Collapse All Decades' : 'Expand All Decades'}
              </button>
            </div>
          </div>

          {/* Quick Prayer Reference */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h4 className="font-semibold text-gray-800 font-geist">Quick Prayer Reference</h4>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              <button onClick={() => togglePrayer('eternalFather')} className="px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700 hover:bg-red-100">Eternal Father</button>
              <button onClick={() => togglePrayer('forSakeOfSorrow')} className="px-3 py-2 bg-pink-50 rounded-lg text-sm text-pink-700 hover:bg-pink-100">For Sake of Sorrow</button>
              <button onClick={() => togglePrayer('holyGod')} className="px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700 hover:bg-red-100">Holy God</button>
              <button onClick={() => togglePrayer('divineMercyClosing')} className="px-3 py-2 bg-pink-50 rounded-lg text-sm text-pink-700 hover:bg-pink-100">Closing Prayer</button>
            </div>

            {expandedPrayer && (
              <div className="px-4 pb-4">
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h5 className="font-semibold text-red-900 mb-2">{prayers[expandedPrayer as keyof typeof prayers]?.name}</h5>
                  <p className="text-sm text-red-800 italic leading-relaxed">"{prayers[expandedPrayer as keyof typeof prayers]?.text}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==================== HOLY ROSARY VIEW ====================
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header with Section Toggle */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-3 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </button>

        {/* Section Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('rosary')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              activeSection === 'rosary'
                ? 'bg-white text-purple-600'
                : 'bg-purple-400/30 text-white hover:bg-purple-400/50'
            }`}
          >
            📿 Holy Rosary
          </button>
          <button
            onClick={() => setActiveSection('divine-mercy')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              activeSection === 'divine-mercy'
                ? 'bg-white text-purple-600'
                : 'bg-purple-400/30 text-white hover:bg-purple-400/50'
            }`}
          >
            💜 Divine Mercy
          </button>
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

        {/* Mystery Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 font-geist">Select Mysteries</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(rosaryMysteries).map(([key, mystery]) => (
              <button
                key={key}
                onClick={() => setSelectedMystery(mystery)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedMystery.name === mystery.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <span className="text-2xl">{mystery.icon}</span>
                <p className="text-xs font-semibold text-gray-800 mt-1">{mystery.name}</p>
                <p className="text-xs text-gray-500">{mystery.day}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Full Rosary Structure */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${selectedMystery.color} px-4 py-3 text-white`}>
            <h3 className="font-bold font-playfair">Complete Rosary Structure - {selectedMystery.name}</h3>
          </div>

          <div className="p-4 space-y-4">
            {/* Beginning Prayers */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">✝️</span>
                Beginning Prayers
              </h4>
              <div className="space-y-2">
                <PrayerCard key="sign" prayer={prayers.signOfCross} />
                <PrayerCard key="creed" prayer={prayers.apostlesCreed} />
              </div>
            </div>

            {/* First Decade */}
            {[0, 1, 2, 3, 4].map((decadeIndex) => (
              <div key={decadeIndex} className={`rounded-xl border-2 ${selectedMystery.bgColor} ${currentDecade === decadeIndex ? 'ring-2 ring-purple-400' : ''}`}>
                <button
                  onClick={() => setCurrentDecade(currentDecade === decadeIndex ? null : decadeIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedMystery.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {decadeIndex + 1}
                    </span>
                    <div className="text-left">
                      <h5 className="font-semibold text-gray-800">{selectedMystery.mysteries[decadeIndex].name}</h5>
                      <p className="text-xs text-gray-500">{selectedMystery.mysteries[decadeIndex].scripture}</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform ${currentDecade === decadeIndex ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {currentDecade === decadeIndex && (
                  <div className="px-4 pb-4 space-y-2">
                    <div className="text-xs text-gray-600 italic mb-2">Fruit: {selectedMystery.mysteries[decadeIndex].fruit}</div>
                    <PrayerCard key={`ourfather-${decadeIndex}`} prayer={prayers.ourFather} />
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">10 Hail Marys</span>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-700 italic">"{prayers.hailMary.text}"</p>
                        <p className="text-xs text-gray-500 mt-2">✝️ (repeat 10 times while meditating on the mystery)</p>
                      </div>
                    </div>
                    <PrayerCard key={`glory-${decadeIndex}`} prayer={prayers.gloryBe} />
                    <PrayerCard key={`fatima-${decadeIndex}`} prayer={prayers.fatimaPrayer} />
                  </div>
                )}
              </div>
            ))}

            {/* Closing Prayers */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">🙏</span>
                Closing Prayers
              </h4>
              <div className="space-y-2">
                <PrayerCard key="holyqueen" prayer={prayers.hailHolyQueen} />
                <PrayerCard key="concluding" prayer={prayers.concludingPrayer} />
              </div>
            </div>

            {/* Expand/Collapse All Button */}
            <button
              onClick={() => {
                if (currentDecade !== null) {
                  setCurrentDecade(null);
                } else {
                  setCurrentDecade(0);
                }
              }}
              className="w-full px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-medium font-geist"
            >
              {currentDecade !== null ? 'Collapse All Decades' : 'Expand All Decades'}
            </button>
          </div>
        </div>

        {/* Quick Prayer Reference */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h4 className="font-semibold text-gray-800 font-geist">Quick Prayer Reference</h4>
          </div>
          <div className="p-4 grid grid-cols-2 gap-2">
            <button onClick={() => togglePrayer('ourFather')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Our Father</button>
            <button onClick={() => togglePrayer('hailMary')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Hail Mary</button>
            <button onClick={() => togglePrayer('gloryBe')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Glory Be</button>
            <button onClick={() => togglePrayer('fatimaPrayer')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Fatima Prayer</button>
            <button onClick={() => togglePrayer('hailHolyQueen')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Hail Holy Queen</button>
            <button onClick={() => togglePrayer('apostlesCreed')} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100">Apostles' Creed</button>
          </div>

          {expandedPrayer && (
            <div className="px-4 pb-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h5 className="font-semibold text-purple-900 mb-2">{prayers[expandedPrayer as keyof typeof prayers]?.name}</h5>
                <p className="text-sm text-purple-800 italic leading-relaxed">"{prayers[expandedPrayer as keyof typeof prayers]?.text}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
