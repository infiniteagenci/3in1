export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  version: 'KJV' | 'NIV' | 'NKJV' | 'NASB' | 'ESV';
  book: string;
  chapter: number;
  verse: number;
  theme?: string;
}

export const bibleVerses: BibleVerse[] = [
  // Encouraging Verses
  {
    id: '1',
    reference: 'Jeremiah 29:11',
    text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
    version: 'NIV',
    book: 'Jeremiah',
    chapter: 29,
    verse: 11,
    theme: 'hope'
  },
  {
    id: '2',
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.',
    version: 'NKJV',
    book: 'Philippians',
    chapter: 4,
    verse: 13,
    theme: 'strength'
  },
  {
    id: '3',
    reference: 'Isaiah 41:10',
    text: 'Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand.',
    version: 'NKJV',
    book: 'Isaiah',
    chapter: 41,
    verse: 10,
    theme: 'courage'
  },
  {
    id: '4',
    reference: 'Psalm 23:4',
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 23,
    verse: 4,
    theme: 'comfort'
  },
  {
    id: '5',
    reference: 'Romans 8:28',
    text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.',
    version: 'NKJV',
    book: 'Romans',
    chapter: 8,
    verse: 28,
    theme: 'trust'
  },
  {
    id: '6',
    reference: 'Matthew 11:28',
    text: 'Come to Me, all you who labor and are heavy laden, and I will give you rest.',
    version: 'NKJV',
    book: 'Matthew',
    chapter: 11,
    verse: 28,
    theme: 'rest'
  },
  {
    id: '7',
    reference: 'Psalm 46:1',
    text: 'God is our refuge and strength, a very present help in trouble.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 46,
    verse: 1,
    theme: 'protection'
  },
  {
    id: '8',
    reference: '2 Timothy 1:7',
    text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
    version: 'NKJV',
    book: '2 Timothy',
    chapter: 1,
    verse: 7,
    theme: 'courage'
  },
  {
    id: '9',
    reference: 'Psalm 27:1',
    text: 'The LORD is my light and my salvation; whom shall I fear? The LORD is the strength of my life; of whom shall I be afraid?',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 27,
    verse: 1,
    theme: 'courage'
  },
  {
    id: '10',
    reference: 'Deuteronomy 31:6',
    text: 'Be strong and of good courage, do not fear nor be afraid of them; for the LORD your God, He is the One who goes with you. He will not leave you nor forsake you.',
    version: 'NKJV',
    book: 'Deuteronomy',
    chapter: 31,
    verse: 6,
    theme: 'courage'
  },
  // Faith & Trust
  {
    id: '11',
    reference: 'Hebrews 11:1',
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    version: 'NKJV',
    book: 'Hebrews',
    chapter: 11,
    verse: 1,
    theme: 'faith'
  },
  {
    id: '12',
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.',
    version: 'NKJV',
    book: 'Proverbs',
    chapter: 3,
    verse: 5,
    theme: 'trust'
  },
  {
    id: '13',
    reference: 'Psalm 37:5',
    text: 'Commit your way to the LORD, trust also in Him, and He shall bring it to pass.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 37,
    verse: 5,
    theme: 'trust'
  },
  {
    id: '14',
    reference: 'Mark 11:22',
    text: 'Jesus answered and said to them, "Have faith in God."',
    version: 'NKJV',
    book: 'Mark',
    chapter: 11,
    verse: 22,
    theme: 'faith'
  },
  {
    id: '15',
    reference: 'Psalm 56:3',
    text: 'Whenever I am afraid, I will trust in You.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 56,
    verse: 3,
    theme: 'trust'
  },
  // Love & Grace
  {
    id: '16',
    reference: 'John 3:16',
    text: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.',
    version: 'NKJV',
    book: 'John',
    chapter: 3,
    verse: 16,
    theme: 'love'
  },
  {
    id: '17',
    reference: '1 John 4:8',
    text: 'He who does not love does not know God, for God is love.',
    version: 'NKJV',
    book: '1 John',
    chapter: 4,
    verse: 8,
    theme: 'love'
  },
  {
    id: '18',
    reference: 'Romans 5:8',
    text: 'But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.',
    version: 'NKJV',
    book: 'Romans',
    chapter: 5,
    verse: 8,
    theme: 'love'
  },
  {
    id: '19',
    reference: 'Ephesians 2:8-9',
    text: 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.',
    version: 'NKJV',
    book: 'Ephesians',
    chapter: 2,
    verse: 8,
    theme: 'grace'
  },
  {
    id: '20',
    reference: '1 Corinthians 13:4-7',
    text: 'Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; does not behave rudely, does not seek its own, is not provoked, thinks no evil; does not rejoice in iniquity, but rejoices in the truth; bears all things, believes all things, hopes all things, endures all things.',
    version: 'NKJV',
    book: '1 Corinthians',
    chapter: 13,
    verse: 4,
    theme: 'love'
  },
  // Peace
  {
    id: '21',
    reference: 'Philippians 4:6-7',
    text: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.',
    version: 'NKJV',
    book: 'Philippians',
    chapter: 4,
    verse: 6,
    theme: 'peace'
  },
  {
    id: '22',
    reference: 'John 14:27',
    text: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
    version: 'NKJV',
    book: 'John',
    chapter: 14,
    verse: 27,
    theme: 'peace'
  },
  {
    id: '23',
    reference: 'Isaiah 26:3',
    text: 'You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You.',
    version: 'NKJV',
    book: 'Isaiah',
    chapter: 26,
    verse: 3,
    theme: 'peace'
  },
  {
    id: '24',
    reference: 'Colossians 3:15',
    text: 'And let the peace of God rule in your hearts, to which you were called in one body; and be thankful.',
    version: 'NKJV',
    book: 'Colossians',
    chapter: 3,
    verse: 15,
    theme: 'peace'
  },
  {
    id: '25',
    reference: 'Psalm 29:11',
    text: 'The LORD will give strength to His people; the LORD will bless His people with peace.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 29,
    verse: 11,
    theme: 'peace'
  },
  // Wisdom & Guidance
  {
    id: '26',
    reference: 'James 1:5',
    text: 'If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.',
    version: 'NKJV',
    book: 'James',
    chapter: 1,
    verse: 5,
    theme: 'wisdom'
  },
  {
    id: '27',
    reference: 'Proverbs 9:10',
    text: 'The fear of the LORD is the beginning of wisdom, and the knowledge of the Holy One is understanding.',
    version: 'NKJV',
    book: 'Proverbs',
    chapter: 9,
    verse: 10,
    theme: 'wisdom'
  },
  {
    id: '28',
    reference: 'Psalm 119:105',
    text: 'Your word is a lamp to my feet and a light to my path.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 119,
    verse: 105,
    theme: 'guidance'
  },
  {
    id: '29',
    reference: 'Proverbs 16:9',
    text: 'A man\'s heart plans his way, but the LORD directs his steps.',
    version: 'NKJV',
    book: 'Proverbs',
    chapter: 16,
    verse: 9,
    theme: 'guidance'
  },
  {
    id: '30',
    reference: 'Psalm 32:8',
    text: 'I will instruct you and teach you in the way you should go; I will guide you with My eye.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 32,
    verse: 8,
    theme: 'guidance'
  },
  // Strength & Perseverance
  {
    id: '31',
    reference: 'Isaiah 40:31',
    text: 'But those who wait on the LORD shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.',
    version: 'NKJV',
    book: 'Isaiah',
    chapter: 40,
    verse: 31,
    theme: 'strength'
  },
  {
    id: '32',
    reference: 'Galatians 6:9',
    text: 'And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart.',
    version: 'NKJV',
    book: 'Galatians',
    chapter: 6,
    verse: 9,
    theme: 'perseverance'
  },
  {
    id: '33',
    reference: 'Joshua 1:9',
    text: 'Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the LORD your God is with you wherever you go.',
    version: 'NKJV',
    book: 'Joshua',
    chapter: 1,
    verse: 9,
    theme: 'courage'
  },
  {
    id: '34',
    reference: '2 Corinthians 12:9',
    text: 'My grace is sufficient for you, for My strength is made perfect in weakness.',
    version: 'NKJV',
    book: '2 Corinthians',
    chapter: 12,
    verse: 9,
    theme: 'strength'
  },
  {
    id: '35',
    reference: 'Psalm 18:32',
    text: 'It is God who arms me with strength, and makes my way perfect.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 18,
    verse: 32,
    theme: 'strength'
  },
  // Prayer & Relationship with God
  {
    id: '36',
    reference: 'Matthew 7:7',
    text: 'Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you.',
    version: 'NKJV',
    book: 'Matthew',
    chapter: 7,
    verse: 7,
    theme: 'prayer'
  },
  {
    id: '37',
    reference: '1 Thessalonians 5:17',
    text: 'Pray without ceasing.',
    version: 'NKJV',
    book: '1 Thessalonians',
    chapter: 5,
    verse: 17,
    theme: 'prayer'
  },
  {
    id: '38',
    reference: 'Jeremiah 33:3',
    text: 'Call to Me, and I will answer you, and show you great and mighty things, which you do not know.',
    version: 'NKJV',
    book: 'Jeremiah',
    chapter: 33,
    verse: 3,
    theme: 'prayer'
  },
  {
    id: '39',
    reference: 'Psalm 145:18',
    text: 'The LORD is near to all who call upon Him, to all who call upon Him in truth.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 145,
    verse: 18,
    theme: 'prayer'
  },
  {
    id: '40',
    reference: 'James 5:16',
    text: 'The effective, fervent prayer of a righteous man avails much.',
    version: 'NKJV',
    book: 'James',
    chapter: 5,
    verse: 16,
    theme: 'prayer'
  },
  // Protection & Safety
  {
    id: '41',
    reference: 'Psalm 91:1-2',
    text: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the LORD, "He is my refuge and my fortress; my God, in Him I will trust."',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 91,
    verse: 1,
    theme: 'protection'
  },
  {
    id: '42',
    reference: 'Psalm 121:7-8',
    text: 'The LORD shall preserve you from all evil; He shall preserve your soul. The LORD shall preserve your going out and your coming in from this time forth, and even forevermore.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 121,
    verse: 7,
    theme: 'protection'
  },
  {
    id: '43',
    reference: '2 Thessalonians 3:3',
    text: 'The Lord is faithful, who will establish you and guard you from the evil one.',
    version: 'NKJV',
    book: '2 Thessalonians',
    chapter: 3,
    verse: 3,
    theme: 'protection'
  },
  {
    id: '44',
    reference: 'Nahum 1:7',
    text: 'The LORD is good, a stronghold in the day of trouble; and He knows those who trust in Him.',
    version: 'NKJV',
    book: 'Nahum',
    chapter: 1,
    verse: 7,
    theme: 'protection'
  },
  {
    id: '45',
    reference: 'Psalm 118:6',
    text: 'The LORD is on my side; I will not fear. What can man do to me?',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 118,
    verse: 6,
    theme: 'courage'
  },
  // Joy & Thanksgiving
  {
    id: '46',
    reference: 'Psalm 100:1-2',
    text: 'Make a joyful shout to the LORD, all you lands! Serve the LORD with gladness; come before His presence with singing.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 100,
    verse: 1,
    theme: 'joy'
  },
  {
    id: '47',
    reference: 'Nehemiah 8:10',
    text: 'Do not sorrow, for the joy of the LORD is your strength.',
    version: 'NKJV',
    book: 'Nehemiah',
    chapter: 8,
    verse: 10,
    theme: 'joy'
  },
  {
    id: '48',
    reference: 'Philippians 4:4',
    text: 'Rejoice in the Lord always. Again I will say, rejoice!',
    version: 'NKJV',
    book: 'Philippians',
    chapter: 4,
    verse: 4,
    theme: 'joy'
  },
  {
    id: '49',
    reference: '1 Thessalonians 5:18',
    text: 'In everything give thanks; for this is the will of God in Christ Jesus for you.',
    version: 'NKJV',
    book: '1 Thessalonians',
    chapter: 5,
    verse: 18,
    theme: 'thanksgiving'
  },
  {
    id: '50',
    reference: 'Psalm 107:1',
    text: 'Oh, give thanks to the LORD, for He is good! For His mercy endures forever.',
    version: 'NKJV',
    book: 'Psalm',
    chapter: 107,
    verse: 1,
    theme: 'thanksgiving'
  },
  // Salvation & Eternal Life
  {
    id: '51',
    reference: 'Romans 10:9',
    text: 'If you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved.',
    version: 'NKJV',
    book: 'Romans',
    chapter: 10,
    verse: 9,
    theme: 'salvation'
  },
  {
    id: '52',
    reference: 'Acts 4:12',
    text: 'Nor is there salvation in any other, for there is no other name under heaven given among men by which we must be saved.',
    version: 'NKJV',
    book: 'Acts',
    chapter: 4,
    verse: 12,
    theme: 'salvation'
  },
  {
    id: '53',
    reference: 'Ephesians 1:7',
    text: 'In Him we have redemption through His blood, the forgiveness of sins, according to the riches of His grace.',
    version: 'NKJV',
    book: 'Ephesians',
    chapter: 1,
    verse: 7,
    theme: 'salvation'
  },
  {
    id: '54',
    reference: 'Revelation 21:4',
    text: 'And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away.',
    version: 'NKJV',
    book: 'Revelation',
    chapter: 21,
    verse: 4,
    theme: 'eternal-life'
  },
  {
    id: '55',
    reference: 'John 14:6',
    text: 'Jesus said to him, "I am the way, the truth, and the life. No one comes to the Father except through Me."',
    version: 'NKJV',
    book: 'John',
    chapter: 14,
    verse: 6,
    theme: 'salvation'
  }
];

// Get a verse for the current day
export function getDailyVerse(): BibleVerse {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % bibleVerses.length;
  return bibleVerses[index];
}

// Get verses by theme
export function getVersesByTheme(theme: string): BibleVerse[] {
  return bibleVerses.filter(verse => verse.theme === theme);
}

// Get a random verse
export function getRandomVerse(): BibleVerse {
  const index = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[index];
}

// Get verse by ID
export function getVerseById(id: string): BibleVerse | undefined {
  return bibleVerses.find(verse => verse.id === id);
}
