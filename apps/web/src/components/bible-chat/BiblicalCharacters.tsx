import { useState } from 'react';

export interface BiblicalCharacter {
  id: string;
  name: string;
  title: string;
  emoji: string;
  category: 'patriarch' | 'matriarch' | 'prophet' | 'king' | 'queen' | 'apostle' | 'disciple' | 'warrior' | 'leader' | 'savior';
  era: string;
  keyVerses: string[];
  story: string;
  lessons: string[];
  strengths: string[];
  weaknesses?: string[];
  legacy: string;
  relatedCharacters?: string[];
  timeline?: string;
}

export const biblicalCharacters: BiblicalCharacter[] = [
  {
    id: 'david',
    name: 'David',
    title: 'A Man After Gods Own Heart',
    emoji: '👑',
    category: 'king',
    era: 'c. 1040-970 BC',
    keyVerses: [
      '1 Samuel 13:14',
      '1 Samuel 16:7',
      'Psalm 23',
      'Psalm 51',
      'Acts 13:22'
    ],
    story: 'David began as a shepherd boy, the youngest son of Jesse. God chose him to be king while he was still tending sheep. He faced the giant Goliath with only a sling and faith in God. After becoming king, he united Israel, established Jerusalem as the capital, and wrote many of the Psalms. Despite his great sin with Bathsheba, he repented and is remembered as a man whose heart was fully devoted to God.',
    lessons: [
      'God looks at the heart, not outward appearance',
      'Faith in God enables us to face any giant',
      'True repentance restores our relationship with God',
      'Worship should be central to our lives',
      'God can use anyone who is fully devoted to Him'
    ],
    strengths: [
      'Courageous faith',
      'Skillful musician and poet',
      'Military genius',
      'Passionate worshipper',
      'Humble and repentant heart'
    ],
    weaknesses: [
      'Committed adultery with Bathsheba',
      'Arranged Uriah\'s death',
      'Failed to discipline his children well',
      'Numbered Israel in pride'
    ],
    legacy: 'The greatest king of Israel, ancestor of Jesus Christ, author of many Psalms. His throne was established forever through the Messiah.',
    relatedCharacters: ['Saul', 'Jonathan', 'Bathsheba', 'Solomon', 'Samuel', 'Goliath'],
    timeline: 'Anointed king at 16, reigned 40 years (7 in Hebron, 33 in Jerusalem)'
  },
  {
    id: 'moses',
    name: 'Moses',
    title: 'The Great Lawgiver',
    emoji: '📜',
    category: 'leader',
    era: 'c. 1526-1406 BC',
    keyVerses: [
      'Exodus 3:11-12',
      'Exodus 20:1-17',
      'Deuteronomy 34:10',
      'Hebrews 11:23-29'
    ],
    story: 'Born to Hebrew slaves in Egypt, Moses was raised in Pharaoh\'s palace. After killing an Egyptian to defend a Hebrew, he fled to Midian where God appeared to him in a burning bush. God called him to deliver Israel from Egypt. Through ten plagues and the Red Sea crossing, Moses led the people to Mount Sinai where he received the Ten Commandments. He led Israel for 40 years in the wilderness.',
    lessons: [
      'God equips those He calls',
      'Obedience to God requires courage',
      'Intercessory prayer can change God\'s judgment',
      'God\'s presence is essential for life\'s journey',
      'Leaders require humility before God'
    ],
    strengths: [
      'Intimate relationship with God',
      'Courageous leadership',
      'Effective intercessor',
      'Faithful to God\'s calling',
      'Humble despite greatness'
    ],
    weaknesses: [
      'Killed the Egyptian in anger',
      'Struck the rock in disobedience',
      'Initially resisted God\'s call'
    ],
    legacy: 'Delivered Israel from Egypt, received the Law, led the people to the Promised Land\'s edge. Greatest prophet in the Old Testament.',
    relatedCharacters: ['Aaron', 'Miriam', 'Joshua', 'Pharaoh', 'Jethro'],
    timeline: 'Lived 120 years (40 in Egypt, 40 in Midian, 40 leading Israel)'
  },
  {
    id: 'esther',
    name: 'Esther',
    title: 'Courageous Queen',
    emoji: '👸',
    category: 'queen',
    era: 'c. 486-473 BC',
    keyVerses: [
      'Esther 4:14',
      'Esther 4:16',
      'Esther 7:3-4'
    ],
    story: 'A Jewish orphan raised by her cousin Mordecai. She was taken to the king\'s palace and chosen as queen. When the wicked Haman plotted to destroy all Jews, Mordecai challenged Esther to intervene. After three days of fasting, she courageously approached the king uninvited to save her people. God used her to deliver the Jews and bring about Haman\'s downfall.',
    lessons: [
      'God positions us "for such a time as this"',
      'Courage requires prayer and fasting',
      'God protects His people',
      'Wisdom in timing brings victory',
      'One person can make a difference'
    ],
    strengths: [
      'Extraordinary courage',
      'Wisdom in timing',
      'Faith in God\'s protection',
      'Willingness to sacrifice herself',
      'Respectful influence'
    ],
    weaknesses: [
      'Initially fearful to act'
    ],
    legacy: 'Saved the Jewish people from extinction. The Feast of Purim celebrates her deliverance. An example of how God uses ordinary people for extraordinary purposes.',
    relatedCharacters: ['Mordecai', 'Ahasuerus', 'Haman'],
    timeline: 'Became queen around 479 BC, saved Jews around 473 BC'
  },
  {
    id: 'peter',
    name: 'Peter',
    title: 'The Rock',
    emoji: '🐟',
    category: 'apostle',
    era: 'c. AD 1-67',
    keyVerses: [
      'Matthew 16:18',
      'Acts 2:14-41',
      '1 Peter 5:6-7',
      'John 21:15-17'
    ],
    story: 'A fisherman from Galilee, Peter was one of Jesus\'s first disciples. He was impulsive, speaking and acting boldly. He walked on water, confessed Jesus as Messiah, and denied Him three times. After Pentecost, he became a bold leader of the early church. He wrote two New Testament epistles and tradition holds he was martyred in Rome.',
    lessons: [
      'God transforms failures into leaders',
      'Bold faith requires humility',
      'The Holy Spirit empowers witness',
      'Love for Jesus motivates service',
      'Pastoral leadership requires humility'
    ],
    strengths: [
      'Bold and decisive',
      'Passionate for God',
      'Natural leader',
      'Miraculous faith',
      'Loving shepherd'
    ],
    weaknesses: [
      'Spoke without thinking',
      'Denied Jesus three times',
      'Impulsive actions',
      'Initially hypocritical about Gentiles'
    ],
    legacy: 'Leader of the early church, author of two epistles, preached at Pentecost. Considered the first Pope by Catholics.',
    relatedCharacters: ['Jesus', 'James', 'John', 'Paul', 'Cornelius'],
    timeline: 'Followed Jesus for 3 years, led church from about AD 30-67'
  },
  {
    id: 'paul',
    name: 'Paul',
    title: 'Apostle to the Gentiles',
    emoji: '✉️',
    category: 'apostle',
    era: 'c. AD 5-67',
    keyVerses: [
      'Acts 9:1-19',
      'Galatians 2:20',
      'Philippians 1:21',
      '2 Timothy 4:7-8'
    ],
    story: 'Born Saul in Tarsus, he was a Pharisee who persecuted Christians. On the road to Damascus, Jesus appeared to him in a blinding light. He was transformed from persecutor to apostle. Paul undertook three missionary journeys, planted churches throughout the Roman world, and wrote 13 New Testament epistles. He was martyred in Rome under Nero.',
    lessons: [
      'No one is beyond God\'s grace',
      'Suffering for Christ is honorable',
      'The gospel is for all nations',
      'Spiritual passion fuels ministry',
      'Finishing well requires perseverance'
    ],
    strengths: [
      'Brilliant theologian',
      'Zealous for God',
      'Relentless missionary',
      'Profound writer',
      'Endured persecution joyfully'
    ],
    weaknesses: [
      'Persecuted Christians before conversion',
      'Disagreed with Barnabas about Mark',
      'Struggled with a "thorn in the flesh"'
    ],
    legacy: 'Wrote half the New Testament, brought Christianity to Europe and Asia Minor, shaped Christian theology. The greatest missionary in church history.',
    relatedCharacters: ['Jesus', 'Barnabas', 'Silas', 'Timothy', 'Luke'],
    timeline: 'Converted around AD 34, three missionary journeys, martyred around AD 67'
  },
  {
    id: 'mary-magdalene',
    name: 'Mary Magdalene',
    title: 'Faithful Witness',
    emoji: '💜',
    category: 'disciple',
    era: '1st Century AD',
    keyVerses: [
      'Luke 8:2',
      'John 20:11-18',
      'Mark 16:9'
    ],
    story: 'Mary from Magdala was delivered from seven demons by Jesus. She became a devoted follower, supporting His ministry financially. She remained at the cross while most disciples fled, was present at His burial, and was the first to see the risen Christ. Jesus entrusted her with proclaiming the resurrection to the male disciples.',
    lessons: [
      'Jesus transforms and restores',
      'Faithfulness matters more than status',
      'Women are vital witnesses',
      'Devotion expressed through service',
      'God chooses the unlikely for great purposes'
    ],
    strengths: [
      'Delivered from evil',
      'Financial supporter',
      'Faithful to the end',
      'First witness of resurrection',
      'Courageous messenger'
    ],
    legacy: 'First person to see the risen Christ, "Apostle to the Apostles." Example of transformed devotion and faithful service.',
    relatedCharacters: ['Jesus', 'Joanna', 'Susanna', 'Salome'],
    timeline: 'Followed Jesus throughout His ministry, witnessed crucifixion and resurrection'
  },
  {
    id: 'joseph',
    name: 'Joseph',
    title: 'Dreamer and Ruler',
    emoji: '🎨',
    category: 'leader',
    era: 'c. 1900-1800 BC',
    keyVerses: [
      'Genesis 37:28',
      'Genesis 39:2-4',
      'Genesis 50:20',
      'Psalm 105:17-22'
    ],
    story: 'Favorite son of Jacob, betrayed by his brothers and sold into slavery in Egypt. Falsely accused and imprisoned, he remained faithful to God. After interpreting Pharaoh\'s dreams, he rose to rule Egypt. He stored grain during seven years of plenty, saving Egypt and his own family from famine. He forgave his brothers, recognizing God\'s sovereign plan.',
    lessons: [
      'God is sovereign in suffering',
      'Faithfulness in adversity brings promotion',
      'Forgiveness releases the past to God',
      'God\'s timing is perfect',
      'Character matters more than comfort'
    ],
    strengths: [
      'Unwavering integrity',
      'Wisdom in administration',
      'Forgiving spirit',
      'Faithful in trials',
      'Excellent leadership'
    ],
    weaknesses: [
      'Initially showed favoritism to Benjamin'
    ],
    legacy: 'Saved Egypt and his family from famine. Reconciled his family. A picture of Christ in his suffering, exaltation, and role as savior.',
    relatedCharacters: ['Jacob', 'Rachel', 'Judah', 'Potiphar', 'Pharaoh'],
    timeline: 'Sold at 17, imprisoned at 30, ruled Egypt from age 30-110'
  },
  {
    id: 'deborah',
    name: 'Deborah',
    title: 'Wise Judge',
    emoji: '⚖️',
    category: 'leader',
    era: 'c. 1200 BC',
    keyVerses: [
      'Judges 4:4-5',
      'Judges 5:7',
      'Hebrews 11:32-34'
    ],
    story: 'A prophetess and judge who led Israel for 40 years. She held court under the Palm of Deborah between Ramah and Bethel. When Israel was oppressed by Jabin king of Canaan, Deborah summoned Barak and commanded him to lead an army. She prophesied victory but noted that the honor would go to a woman. After the victory, she and Barak sang a song of praise to God.',
    lessons: [
      'God uses women in leadership',
      'Wisdom comes from knowing God',
      'Courage inspires others',
      'Praise should follow victory',
      'God raises up leaders in times of need'
    ],
    strengths: [
      'Wise and discerning',
      'Courageous leader',
      'Prophetic voice',
      'Inspired confidence',
      'Faith in God\'s promises'
    ],
    legacy: 'Only female judge mentioned in the Bible. Led Israel to victory and delivered them from oppression. Example of godly female leadership.',
    relatedCharacters: ['Barak', 'Jael', 'Jabin', 'Sisera'],
    timeline: 'Judged Israel during period of the Judges, approximately 1200 BC'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    title: 'Faithful in Exile',
    emoji: '🦁',
    category: 'prophet',
    era: 'c. 620-538 BC',
    keyVerses: [
      'Daniel 1:8',
      'Daniel 3:16-18',
      'Daniel 6:10',
      'Daniel 9:2-19'
    ],
    story: 'Taken to Babylon as a youth, Daniel resolved not to defile himself with the king\'s food. God gave him wisdom to interpret dreams and visions. He served multiple kings faithfully, even when thrown into the lions\' den for praying to God. His prophetic visions foretold future empires and the coming Messiah.',
    lessons: [
      'Resolve to stay pure in a corrupt culture',
      'Faithfulness may bring persecution',
      'Prayer is essential',
      'God gives wisdom to the faithful',
      'God is sovereign over nations'
    ],
    strengths: [
      'Uncompromising purity',
      'Prayerful dependence',
      'Divine wisdom',
      'Courageous conviction',
      'Exemplary character'
    ],
    legacy: 'Prophesied the coming Messiah and future empires. Example of living faithfully in a foreign land. Inspired generations of believers.',
    relatedCharacters: ['Nebuchadnezzar', 'Belshazzar', 'Darius', 'Shadrach', 'Meshach', 'Abednego'],
    timeline: 'Served from youth through old age, approximately 82 years in Babylon'
  },
  {
    id: 'ruth',
    name: 'Ruth',
    title: 'Loyal Daughter-in-Law',
    emoji: '💗',
    category: 'matriarch',
    era: 'c. 1100 BC',
    keyVerses: [
      'Ruth 1:16-17',
      'Ruth 2:10-12',
      'Ruth 4:13-17',
      'Matthew 1:5'
    ],
    story: 'A Moabite woman who married an Israelite. After her husband\'s death, she refused to leave her mother-in-law Naomi, saying "Where you go I will go." She worked hard gleaning in the fields to provide for Naomi. Boaz noticed her character and married her. She became the great-grandmother of King David and an ancestor of Jesus Christ.',
    lessons: [
      'Loyalty honors God and family',
      'Hard work is noticed and rewarded',
      'God welcomes all nations',
      'Kindness is never wasted',
      'God works through ordinary faithfulness'
    ],
    strengths: [
      'Extraordinary loyalty',
      'Hard worker',
      'Humble and kind',
      'Trusted God',
      'Faithful to commitments'
    ],
    legacy: 'Great-grandmother of King David, ancestor of Jesus Christ. Example of how God includes all nations in His redemptive plan.',
    relatedCharacters: ['Naomi', 'Boaz', 'Orpah', 'Mahlon'],
    timeline: 'Lived during the time of the judges, approximately 1100 BC'
  },
  {
    id: 'elijah',
    name: 'Elijah',
    title: 'Prophet of Fire',
    emoji: '🔥',
    category: 'prophet',
    era: 'c. 875-850 BC',
    keyVerses: [
      '1 Kings 18:21-24',
      '1 Kings 19:11-12',
      '2 Kings 2:11',
      'James 5:17-18'
    ],
    story: 'A prophet who confronted wicked King Ahab and Queen Jezebel. He pronounced a drought, was fed by ravens, and challenged the prophets of Baal on Mount Carmel. Fire from heaven consumed his sacrifice and the people turned back to God. Despite great victory, he faced depression and wanted to die. God comforted him and took him to heaven in a chariot of fire.',
    lessons: [
      'Bold faith challenges false gods',
      'God provides in impossible situations',
      'Even prophets struggle with depression',
      'God speaks in gentle whispers',
      'Faithful service does not guarantee easy lives'
    ],
    strengths: [
      'Bold confrontation',
      'Powerful prayers',
      'Unwavering faith',
      'Zealous for God',
      'Courageous prophet'
    ],
    weaknesses: [
      'Fled from Jezebel in fear',
      'Experienced depression and wanted to die'
    ],
    legacy: 'One of Israel\'s greatest prophets. Appeared with Moses at Jesus\'s transfiguration. Represents all prophets in the New Testament.',
    relatedCharacters: ['Ahab', 'Jezebel', 'Obadiah', 'Elisha'],
    timeline: 'Prophesied during Ahab\'s reign, approximately 875-850 BC'
  },
  {
    id: 'abraham',
    name: 'Abraham',
    title: 'Father of Nations',
    emoji: '🌟',
    category: 'patriarch',
    era: 'c. 2166-1991 BC',
    keyVerses: [
      'Genesis 12:1-3',
      'Genesis 15:6',
      'Genesis 22:1-18',
      'Romans 4:18-22'
    ],
    story: 'Born Abram in Ur, God called him to leave his homeland and promised to make him a great nation. Though childless and old, he believed God\'s promise. God renamed him Abraham ("father of many") and made a covenant with him. His greatest test came when asked to sacrifice Isaac, his son of promise. God provided a ram instead. Abraham is called the father of all who believe.',
    lessons: [
      'Faith requires leaving the familiar',
      'God\'s promises are worth waiting for',
      'Obedience trusts God\'s character',
      'Faith is credited as righteousness',
      'God provides what is needed'
    ],
    strengths: [
      'Extraordinary faith',
      'Obedient to God\'s call',
      'Hospitable to strangers',
      'Peacemaker',
      'Friend of God'
    ],
    weaknesses: [
      'Lied about Sarah being his sister (twice)',
      'Had a child with Hagar trying to help God',
      'Failed to discipline Ishmael'
    ],
    legacy: 'Father of Judaism, Christianity, and Islam. Ancestor of Jesus Christ. Called "friend of God" and "father of all who believe."',
    relatedCharacters: ['Sarah', 'Isaac', 'Ishmael', 'Lot', 'Melchizedek'],
    timeline: 'Lived 175 years, called at 75, Isaac born at 100, died at 175'
  }
];

const categories = {
  patriarch: { label: 'Patriarch', color: 'from-amber-500 to-yellow-500', icon: '👴' },
  matriarch: { label: 'Matriarch', color: 'from-pink-500 to-rose-500', icon: '👵' },
  prophet: { label: 'Prophet', color: 'from-purple-500 to-indigo-500', icon: '📜' },
  king: { label: 'King', color: 'from-yellow-500 to-amber-500', icon: '👑' },
  queen: { label: 'Queen', color: 'from-fuchsia-500 to-pink-500', icon: '👸' },
  apostle: { label: 'Apostle', color: 'from-blue-500 to-cyan-500', icon: '✨' },
  disciple: { label: 'Disciple', color: 'from-green-500 to-emerald-500', icon: '🐟' },
  warrior: { label: 'Warrior', color: 'from-red-500 to-orange-500', icon: '⚔️' },
  leader: { label: 'Leader', color: 'from-indigo-500 to-violet-500', icon: '🎯' },
  savior: { label: 'Savior', color: 'from-white to-gray-100', icon: '✝️' }
};

interface BiblicalCharactersProps {
  className?: string;
  onCharacterSelect?: (characterId: string) => void;
}

export default function BiblicalCharacters({ className = '', onCharacterSelect }: BiblicalCharactersProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<BiblicalCharacter | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharacters = biblicalCharacters.filter(character => {
    const matchesCategory = !selectedCategory || character.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedCharacter) {
    const category = categories[selectedCharacter.category];
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${category.color} px-6 py-6 text-white`}>
          <button
            onClick={() => setSelectedCharacter(null)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Characters</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
              {selectedCharacter.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-playfair">{selectedCharacter.name}</h2>
              <p className="text-white/90 text-sm">{selectedCharacter.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {category.icon} {category.label}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {selectedCharacter.era}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Story */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 font-geist">
              <span>📖</span> Story
            </h3>
            <p className="text-gray-700 leading-relaxed font-geist font-light">
              {selectedCharacter.story}
            </p>
          </div>

          {/* Key Verses */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
              <span>✝️</span> Key Verses
            </h3>
            <div className="space-y-2">
              {selectedCharacter.keyVerses.map((verse, index) => (
                <div key={index} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-crimson italic">{verse}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
              <span>💡</span> Lessons from {selectedCharacter.name}
            </h3>
            <div className="grid gap-2">
              {selectedCharacter.lessons.map((lesson, index) => (
                <div key={index} className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-700 pt-0.5 font-geist font-light">{lesson}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
              <span>💪</span> Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCharacter.strengths.map((strength, index) => (
                <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✓ {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          {selectedCharacter.weaknesses && selectedCharacter.weaknesses.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                <span>⚠️</span> Human Struggles
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.weaknesses.map((weakness, index) => (
                  <span key={index} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {weakness}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Legacy */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
              <span>🏆</span> Legacy
            </h3>
            <p className="text-gray-700 leading-relaxed font-geist font-light bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              {selectedCharacter.legacy}
            </p>
          </div>

          {/* Timeline */}
          {selectedCharacter.timeline && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                <span>📅</span> Timeline
              </h3>
              <p className="text-sm text-gray-700 font-geist font-light bg-gray-100 rounded-lg p-3">
                {selectedCharacter.timeline}
              </p>
            </div>
          )}

          {/* Related Characters */}
          {selectedCharacter.relatedCharacters && selectedCharacter.relatedCharacters.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                <span>👥</span> Related Characters
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.relatedCharacters.map((related, index) => (
                  <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {related}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">👤</span>
          <h2 className="text-2xl font-bold font-playfair">Biblical Characters</h2>
        </div>
        <p className="text-orange-100 text-sm">Learn from the lives of those who walked with God</p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search characters..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none font-geist"
        />
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {(Object.entries(categories) as [BiblicalCharacter['category'], typeof categories[keyof typeof categories]][]).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{value.icon}</span>
              {value.label}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Grid */}
      <div className="p-4 grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {filteredCharacters.map((character) => {
          const category = categories[character.category];
          return (
            <button
              key={character.id}
              onClick={() => {
                setSelectedCharacter(character);
                if (onCharacterSelect) {
                  onCharacterSelect(character.id);
                }
              }}
              className="bg-gray-50 rounded-xl p-4 text-left hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                  {character.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate font-geist">{character.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{character.title}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
