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
  },
  // OLD TESTAMENT CHARACTERS
  {
    id: 'adam',
    name: 'Adam',
    title: 'First Man',
    emoji: '🍎',
    category: 'patriarch',
    era: 'c. 4000 BC',
    keyVerses: ['Genesis 2:7', 'Genesis 3:6', 'Romans 5:12'],
    story: 'Created by God from the dust of the earth, Adam was the first human being. He named the animals and tended the Garden of Eden. After eating the forbidden fruit with Eve, sin entered the world. He lived 930 years and had many children including Cain, Abel, and Seth.',
    lessons: ['Obedience to God matters', 'Sin has consequences', 'God provides even in judgment'],
    strengths: ['First human created by God', 'Father of humanity', 'Faithful to God\'s commands'],
    weaknesses: ['Disobeyed God by eating fruit', 'Blamed Eve for his sin'],
    legacy: 'First man, father of all humanity, through whom sin entered the world',
    relatedCharacters: ['Eve', 'Cain', 'Abel', 'Seth'],
    timeline: 'Created on sixth day, lived 930 years'
  },
  {
    id: 'noah',
    name: 'Noah',
    title: 'The Righteous',
    emoji: '🌈',
    category: 'patriarch',
    era: 'c. 2900 BC',
    keyVerses: ['Genesis 6:9', 'Genesis 7:1', 'Hebrews 11:7'],
    story: 'In a corrupt world, Noah was the only righteous man who walked with God. God commanded him to build an ark to save his family and animals from the coming flood. After 40 days and nights of rain, Noah and his family were saved. He lived 950 years.',
    lessons: ['Righteousness saves', 'Obedience brings salvation', 'God keeps His promises'],
    strengths: ['Righteous in corrupt generation', 'Faithful to God\'s commands', 'Patient builder'],
    weaknesses: ['Got drunk after the flood (showed human weakness)'],
    legacy: 'Saved humanity from the flood, father of all post-flood humanity',
    relatedCharacters: ['Shem', 'Ham', 'Japheth'],
    timeline: 'Built ark at 500, flood at 600, lived 950 years'
  },
  {
    id: 'isaac',
    name: 'Isaac',
    title: 'Child of Promise',
    emoji: '🌟',
    category: 'patriarch',
    era: 'c. 1896 BC',
    keyVerses: ['Genesis 21:3', 'Genesis 22:9', 'Hebrews 11:20'],
    story: 'The promised son of Abraham and Sarah in their old age. God tested Abraham by asking him to sacrifice Isaac, but stopped him at the last moment. Isaac married Rebekah and had twin sons Esau and Jacob. He preferred Esau but God\'s promise went through Jacob.',
    lessons: ['God keeps His promises', 'Faithful to God\'s will', 'Blessing follows obedience'],
    strengths: ['Faithful to God', 'Peacemaker', 'Prospered by God'],
    weaknesses: ['Showed favoritism toward Esau', 'Passive in family conflicts'],
    legacy: 'Father of Jacob (Israel) and Esau, through whom the twelve tribes came',
    relatedCharacters: ['Abraham', 'Sarah', 'Rebekah', 'Jacob', 'Esau'],
    timeline: 'Born to parents aged 100 and 90, sacrificed as youth, lived 180 years'
  },
  {
    id: 'jacob',
    name: 'Jacob',
    title: 'Israel',
    emoji: '⭐',
    category: 'patriarch',
    era: 'c. 1836 BC',
    keyVerses: ['Genesis 32:28', 'Genesis 35:10', 'Hosea 12:4'],
    story: 'Younger twin of Isaac and Rebekah who acquired Esau\'s birthright and blessing. He wrestled with God and received the name Israel. Had twelve sons who became the twelve tribes of Israel. His favorite son Joseph was sold into slavery but later saved the family from famine.',
    lessons: ['God can change anyone', 'Perseverance through struggle', 'God uses imperfect people'],
    strengths: ['Persevering in faith', 'Loved God deeply', 'Father of the nation'],
    weaknesses: ['Deceived his father and brother', 'Showed favoritism toward Joseph'],
    legacy: 'Father of the twelve tribes of Israel, renamed Israel by God',
    relatedCharacters: ['Isaac', 'Rebekah', 'Esau', 'Rachel', 'Leah', 'Joseph'],
    timeline: 'Lived 147 years, 20 years serving Laban, returned to Canaan'
  },
  {
    id: 'joseph',
    name: 'Joseph',
    title: 'Dreamer',
    emoji: '👔',
    category: 'leader',
    era: 'c. 1745 BC',
    keyVerses: ['Genesis 37:28', 'Genesis 50:20', 'Acts 7:9'],
    story: 'Favorite son of Jacob who was sold into slavery by his jealous brothers. In Egypt, he rose from prisoner to prime minister. When famine came, his brothers came to buy food and Joseph forgave them, saying "what you meant for evil, God meant for good."',
    lessons: ['God is with us in suffering', 'Faithfulness in trials', 'Forgiveness brings reconciliation'],
    strengths: ['Integrity in temptation', 'Wisdom in administration', 'Forgiving spirit'],
    weaknesses: ['Showed arrogance in dreams (youthful pride)'],
    legacy: 'Saved his family from famine, brought Israel to Egypt',
    relatedCharacters: ['Jacob', 'Rachel', 'Potiphar', 'Pharaoh'],
    timeline: 'Sold at 17, rose to power at 30, reunited with family at 39'
  },
  {
    id: 'joshua',
    name: 'Joshua',
    title: 'Servant Leader',
    emoji: '⚔️',
    category: 'warrior',
    era: 'c. 1406 BC',
    keyVerses: ['Joshua 1:9', 'Joshua 24:15', 'Hebrews 4:8'],
    story: 'Assistant to Moses who led Israel into the Promised Land. He commanded the army at Jericho where the walls fell down. Before his death, he challenged the people: "Choose this day whom you will serve...as for me and my house, we will serve the Lord."',
    lessons: ['Be strong and courageous', 'Complete obedience brings victory', 'Leadership requires serving God'],
    strengths: ['Courageous warrior', 'Faithful follower', 'Complete obedience to God'],
    weaknesses: ['Made treaty with Gibeonites without asking God'],
    legacy: 'Led Israel into the Promised Land, conquered Canaan',
    relatedCharacters: ['Moses', 'Caleb'],
    timeline: 'Assistant to Moses for 40 years, led Israel 25 years'
  },
  {
    id: 'gideon',
    name: 'Gideon',
    title: 'Mighty Warrior',
    emoji: '🛡️',
    category: 'warrior',
    era: 'c. 1100 BC',
    keyVerses: ['Judges 6:12', 'Judges 7:2', 'Hebrews 11:32'],
    story: 'Called by God to deliver Israel from Midianite oppression. Gideon asked for signs and reduced his army from 32,000 to just 300 men. With just 300 men carrying trumpets and torches, God defeated the vast Midianite army.',
    lessons: ['God uses the weak to shame the strong', 'Victory comes from God not numbers', 'Faith requires trust not sight'],
    strengths: ['Brave warrior', 'Obedient to God', 'Humble before the Lord'],
    weaknesses: ['Asked for signs repeatedly', 'Made an ephod that became an idol'],
    legacy: 'Delivered Israel from Midian, judge for 40 years',
    relatedCharacters: ['Midianites'],
    timeline: 'Judge during period of oppression, army reduced to 300 men'
  },
  {
    id: 'samson',
    name: 'Samson',
    title: 'Strongman Judge',
    emoji: '💪',
    category: 'warrior',
    era: 'c. 1050 BC',
    keyVerses: ['Judges 13:5', 'Judges 16:17', 'Judges 16:30'],
    story: 'A Nazirite from birth given supernatural strength to fight the Philistines. He killed a lion with his bare hands, defeated 1,000 men with a jawbone, and carried off city gates. After Delilah betrayed him and cut his hair, he was captured and blinded. His final act was pushing down the temple pillars, killing more Philistines in death than in life.',
    lessons: ['Gifted abilities come from God', 'Sexual sin brings destruction', 'God can still use us in failure'],
    strengths: ['Supernatural strength', 'Fought for Israel', 'Final act of faith'],
    weaknesses: ['Reckless with women', 'Disobeyed Nazirite vow', 'Vengeful'],
    legacy: 'Judged Israel for 20 years, killed many Philistines',
    relatedCharacters: ['Delilah', 'Philistines'],
    timeline: 'Nazarite from birth, judged 20 years, died pushing temple pillars'
  },
  {
    id: 'samuel',
    name: 'Samuel',
    title: 'God\'s Prophet',
    emoji: '📿',
    category: 'prophet',
    era: 'c. 1050 BC',
    keyVerses: ['1 Samuel 3:10', '1 Samuel 8:7', '1 Samuel 16:7'],
    story: 'Dedicated to God by his mother Hannah, Samuel served in the temple from childhood. God first spoke to him as a boy, and he became the last judge of Israel. He anointed both Saul and David as kings and faithfully guided Israel through the transition from judges to monarchy.',
    lessons: ['Children can serve God', 'Obedience better than sacrifice', 'Listen for God\'s voice'],
    strengths: ['Heard God clearly', 'Spoke truth to power', 'Faithful to God'],
    weaknesses: ['His sons were corrupt judges', 'Grieved over Saul'],
    legacy: 'Last judge, first prophet, anointed two kings',
    relatedCharacters: ['Eli', 'Saul', 'David', 'Hannah'],
    timeline: 'Served from childhood, judged Israel all his life'
  },
  {
    id: 'saul',
    name: 'Saul',
    title: 'First King',
    emoji: '👑',
    category: 'king',
    era: 'c. 1050 BC',
    keyVerses: ['1 Samuel 9:2', '1 Samuel 15:22', '1 Samuel 31:4'],
    story: 'Chosen as Israel\'s first king, tall and handsome. Early victories against the Ammonites made him popular. But disobedience at Gilgal cost him the kingdom. Jealousy of David drove him mad. He died in battle on Mount Gilboa, taking his own life to avoid capture.',
    lessons: ['Partial obedience is disobedience', 'Jealousy destroys', 'Heart matters more than appearance'],
    strengths: ['Brave warrior', 'Charismatic leader', 'Tall and handsome'],
    weaknesses: ['Disobeyed God', 'Jealous of David', 'Insecure and paranoid'],
    legacy: 'First king of Israel, rejected by God for David',
    relatedCharacters: ['Samuel', 'David', 'Jonathan'],
    timeline: 'Reigned 40 years, rejected by God after 2 years'
  },
  {
    id: 'solomon',
    name: 'Solomon',
    title: 'The Wise',
    emoji: '👑',
    category: 'king',
    era: 'c. 970 BC',
    keyVerses: ['1 Kings 3:12', '1 Kings 4:29', '1 Kings 11:4'],
    story: 'Son of David and Bathsheba, chosen by God to succeed his father. God granted him wisdom beyond any other person. He built the magnificent Temple in Jerusalem and wrote Proverbs, Ecclesiastes, and Song of Songs. His wealth and fame were legendary, but his foreign wives turned his heart from God.',
    lessons: ['Wisdom is a gift from God', 'Prosperity requires faithfulness', 'Worldly success is dangerous'],
    strengths: ['Wisest person ever', 'Great builder', 'Wrote Scripture'],
    weaknesses: ['Married foreign wives', 'Turned to idolatry', 'Taxed the people heavily'],
    legacy: 'Built the Temple, wrote wisdom literature, Israel\'s golden age',
    relatedCharacters: ['David', 'Bathsheba', 'Queen of Sheba'],
    timeline: 'Reigned 40 years, Temple built in 4th year'
  },
  {
    id: 'elijah',
    name: 'Elijah',
    title: 'Prophet of Fire',
    emoji: '🔥',
    category: 'prophet',
    era: 'c. 860 BC',
    keyVerses: ['1 Kings 17:1', '1 Kings 18:38', '2 Kings 2:11'],
    story: 'Prophet during Ahab\'s wicked reign who challenged the prophets of Baal. On Mount Carmel, he called down fire from heaven that consumed his offering and altar. God fed him by ravens during famine and took him to heaven in a whirlwind of fire.',
    lessons: ['God is the true God', 'Bold faith defeats falsehood', 'God provides miraculously'],
    strengths: ['Bold prophet', 'Powerful miracles', 'Faithful to God alone'],
    weaknesses: ['Fearful after Mount Carmel', 'Felt alone and discouraged'],
    legacy: 'Greatest Old Testament prophet, taken to heaven without dying',
    relatedCharacters: ['Ahab', 'Jezebel', 'Elisha', 'Obadiah'],
    timeline: 'Prophesied during Ahab\'s reign, taken to heaven in chariot of fire'
  },
  {
    id: 'elijsha',
    name: 'Elisha',
    title: 'Successor Prophet',
    emoji: '✨',
    category: 'prophet',
    era: 'c. 850 BC',
    keyVerses: ['2 Kings 2:9', '2 Kings 4:6', '2 Kings 13:20'],
    story: 'Successor to Elijah who asked for a double portion of Elijah\'s spirit. God granted him twice as many miracles. He raised the dead, cured leprosy, fed the hungry, and counseled kings. Even after his death, his bones raised a man to life.',
    lessons: ['God\'s power continues', 'Faithfulness brings blessing', 'Ministry to all people'],
    strengths: ['Double portion of miracles', 'Faithful successor', 'Compassionate prophet'],
    weaknesses: ['Got angry at the army commander (showed human emotion)'],
    legacy: 'Performed twice as many miracles as Elijah',
    relatedCharacters: ['Elijah', 'Naaman', 'Shunammite woman'],
    timeline: 'Prophesied about 50 years, performed many miracles'
  },
  {
    id: 'isaiah',
    name: 'Isaiah',
    title: 'Messianic Prophet',
    emoji: '📖',
    category: 'prophet',
    era: 'c. 740 BC',
    keyVerses: ['Isaiah 6:8', 'Isaiah 7:14', 'Isaiah 53'],
    story: 'Prophesied during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah. Had a vision of God\'s glory in the temple and volunteered to be God\'s spokesman. Prophesied the virgin birth, the suffering servant, and the coming Messiah. Tradition says he was martyred by being sawn in half.',
    lessons: ['Here am I, send me', 'God is holy and awesome', 'The Messiah will suffer for us'],
    strengths: ['Prophesied Messiah clearly', 'Faithful to God', 'Bold truth-teller'],
    weaknesses: ['Prophesied destruction (hard message)'],
    legacy: 'Wrote book of Isaiah with clear Messianic prophecies',
    relatedCharacters: ['Hezekiah', 'Ahaz'],
    timeline: 'Prophesied over 60 years during four reigns'
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah',
    title: 'Weeping Prophet',
    emoji: '😢',
    category: 'prophet',
    era: 'c. 626 BC',
    keyVerses: ['Jeremiah 1:5', 'Jeremiah 20:9', 'Jeremiah 31:31'],
    story: 'Called as a youth to prophesy during Judah\'s final years. He preached for 40 years but saw little response. His message of repentance was rejected. He was persecuted, imprisoned, and finally taken to Egypt where he died. He also prophesied the new covenant.',
    lessons: ['Faithfulness despite rejection', 'God\'s word must be spoken', 'New covenant is coming'],
    strengths: ['Faithful for 40 years', 'Prophesied new covenant', 'Bold truth-teller'],
    weaknesses: ['Complained about persecution', 'Questioned his calling'],
    legacy: 'Prophesied the Babylonian exile and new covenant',
    relatedCharacters: ['Josiah', 'Jehoiakim', 'Zedekiah'],
    timeline: 'Prophesied 40 years before and during exile'
  },
  {
    id: 'ezekiel',
    name: 'Ezekiel',
    title: 'Visionary Prophet',
    emoji: '👁️',
    category: 'prophet',
    era: 'c. 593 BC',
    keyVerses: ['Ezekiel 36:26', 'Ezekiel 37:1-14', 'Ezekiel 47:1'],
    story: 'Prophesied to the exiles in Babylon. His wife died as a sign to Israel. He had visions of God\'s glory departing from the temple, dry bones coming to life, and a restored temple. His prophetic style was dramatic and symbolic.',
    lessons: ['God is present even in exile', 'Restoration is coming', 'God\'s Spirit gives life'],
    strengths: ['Dramatic visions', 'Faithful in exile', 'Prophesied restoration'],
    weaknesses: ['Was struck mute at times'],
    legacy: 'Prophesied to exiles, visions of God\'s glory and restoration',
    relatedCharacters: ['Daniel', 'Jeremiah'],
    timeline: 'Prophesied during Babylonian exile'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    title: 'God\'s Ambassador',
    emoji: '🦁',
    category: 'prophet',
    era: 'c. 560 BC',
    keyVerses: ['Daniel 3:17', 'Daniel 6:10', 'Daniel 9:24'],
    story: 'Taken to Babylon as a youth, Daniel served in the royal court. He interpreted dreams for Nebuchadnezzar and read the writing on the wall for Belshazzar. His friends survived the fiery furnace, and he survived the lions\' den. He prophesied the coming Messiah and the 70 weeks.',
    lessons: ['Stand firm in faith', 'God is with us in trials', 'Prayer is essential'],
    strengths: ['Faithful in exile', 'Interpreted dreams', 'Man of prayer'],
    weaknesses: ['None recorded in Scripture'],
    legacy: 'Served in Babylon, prophesied Messiah\'s coming',
    relatedCharacters: ['Shadrach', 'Meshach', 'Abednego'],
    timeline: 'Served in Babylon from youth to old age'
  },
  {
    id: 'job',
    name: 'Job',
    title: 'Patient Sufferer',
    emoji: '💔',
    category: 'patriarch',
    era: 'c. 2000 BC',
    keyVerses: ['Job 1:22', 'Job 13:15', 'Job 42:5'],
    story: 'A wealthy, righteous man whom God allowed Satan to test. Satan destroyed his wealth, killed his children, and covered him with sores. His friends accused him of secret sin. Through it all, Job maintained his integrity. God restored him with double his former wealth.',
    lessons: ['God allows testing for our growth', 'Innocent suffering exists', 'God is sovereign over all'],
    strengths: ['Patient in suffering', 'Maintained integrity', 'Wrestled honestly with God'],
    weaknesses: ['Spoke words without knowledge (before God spoke)'],
    legacy: 'Example of patient endurance, book addresses the problem of suffering',
    relatedCharacters: ['Eliphaz', 'Bildad', 'Zophar', 'Elihu'],
    timeline: 'Lived in Uz, probably patriarch period'
  },
  {
    id: 'nehemiah',
    name: 'Nehemiah',
    title: 'Wall Builder',
    emoji: '🧱',
    category: 'leader',
    era: 'c. 445 BC',
    keyVerses: ['Nehemiah 2:4', 'Nehemiah 6:3', 'Nehemiah 8:10'],
    story: 'Cupbearer to the Persian king who heard of Jerusalem\'s ruined walls. With the king\'s permission, he returned to rebuild the wall in just 52 days despite opposition. He also helped Ezra reform the people and reinstate proper worship.',
    lessons: ['Leaders serve the people', 'Prayer + action = results', 'Complete the work God gives'],
    strengths: ['Effective leader', 'Man of prayer', 'Completed the wall quickly'],
    weaknesses: ['None recorded'],
    legacy: 'Rebuilt Jerusalem\'s walls, helped restore proper worship',
    relatedCharacters: ['Ezra', 'Artaxerxes'],
    timeline: 'Returned from exile in 20th year of Artaxerxes'
  },
  {
    id: 'ezra',
    name: 'Ezra',
    title: 'Scribe',
    emoji: '📜',
    category: 'leader',
    era: 'c. 458 BC',
    keyVerses: ['Ezra 7:10', 'Ezra 9:4', 'Nehemiah 8:1'],
    story: 'A priest and scribe who led the second return from exile. He taught the Law to the people and reformed their worship. Upon discovering many had married foreign women, he prayed for forgiveness and led the people to separate from their pagan wives.',
    lessons: ['Study and teach God\'s Word', 'Repent from sin', 'God\'s Word guides worship'],
    strengths: ['Devoted to Scripture', 'Humble reformer', 'Prayerful leader'],
    weaknesses: ['Overwhelmed by people\'s sin'],
    legacy: 'Restored proper worship, returned from exile with 1,754 men',
    relatedCharacters: ['Nehemiah', 'Artaxerxes'],
    timeline: 'Returned in 7th year of Artaxerxes, led reform'
  },
  {
    id: 'tobit',
    name: 'Tobit',
    title: 'Faithful Exile',
    emoji: '🙏',
    category: 'patriarch',
    era: 'c. 700 BC',
    keyVerses: ['Tobit 1:3', 'Tobit 4:7', 'Tobit 12:9'],
    story: 'A righteous Jew exiled to Nineveh who remained faithful to God\'s law. Despite being blinded, he continued to give alms and bury the dead. God sent the angel Raphael to guide his son Tobias on a journey where he found a wife and healed his father\'s blindness.',
    lessons: ['Faithfulness in exile', 'Prayer and fasting are powerful', 'Almsgiving delivers from death'],
    strengths: ['Faithful in pagan land', 'Generous to the poor', 'Taught his son well'],
    weaknesses: ['Was overly critical for burying the dead (caught by the)'],
    legacy: 'Deuterocanonical book shows faithful living in exile',
    relatedCharacters: ['Tobias', 'Sarah', 'Raphael'],
    timeline: 'Exiled to Nineveh, lived 112 years'
  },
  {
    id: 'judith',
    name: 'Judith',
    title: 'Brave Widow',
    emoji: '⚔️',
    category: 'warrior',
    era: 'c. 600 BC',
    keyVerses: ['Judith 8:32', 'Judith 13:15', 'Judith 16:13'],
    story: 'A beautiful, wealthy widow whose city was under siege by Holofernes. Fasting and praying, she went to the enemy camp and charmed the general. When he passed out drunk, she beheaded him and saved her city. Her courage inspired the Israelites to attack and win.',
    lessons: ['God uses the weak to defeat the strong', 'Prayer and fasting bring victory', 'Courageous faith saves lives'],
    strengths: ['Brave and cunning', 'Faithful to God', 'Saved her city'],
    weaknesses: ['Deceived the enemy (but in war)'],
    legacy: 'Saved Israel from destruction, example of courage',
    relatedCharacters: ['Holofernes', 'Achior'],
    timeline: 'Lived in Bethulia during siege'
  },
  // NEW TESTAMENT CHARACTERS
  {
    id: 'john-baptist',
    name: 'John the Baptist',
    title: 'Forerunner',
    emoji: '🌿',
    category: 'prophet',
    era: 'c. 30 AD',
    keyVerses: ['Matthew 3:11', 'John 1:29', 'Matthew 11:11'],
    story: 'Jesus called him the greatest born of women. He lived in the wilderness, wore camel hair, and ate locusts. He preached repentance and baptized many, including Jesus. He was martyred for speaking truth to power about Herod\'s marriage.',
    lessons: ['Prepare the way for the Lord', 'Bold truth-telling', 'Jesus must increase, I must decrease'],
    strengths: ['Fearless preacher', 'Humble servant', 'Baptized Jesus'],
    weaknesses: ['Questioned if Jesus was the one (doubt in prison)'],
    legacy: 'Prepared the way for Jesus, baptized Christ',
    relatedCharacters: ['Jesus', 'Elizabeth', 'Zacharias', 'Herod'],
    timeline: 'Born 6 months before Jesus, began ministry at 30'
  },
  {
    id: 'mary-mother',
    name: 'Mary',
    title: 'Mother of God',
    emoji: '🌹',
    category: 'matriarch',
    era: 'c. 20 BC',
    keyVerses: ['Luke 1:28', 'Luke 1:38', 'Luke 1:48'],
    story: 'A young virgin when the angel Gabriel announced she would bear God\'s Son. She gave her humble fiat: "Let it be done to me." Present at Jesus\' birth, His first miracle, and His crucifixion. God assumed her body and soul into heaven.',
    lessons: ['Complete surrender to God', 'Faithful disciple', 'Mother\'s intercession is powerful'],
    strengths: ['Humble handmaid', 'Faithful disciple', 'Presence in suffering'],
    weaknesses: ['None recorded'],
    legacy: 'Mother of God, Mother of the Church, model of faith',
    relatedCharacters: ['Jesus', 'Joseph', 'Elizabeth', 'John the Baptist'],
    timeline: 'Became mother at young age, stood at cross'
  },
  {
    id: 'joseph-husband',
    name: 'Joseph',
    title: 'Righteous Man',
    emoji: '🔨',
    category: 'patriarch',
    era: 'c. 20 BC',
    keyVerses: ['Matthew 1:20', 'Matthew 2:14', 'Luke 2:51'],
    story: 'A carpenter from Nazareth engaged to Mary. When he found her pregnant, he planned to divorce her quietly until an angel explained God\'s plan. He obeyed, married Mary, and raised Jesus as his own. He protected the family by fleeing to Egypt during Herod\'s slaughter.',
    lessons: ['Obedience to God\'s guidance', 'Protection of family', 'Faithfulness in trials'],
    strengths: ['Righteous', 'Obedient to dreams', 'Protective father'],
    weaknesses: ['None recorded'],
    legacy: 'Earthly father of Jesus, protector of the Holy Family',
    relatedCharacters: ['Mary', 'Jesus', 'Herod'],
    timeline: 'Married Mary, fled to Egypt, died before Jesus\' ministry'
  },
  {
    id: 'simon-peter',
    name: 'Peter',
    title: 'The Rock',
    emoji: '🔑',
    category: 'apostle',
    era: 'c. 30 AD',
    keyVerses: ['Matthew 16:18', 'John 21:15', 'Acts 2:14'],
    story: 'A fisherman called by Jesus to be a fisher of men. He walked on water but began to sink. Jesus gave him the keys to the kingdom and made him the first Pope. He denied Jesus three times but wept bitterly and was restored. He preached at Pentecost and led the early Church.',
    lessons: ['Jesus restores failures', 'Faith despite weakness', 'Peter was martyred in Rome crucified upside down'],
    strengths: ['Leader of apostles', 'Impulsive and bold', 'First Pope'],
    weaknesses: ['Denied Jesus', 'Impulsive', 'Cut off the servant\'s ear'],
    legacy: 'First Pope, led the early Church, wrote two epistles',
    relatedCharacters: ['Jesus', 'Andrew', 'James', 'John', 'Paul'],
    timeline: 'Followed Jesus for 3 years, led Church from Pentecost'
  },
  {
    id: 'andrew',
    name: 'Andrew',
    title: 'First Called',
    emoji: '🐟',
    category: 'apostle',
    era: 'c. 30 AD',
    keyVerses: ['John 1:40', 'Matthew 4:19', 'John 12:22'],
    story: 'Originally a disciple of John the Baptist who followed Jesus. He immediately brought his brother Peter to Jesus. Tradition says he preached in Greece and was martyred on an X-shaped cross.',
    lessons: ['Bring others to Jesus', 'Simple faith witnesses', 'Humble service'],
    strengths: ['First to follow Jesus', 'Evangelist', 'Brought Peter to Jesus'],
    weaknesses: ['None recorded'],
    legacy: 'First apostle called, preached in Greece',
    relatedCharacters: ['Peter', 'John the Baptist', 'Jesus'],
    timeline: 'Fisherman, followed Jesus from beginning'
  },
  {
    id: 'james-apostle',
    name: 'James the Greater',
    title: 'Sons of Thunder',
    emoji: '⚡',
    category: 'apostle',
    era: 'c. 44 AD',
    keyVerses: ['Mark 3:17', 'Mark 5:37', 'Acts 12:2'],
    story: 'Brother of John and one of Jesus\' inner three with Peter and John. Present at the Transfiguration and agony in the garden. Herod executed him with a sword, making him the first apostle martyred.',
    lessons: ['Zeal for God requires balance', 'Martyrdom is a witness', 'Inner circle with Jesus'],
    strengths: ['Part of inner three', 'Zealous for God', 'Martyred for faith'],
    weaknesses: ['Wanted to call fire on Samaritans (misplaced zeal)'],
    legacy: 'First apostle martyred, patron of Spain',
    relatedCharacters: ['John', 'Peter', 'Herod'],
    timeline: 'Martyred around 44 AD in Jerusalem'
  },
  {
    id: 'john-apostle',
    name: 'John the Apostle',
    title: 'Beloved Disciple',
    emoji: '❤️',
    category: 'apostle',
    era: 'c. 100 AD',
    keyVerses: ['John 13:23', 'John 19:26', 'John 21:24'],
    story: 'Brother of James and one of Jesus\' inner circle. He leaned on Jesus\' chest at the Last Supper. Jesus entrusted Mary to him from the cross. He wrote the fourth Gospel, three epistles, and Revelation. The only apostle to die of natural causes.',
    lessons: ['Intimacy with Jesus', 'Mary is our mother too', 'Love is the heart of faith'],
    strengths: ['Beloved disciple', 'Wrote Gospel and Revelation', 'Loved deeply'],
    weaknesses: ['Wanted to call fire on Samaritans (misplaced zeal)'],
    legacy: 'Wrote Gospel, three epistles, Revelation, died of old age',
    relatedCharacters: ['James', 'Peter', 'Mary', 'Jesus'],
    timeline: 'Youngest apostle, lived to old age, died in Ephesus'
  },
  {
    id: 'thomas',
    name: 'Thomas',
    title: 'Twin',
    emoji: '👆',
    category: 'apostle',
    era: 'c. 72 AD',
    keyVerses: ['John 20:24', 'John 20:28', 'John 11:16'],
    story: 'Also called Didymus (twin). He said he would not believe Jesus rose unless he could touch the wounds. When Jesus appeared and invited him to touch, Thomas exclaimed "My Lord and my God!" He preached in India and was martyred there.',
    lessons: ['Doubt can become faith', 'Jesus meets us in our doubts', 'Faith comes from encountering the risen Lord'],
    strengths: ['Brave and loyal', 'Wanted to die with Jesus', 'Brought faith to India'],
    weaknesses: ['Doubted the resurrection', 'Pessimistic by nature'],
    legacy: 'Brought Gospel to India, martyred there',
    relatedCharacters: ['Jesus', 'Peter'],
    timeline: 'Doubted resurrection, proclaimed faith in India'
  },
  {
    id: 'matthew',
    name: 'Matthew',
    title: 'Tax Collector',
    emoji: '📊',
    category: 'apostle',
    era: 'c. 70 AD',
    keyVerses: ['Matthew 9:9', 'Matthew 28:19'],
    story: 'A tax collector despised by his countrymen when Jesus called him. He left everything to follow Jesus. He wrote the first Gospel, directed primarily to Jews, showing Jesus as the Messiah promised in Scripture.',
    lessons: ['Jesus calls anyone', 'Sinners can become saints', 'Old Testament points to Jesus'],
    strengths: ['Wrote first Gospel', 'Faithful follower', 'Brought many to faith'],
    weaknesses: ['Tax collector was a despised profession'],
    legacy: 'Wrote Gospel, preached in Ethiopia, martyred there',
    relatedCharacters: ['Jesus', 'Peter'],
    timeline: 'Tax collector turned apostle, wrote Gospel'
  },
  {
    id: 'luke',
    name: 'Luke',
    title: 'Physician',
    emoji: '🩺',
    category: 'disciple',
    era: 'c. 80 AD',
    keyVerses: ['Luke 4:18', 'Colossians 4:14'],
    story: 'A doctor who was a companion of Paul. He wrote the third Gospel and Acts. His Gospel emphasizes Jesus\' compassion for the outcast, women, and the poor. He includes more parables and stories about women than the other Gospels.',
    lessons: ['Jesus cares for all people', 'Healing is part of the Kingdom', 'The Holy Spirit guides the Church'],
    strengths: ['Physician', 'Careful historian', 'Compassionate writer'],
    weaknesses: ['Not one of the twelve'],
    legacy: 'Wrote Gospel and Acts, companion of Paul',
    relatedCharacters: ['Paul', 'Jesus'],
    timeline: 'Travelled with Paul, wrote Gospel and Acts'
  },
  {
    id: 'mark',
    name: 'Mark',
    title: 'Interpreter',
    emoji: '📝',
    category: 'disciple',
    era: 'c. 68 AD',
    keyVerses: ['Mark 14:51', 'Acts 12:25'],
    story: 'Also called John Mark, he was Barnabas\'s cousin and Peter\'s interpreter. He wrote the second Gospel, which is the shortest and most action-oriented. Tradition says he founded the church in Alexandria.',
    lessons: ['Jesus is the Son of God', 'Action demonstrates faith', 'Failure in youth can be overcome'],
    strengths: ['Wrote Gospel', 'Missionary companion', 'Restored after failure'],
    weaknesses: ['Ran away naked at Jesus\' arrest (young and afraid)'],
    legacy: 'Wrote Gospel, preached in Egypt',
    relatedCharacters: ['Peter', 'Barnabas', 'Paul'],
    timeline: 'Companion of Peter and Paul, wrote Gospel'
  },
  {
    id: 'martha',
    name: 'Martha',
    title: 'Hostess',
    emoji: '🏠',
    category: 'disciple',
    era: 'c. 30 AD',
    keyVerses: ['Luke 10:41', 'John 11:25', 'John 12:2'],
    story: 'Sister of Lazarus and Mary who welcomed Jesus to her home. When Mary sat at Jesus\' feet, Martha complained about the work. Later, when Lazarus died, Martha confessed her faith that Jesus is the resurrection. Jesus raised Lazarus from the dead.',
    lessons: ['Service is good but listening is better', 'Jesus is the resurrection', 'Mary has chosen the better part'],
    strengths: ['Servant heart', 'Confessed faith in resurrection', 'Welcomed Jesus'],
    weaknesses: ['Anxious and worried', 'Complained about her sister'],
    legacy: 'Model of active service, confession of faith',
    relatedCharacters: ['Mary', 'Lazarus', 'Jesus'],
    timeline: 'Lived in Bethany, hosted Jesus'
  },
  {
    id: 'mary-bethany',
    name: 'Mary of Bethany',
    title: 'Disciple',
    emoji: '💧',
    category: 'disciple',
    era: 'c. 30 AD',
    keyVerses: ['Luke 10:42', 'John 12:3', 'John 11:32'],
    story: 'Sister of Lazarus and Martha who sat at Jesus\' feet listening to His teaching. She anointed Jesus\' feet with expensive perfume before His death. Jesus said she had "chosen the better part" that would not be taken away.',
    lessons: ['Listening to Jesus is essential', 'Worship is extravagant love', 'Mary has chosen the better part'],
    strengths: ['Devoted disciple', 'Listened to Jesus', 'Anointed Him with perfume'],
    weaknesses: ['None recorded'],
    legacy: 'Model of contemplative discipleship',
    relatedCharacters: ['Martha', 'Lazarus', 'Jesus'],
    timeline: 'Lived in Bethany, sat at Jesus\' feet'
  },
  {
    id: 'lazarus',
    name: 'Lazarus',
    title: 'Friend of Jesus',
    emoji: '✝️',
    category: 'disciple',
    era: 'c. 30 AD',
    keyVerses: ['John 11:25', 'John 11:43', 'John 12:10'],
    story: 'Brother of Martha and Mary, close friend of Jesus. He died and Jesus raised him from the dead after four days. The miracle caused many to believe, but also angered the chief priests. Many came to see him after he was raised.',
    lessons: ['Jesus has power over death', 'Resurrection is real', 'Friendship with Jesus changes everything'],
    strengths: ['Friend of Jesus', 'Was raised from death'],
    weaknesses: ['None recorded (he was dead)'],
    legacy: 'Raised from the dead after 4 days, a sign of Jesus\' power',
    relatedCharacters: ['Martha', 'Mary', 'Jesus'],
    timeline: 'Raised from death after 4 days'
  },
  {
    id: 'mary-magdalene-first',
    name: 'Mary Magdalene',
    title: 'Apostle to the Apostles',
    emoji: '🌸',
    category: 'disciple',
    era: 'c. 30 AD',
    keyVerses: ['Luke 8:2', 'John 20:16', 'Mark 16:9'],
    story: 'Jesus delivered her from seven demons. She became His faithful follower, supporting His ministry financially. She was the first to see the risen Christ and was sent to tell the apostles the good news. Tradition says she evangelized in France.',
    lessons: ['Jesus delivers completely', 'Women are first witnesses', 'Gratitude follows deliverance'],
    strengths: ['Loyal to Jesus to the end', 'Supported ministry', 'First to see risen Christ'],
    weaknesses: ['Had been possessed by seven demons'],
    legacy: 'First witness of resurrection, "apostle to the apostles"',
    relatedCharacters: ['Jesus', 'Peter', 'John'],
    timeline: 'Delivered from demons, followed Jesus, first at empty tomb'
  },
  {
    id: 'paul-first',
    name: 'Paul',
    title: 'Apostle to the Gentiles',
    emoji: '✝️',
    category: 'apostle',
    era: 'c. 67 AD',
    keyVerses: ['Acts 9:5', 'Romans 1:16', '2 Timothy 4:7'],
    story: 'Originally Saul the Pharisee who persecuted Christians. Jesus appeared to him on the road to Damascus and he was converted. He became the greatest missionary, traveling the Roman world preaching Christ. He wrote 13 epistles and was martyred in Rome.',
    lessons: ['Jesus can change anyone', 'Suffering for Christ is gain', 'The Gospel is for all nations'],
    strengths: ['Missionary genius', 'Wrote half the New Testament', 'Fearless preacher'],
    weaknesses: ['Persecuted Christians before conversion'],
    legacy: 'Apostle to the Gentiles, wrote 13 epistles, expanded the Church',
    relatedCharacters: ['Jesus', 'Peter', 'Barnabas', 'Silas', 'Timothy'],
    timeline: 'Converted on road to Damascus, 3 missionary journeys, martyred in Rome'
  },
  {
    id: 'timothy',
    name: 'Timothy',
    title: 'Faithful Companion',
    emoji: '🤝',
    category: 'disciple',
    era: 'c. 65 AD',
    keyVerses: ['2 Timothy 1:5', '1 Timothy 4:12', '1 Timothy 6:20'],
    story: 'Son of a Greek father and Jewish mother, he became Paul\'s protégé. He traveled with Paul on missionary journeys and was sent to lead churches. Paul wrote two letters to him encouraging him to not let anyone look down on his youth.',
    lessons: ['Young people can serve God', 'Faithfulness is learned', 'Use your gifts for God'],
    strengths: ['Loyal companion', 'Faithful to Paul', 'Led churches well'],
    weaknesses: ['Timid by nature', 'Had stomach ailments'],
    legacy: 'Companion of Paul, received two pastoral epistles',
    relatedCharacters: ['Paul', 'Eunice', 'Lois'],
    timeline: 'Traveled with Paul, led churches, died as martyr'
  },
  {
    id: 'barnabas',
    name: 'Barnabas',
    title: 'Son of Encouragement',
    emoji: '👍',
    category: 'disciple',
    era: 'c. 60 AD',
    keyVerses: ['Acts 4:36', 'Acts 9:27', 'Acts 11:24'],
    story: 'A Levite from Cyprus who sold his property to support the early church. He introduced Paul to the skeptical apostles. He mentored Mark when Paul rejected him. A man of grace who saw potential in others.',
    lessons: ['Encourage others', 'See the best in people', 'Generosity supports ministry'],
    strengths: ['Encourager', 'Generous', 'Saw potential in others'],
    weaknesses: ['Separated from Paul over Mark (reconciliation shows growth)'],
    legacy: 'Son of encouragement, introduced Paul to apostles',
    relatedCharacters: ['Paul', 'Mark', 'Peter'],
    timeline: 'Sold land for the poor, accompanied Paul on first journey'
  },
  {
    id: 'silas',
    name: 'Silas',
    title: 'Missionary Companion',
    emoji: '🎯',
    category: 'disciple',
    era: 'c. 55 AD',
    keyVerses: ['Acts 15:40', 'Acts 16:25', '2 Corinthians 1:19'],
    story: 'A leader in the Jerusalem church chosen to accompany Paul on his second missionary journey. He was imprisoned with Paul in Philippi and sang hymns to God during an earthquake. A faithful prophet who encouraged the churches.',
    lessons: ['Worship in suffering', 'Faithful in trials', 'Prophetic encouragement'],
    strengths: ['Faithful companion', 'Prophetic voice', 'Worshipped in prison'],
    weaknesses: ['None recorded'],
    legacy: 'Companion of Paul, leader in Jerusalem church',
    relatedCharacters: ['Paul', 'Timothy', 'Peter'],
    timeline: 'Accompanied Paul on second journey'
  },
  {
    id: 'stephen',
    name: 'Stephen',
    title: 'First Martyr',
    emoji: '👑',
    category: 'disciple',
    era: 'c. 35 AD',
    keyVerses: ['Acts 6:5', 'Acts 7:55', 'Acts 7:60'],
    story: 'One of seven deacons chosen to serve the early church. He performed great wonders and signs. His speech before the Sanhedrin angered them, and he became the first Christian martyr. As he died, he saw heaven open and Jesus standing at God\'s right hand.',
    lessons: 'Witness to the truth until death',
    strengths: ['Full of grace and power', 'Bold preacher', 'Forgave his murderers'],
    weaknesses: ['None recorded'],
    legacy: 'First martyr, his martyrdom began persecution',
    relatedCharacters: ['Paul', 'Saul'],
    timeline: 'Chosen as deacon, martyred by stoning'
  },
  {
    id: 'phillip-evangelist',
    name: 'Philip',
    title: 'Evangelist',
    emoji: '📢',
    category: 'disciple',
    era: 'c. 55 AD',
    keyVerses: ['John 1:45', 'Acts 8:5', 'Acts 8:26'],
    story: 'Found by Jesus, he immediately brought Nathanael to Him. Later he preached in Samaria and converted the Ethiopian eunuch. Tradition says he preached in Greece and was martyred at Hierapolis.',
    lessons: 'Bring others to Jesus',
    strengths: ['Evangelist', 'Brought Nathanael', 'Preached to Samaritans'],
    weaknesses: ['None recorded'],
    legacy: 'Preached to Samaritans and Ethiopian, four daughters who prophesied',
    relatedCharacters: ['Nathanael', 'Ethiopian eunuch'],
    timeline: 'Brought Nathanael to Jesus, preached in Samaria'
  },
  {
    id: 'nathanael',
    name: 'Nathanael (Bartholomew)',
    title: 'True Israelite',
    emoji: '🍇',
    category: 'apostle',
    era: 'c. 70 AD',
    keyVerses: ['John 1:47', 'John 1:49'],
    story: 'When Philip told him about Jesus of Nazareth, he said "Can anything good come from Nazareth?" Jesus saw him under the fig tree and he confessed "You are the Son of God, you are the King of Israel." Tradition says he preached in Armenia and was martyred.',
    lessons: 'Jesus knows us completely',
    strengths: ['Honest and direct', 'Faithful apostle', 'Preached in Armenia'],
    weaknesses: ['Prejudiced against Nazareth'],
    legacy: 'Bartholomew, apostle to Armenia, flayed for the faith',
    relatedCharacters: ['Jesus', 'Philip'],
    timeline: 'Called while under fig tree, preached in Armenia'
  },
  {
    id: 'james-lesser',
    name: 'James the Less',
    title: 'Brother of Jesus',
    emoji: '🌾',
    category: 'apostle',
    era: 'c. 62 AD',
    keyVerses: ['Galatians 1:19', 'Acts 15:13'],
    story: 'Cousin of Jesus and leader of the Jerusalem church. He wrote the epistle of James, emphasizing faith that works. He prayed in the temple so regularly that his knees became like camel\'s. He was martyred by being thrown from the temple and clubbed to death.',
    lessons: 'Faith without works is dead',
    strengths: ['Leader of Jerusalem church', 'Faithful in trial', 'Wrote epistle of James'],
    weaknesses: ['Did not believe in Jesus during ministry'],
    legacy: 'Wrote epistle of James, first bishop of Jerusalem',
    relatedCharacters: ['Jesus', 'Peter', 'Paul'],
    timeline: 'Leader in Jerusalem, wrote epistle, martyred'
  },
  {
    id: 'jude-thaddaeus',
    name: 'Jude (Thaddaeus)',
    title: 'Brother of James',
    emoji: '🙏',
    category: 'apostle',
    era: 'c. 65 AD',
    keyVerses: ['Jude 1:1', 'Luke 6:16'],
    story: 'Apostle and brother of James. He wrote the epistle of Jude, warning against false teachers. Tradition says he preached in Persia and was martyred there. He is the patron saint of lost causes.',
    lessons: 'Contend for the faith',
    strengths: ['Apostle', 'Wrote epistle', 'Preached in Persia'],
    weaknesses: ['Asked Jesus why He showed Himself to them not the world'],
    legacy: 'Wrote epistle of Jude, patron of lost causes',
    relatedCharacters: ['James', 'Jesus'],
    timeline: 'Apostle, wrote epistle, martyred in Persia'
  },
  {
    id: 'simon-zealot',
    name: 'Simon the Zealot',
    title: 'Zealot',
    emoji: '🔥',
    category: 'apostle',
    era: 'c. 70 AD',
    keyVerses: ['Luke 6:15'],
    story: 'Member of the Zealots, a Jewish group opposed to Roman rule. Jesus called him to be an apostle. After Jesus\' ascension, he preached in Egypt and Persia. Tradition says he and Jude were martyred together.',
    lessons: 'Political zeal must be directed to God\'s kingdom',
    strengths: ['Zealous for God', 'Apostle', 'Missionary to Persia'],
    weaknesses: ['Zealot background (political)'],
    legacy: 'Apostle to Egypt, missionary to Persia',
    relatedCharacters: ['Jude', 'Jesus'],
    timeline: 'Zealot turned apostle, preached in Egypt'
  },
  {
    id: 'matthias',
    name: 'Matthias',
    title: 'Replacement Apostle',
    emoji: '📋',
    category: 'apostle',
    era: 'c. 80 AD',
    keyVerses: ['Acts 1:23', 'Acts 1:26'],
    story: 'Chosen to replace Judas Iscariot. He had been with Jesus from the baptism of John until the ascension. He cast lots with the other eleven and was chosen. Tradition says he preached in Ethiopia and was martyred.',
    lessons: 'God restores what is lost',
    strengths: ['Followed Jesus from baptism', 'Chosen by lot', 'Faithful apostle'],
    weaknesses: ['None recorded'],
    legacy: 'Replaced Judas, preached in Ethiopia',
    relatedCharacters: ['Jesus', 'Peter'],
    timeline: 'Followed Jesus from beginning, replaced Judas'
  },
  {
    id: 'cornelius',
    name: 'Cornelius',
    title: 'First Gentile',
    emoji: '🏠',
    category: 'disciple',
    era: 'c. 36 AD',
    keyVerses: ['Acts 10:2', 'Acts 10:44'],
    story: 'A Roman centurion in Caesarea who was God-fearing and generous. An angel told him to send for Peter. When Peter arrived, Cornelius and his household received the Holy Spirit, showing Gentiles could become Christians.',
    lessons: 'God welcomes all people',
    strengths: ['God-fearing', 'Generous', 'Prayerful'],
    weaknesses: ['None recorded'],
    legacy: 'First Gentile convert, showed God\'s plan for all nations',
    relatedCharacters: ['Peter', 'angel'],
    timeline: 'Centurion when Peter came, received Holy Spirit'
  },
  {
    id: 'lydia',
    name: 'Lydia',
    title: 'Purple Seller',
    emoji: '💜',
    category: 'disciple',
    era: 'c. 50 AD',
    keyVerses: ['Acts 16:14', 'Acts 16:15', 'Acts 16:40'],
    story: 'A businesswoman in Philippi who sold purple cloth. When Paul preached, the Lord opened her heart to respond. She was baptized and her household became the first European converts. She insisted Paul stay at her house.',
    lessons: 'Business can be ministry',
    strengths: ['Successful businesswoman', 'Generous host', 'First European convert'],
    weaknesses: ['None recorded'],
    legacy: 'First European convert, housed Paul',
    relatedCharacters: ['Paul', 'Silas'],
    timeline: 'Purple seller in Philippi, baptized by Paul'
  },
  {
    id: 'priscilla',
    name: 'Priscilla',
    title: 'Teacher',
    emoji: '👩‍🏫',
    category: 'disciple',
    era: 'c. 55 AD',
    keyVerses: ['Acts 18:26', 'Romans 16:3'],
    story: 'Jewish tentmaker who with her husband Aquila taught Apollos more accurately about Jesus. They were close co-workers of Paul and risked their lives for him. They hosted a church in their home.',
    lessons: 'Women can teach men',
    strengths: ['Teacher of Apollos', 'Risked life for Paul', 'Hosted church in home'],
    weaknesses: ['None recorded'],
    legacy: 'Taught Apollos, co-worker with Paul',
    relatedCharacters: ['Aquila', 'Paul', 'Apollos'],
    timeline: 'Tentmaker with husband Aquila, taught Apollos'
  },
  {
    id: 'aquila',
    name: 'Aquila',
    title: 'Tentmaker',
    emoji: '⛺',
    category: 'disciple',
    era: 'c. 55 AD',
    keyVerses: ['Acts 18:2', 'Acts 18:26', 'Romans 16:3'],
    story: 'Jewish tentmaker expelled from Rome with his wife Priscilla. They met Paul in Corinth and worked together. They taught Apollos and became faithful co-workers in the Gospel.',
    lessons: 'Work can be ministry',
    strengths: ['Tentmaker', 'Faithful co-worker', 'Taught Apollos'],
    weaknesses: ['Expelled from Rome (Claudius edict)'],
    legacy: 'Co-worker with Paul, taught Apollos',
    relatedCharacters: ['Priscilla', 'Paul', 'Apollos'],
    timeline: 'Tentmaker with wife Priscilla, co-worker with Paul'
  },
  {
    id: 'apollos',
    name: 'Apollos',
    title: 'Eloquent',
    emoji: '🗣️',
    category: 'disciple',
    era: 'c. 55 AD',
    keyVerses: ['Acts 18:24', 'Acts 18:26', '1 Corinthians 3:6'],
    story: 'An Alexandrian Jew learned in the Scriptures who came to Ephesus preaching about Jesus. Priscilla and Aquila taught him more accurately. He became a powerful speaker, proving from Scripture that Jesus is the Christ. He later ministered in Corinth.',
    lessons: 'We can all learn more',
    strengths: ['Learned in Scripture', 'Powerful preacher', 'Mighty in the Scriptures'],
    weaknesses: ['Knew only John\'s baptism initially'],
    legacy: 'Eloquent preacher, taught more accurately by Priscilla and Aquila',
    relatedCharacters: ['Priscilla', 'Aquila', 'Paul'],
    timeline: 'Learned from Priscilla and Aquila, ministered in Corinth'
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
}

export default function BiblicalCharacters({ className = '' }: BiblicalCharactersProps) {
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
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
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
      <div className="p-4 grid grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
        {filteredCharacters.map((character) => {
          const category = categories[character.category];
          return (
            <button
              key={character.id}
              onClick={() => setSelectedCharacter(character)}
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
