export interface StudyLesson {
  id: string;
  title: string;
  description: string;
  verses: string[];
  questions: string[];
  prayer: string;
  reflection: string;
  completed?: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  category: 'foundations' | 'character' | 'themes' | 'life-application';
  duration: string;
  lessons: StudyLesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  totalLessons: number;
}

export const bibleStudyPlans: StudyPlan[] = [
  {
    id: 'foundations-1',
    title: 'Understanding God\'s Love',
    description: 'Discover the depth and breadth of God\'s unconditional love for you through Scripture.',
    category: 'foundations',
    duration: '7 days',
    difficulty: 'beginner',
    totalLessons: 7,
    lessons: [
      {
        id: 'love-1',
        title: 'God Created You with Love',
        description: 'Explore how God\'s love was the foundation of creation.',
        verses: ['Genesis 1:27', 'Psalm 139:13-14', 'Jeremiah 1:5'],
        questions: [
          'What does it mean to be created in God\'s image?',
          'How does knowing God formed you personally change how you see yourself?',
          'In what ways can you thank God for His intentional creation?'
        ],
        prayer: 'Heavenly Father, thank You for creating me with intention and love. Help me to see myself through Your eyes and embrace the purpose You have for my life. In Jesus\' name, Amen.',
        reflection: 'Take time to appreciate the unique way God made you. Write down three things you love about how God created you.'
      },
      {
        id: 'love-2',
        title: 'God\'s Unconditional Love',
        description: 'Learn how God\'s love for you is not based on your performance.',
        verses: ['Romans 5:8', 'Romans 8:38-39', '1 John 4:9-10'],
        questions: [
          'What does "while we were still sinners" reveal about God\'s love?',
          'How can nothing separate us from God\'s love?',
          'What does God\'s love cost Him?'
        ],
        prayer: 'Lord Jesus, thank You for loving me even when I was far from You. Help me to receive Your love fully and share it with others. Amen.',
        reflection: 'Reflect on a time when you felt unworthy of love. How does God\'s unconditional love change that moment?'
      },
      {
        id: 'love-3',
        title: 'Love That Transforms',
        description: 'See how God\'s love changes us from the inside out.',
        verses: ['2 Corinthians 5:17', 'Ephesians 2:4-5', 'Titus 3:4-5'],
        questions: [
          'What does it mean to be a "new creation"?',
          'How does God\'s mercy motivate our transformation?',
          'What areas of your life need God\'s transforming love?'
        ],
        prayer: 'Holy Spirit, transform me by Your love. Remove anything that hinders Your work in my life. Make me more like Jesus each day. Amen.',
        reflection: 'Identify one area where you need God\'s transformation. Pray specifically for that area today.'
      },
      {
        id: 'love-4',
        title: 'Love in Action',
        description: 'See how God demonstrated His love through Jesus.',
        verses: ['John 3:16', '1 John 4:9-10', 'Romans 8:32'],
        questions: [
          'Why did God give His only Son?',
          'What was the ultimate demonstration of God\'s love?',
          'How does Jesus\' sacrifice show God\'s love?'
        ],
        prayer: 'Father, thank You for the greatest gift - Your Son Jesus. Help me never to take this sacrifice for granted. Fill my heart with gratitude. Amen.',
        reflection: 'Imagine standing at the foot of the cross. What would you say to Jesus?'
      },
      {
        id: 'love-5',
        title: 'Experiencing God\'s Love Daily',
        description: 'Learn practical ways to experience and remember God\'s love every day.',
        verses: ['Lamentations 3:22-23', 'Psalm 36:7', 'Isaiah 43:1-4'],
        questions: [
          'How are God\'s mercies "new every morning"?',
          'What does it mean to find refuge in God\'s love?',
          'How can you remember you are precious and honored in God\'s sight?'
        ],
        prayer: 'Lord, awaken me to Your fresh mercies today. Let me walk in the confidence that I am Your beloved child. Amen.',
        reflection: 'Start a "love journal" - record one way you experienced God\'s love each day this week.'
      },
      {
        id: 'love-6',
        title: 'Loving Others Because He First Loved Us',
        description: 'Let God\'s love flow through you to others.',
        verses: ['1 John 4:19', 'John 13:34-35', '1 Corinthians 13:4-7'],
        questions: [
          'Why can we love others?',
          'What marks us as Jesus\' disciples?',
          'How does love "cover a multitude of sins"?'
        ],
        prayer: 'Jesus, fill my heart with Your love so it overflows to others. Help me love as You love - patiently, sacrificially, and unconditionally. Amen.',
        reflection: 'Think of someone difficult to love. Ask God to give you His heart for them.'
      },
      {
        id: 'love-7',
        title: 'Secure in God\'s Love Forever',
        description: 'Find assurance that nothing can separate you from God\'s love.',
        verses: ['Romans 8:35-39', 'Jude 1:24-25', 'Hebrews 13:5'],
        questions: [
          'What cannot separate us from God\'s love?',
          'How is God able to keep you from falling?',
          'What does "never leave you nor forsake you" mean?'
        ],
        prayer: 'Father, thank You that Your love is eternal and unshakable. Anchor my soul in this truth today and forever. In Jesus\' name, Amen.',
        reflection: 'Write Romans 8:38-39 on a card and memorize it. Let it be your anchor in difficult times.'
      }
    ]
  },
  {
    id: 'foundations-2',
    title: 'Building Your Prayer Life',
    description: 'Develop a deeper, more meaningful prayer relationship with God.',
    category: 'foundations',
    duration: '7 days',
    difficulty: 'beginner',
    totalLessons: 7,
    lessons: [
      {
        id: 'prayer-1',
        title: 'Why Pray?',
        description: 'Understand the purpose and power of prayer in your life.',
        verses: ['Matthew 7:7-11', 'Philippians 4:6-7', '1 Thessalonians 5:17'],
        questions: [
          'Why does God want us to pray if He already knows our needs?',
          'What promise does Jesus make about asking, seeking, and knocking?',
          'How can prayer combat anxiety?'
        ],
        prayer: 'Father, thank You that You invite me to come to You in prayer. Teach me to pray with faith and persistence. In Jesus\' name, Amen.',
        reflection: 'What keeps you from praying more regularly? Bring this to God honestly.'
      },
      {
        id: 'prayer-2',
        title: 'The Lord\'s Prayer',
        description: 'Learn to pray using Jesus\' model prayer.',
        verses: ['Matthew 6:9-13', 'Luke 11:1-4'],
        questions: [
          'What does "hallowed be Your name" teach us about reverence?',
          'What does "Your will be done" reveal about surrender?',
          'How does this prayer guide our priorities?'
        ],
        prayer: 'Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done, on earth as it is in heaven. Give us today our daily bread. And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from the evil one. For Yours is the kingdom and the power and the glory forever. Amen.',
        reflection: 'Slowly pray through each phrase of the Lord\'s Prayer. What stands out to you?'
      },
      {
        id: 'prayer-3',
        title: 'Praying with Faith',
        description: 'Learn how to pray bold, faith-filled prayers.',
        verses: ['Mark 11:22-24', 'James 1:5-8', 'Hebrews 11:6'],
        questions: [
          'What does it mean to have faith in God?',
          'How can doubt hinder our prayers?',
          'What must we believe to please God?'
        ],
        prayer: 'Lord, increase my faith! Help me to pray with confidence, knowing You hear and answer. I trust Your goodness and Your timing. Amen.',
        reflection: 'What\'s one bold prayer you\'ve been afraid to pray? Pray it today with faith.'
      },
      {
        id: 'prayer-4',
        title: 'Praying for Others',
        description: 'Discover the power of intercessory prayer.',
        verses: ['Ephesians 6:18-20', 'Colossians 1:9-14', '1 Timothy 2:1-4'],
        questions: [
          'Who are we commanded to pray for?',
          'What did Paul pray for the Colossian believers?',
          'Why is intercessory prayer important?'
        ],
        prayer: 'Lord, I lift up ___ to You today. Draw them close to Your heart. Meet their needs. Open their eyes to Your truth. In Jesus\' name, Amen.',
        reflection: 'Make a list of 5 people to pray for daily. Commit to interceding for them this week.'
      },
      {
        id: 'prayer-5',
        title: 'Praying God\'s Word',
        description: 'Learn to pray Scripture back to God.',
        verses: ['Psalm 119:9-11', 'Psalm 143:1-2', 'Psalm 25:4-5'],
        questions: [
          'How does God\'s Word help us stay pure?',
          'Why is praying God\'s Word powerful?',
          'What does it mean to ask God to "teach me"?'
        ],
        prayer: 'Based on Psalm 25:4-5: "Show me Your ways, LORD, teach me Your paths. Guide me in Your truth and teach me, for You are God my Savior, and my hope is in You all day long."',
        reflection: 'Choose one Psalm verse and personalize it as your own prayer.'
      },
      {
        id: 'prayer-6',
        title: 'Praying Without Ceasing',
        description: 'Learn to maintain a continual conversation with God.',
        verses: ['Nehemiah 2:4-5', '1 Thessalonians 5:17', 'Psalm 16:8'],
        questions: [
          'What does "pray without ceasing" look like practically?',
          'How did Nehemiah pray in the moment of need?',
          'How can you keep God before you all day?'
        ],
        prayer: 'Lord, teach me to walk in constant communion with You. Whether in word or thought, may my heart always be turned toward You. Amen.',
        reflection: 'Set three reminders on your phone today. When it goes off, pause and pray briefly.'
      },
      {
        id: 'prayer-7',
        title: 'When Prayer Feels Difficult',
        description: 'Learn to persist in prayer even when you don\'t feel like it.',
        verses: ['Psalm 22:1-2', 'Matthew 26:39', 'Romans 8:26-27'],
        questions: [
          'Why does God allow us to express our pain in prayer?',
          'How did Jesus pray in His moment of anguish?',
          'How does the Holy Spirit help us pray?'
        ],
        prayer: 'Lord, when prayer feels dry or difficult, help me to persist. Thank You that Your Spirit prays for me with groanings too deep for words. In Jesus\' name, Amen.',
        reflection: 'Honesty with God is vital. Tell God exactly how you\'re feeling about prayer today.'
      }
    ]
  },
  {
    id: 'character-1',
    title: 'Heroes of the Faith: David',
    description: 'Explore the life of David - a man after God\'s own heart.',
    category: 'character',
    duration: '5 days',
    difficulty: 'intermediate',
    totalLessons: 5,
    lessons: [
      {
        id: 'david-1',
        title: 'The Shepherd Boy',
        description: 'How God prepared David in obscurity.',
        verses: ['1 Samuel 16:7', '1 Samuel 17:34-37', 'Psalm 23'],
        questions: [
          'What did God value that Jesse did not?',
          'How did facing lions and bears prepare David for Goliath?',
          'What does "The LORD is my shepherd" mean to you?'
        ],
        prayer: 'Lord, prepare my heart in the quiet places. Help me to be faithful in small things, trusting You for bigger battles. In Jesus\' name, Amen.',
        reflection: 'What "small thing" is God using to prepare you right now?'
      },
      {
        id: 'david-2',
        title: 'Facing Giants',
        description: 'Learn courage from David\'s confrontation with Goliath.',
        verses: ['1 Samuel 17:45-47', '1 Samuel 17:32', 'Deuteronomy 20:4'],
        questions: [
          'What gave David confidence to face Goliath?',
          'How did David\'s past faithfulness prepare him?',
          'What "giant" are you facing today?'
        ],
        prayer: 'Lord, give me David-like courage. I face ___ in Your strength. The battle is Yours, not mine. In Jesus\' name, Amen.',
        reflection: 'Name your "Goliath." Now write down past victories that prove God is faithful.'
      },
      {
        id: 'david-3',
        title: 'Waiting on God\'s Timing',
        description: 'The years between anointing and becoming king.',
        verses: ['Psalm 27:14', 'Psalm 37:7', 'Psalm 40:1-3'],
        questions: [
          'Why is waiting so difficult?',
          'What does it mean to "wait patiently for Him"?',
          'How can waiting strengthen our faith?'
        ],
        prayer: 'Lord, I\'m waiting for ___. Help me to wait well, trust You, and not take matters into my own hands. Your timing is perfect. Amen.',
        reflection: 'What are you waiting for? Surrender the timeline to God today.'
      },
      {
        id: 'david-4',
        title: 'A Man After God\'s Own Heart',
        description: 'What made David\'s heart special to God?',
        verses: ['1 Samuel 13:14', 'Acts 13:22', 'Psalm 51:10-17'],
        questions: [
          'What does "a man after My own heart" mean?',
          'How did David respond to correction?',
          'What sacrifices does God truly desire?'
        ],
        prayer: 'Create in me a clean heart, O God. Renew a right spirit within me. Let me be someone who seeks Your heart above all else. In Jesus\' name, Amen.',
        reflection: 'What does it look like to pursue God\'s heart rather than His hand?'
      },
      {
        id: 'david-5',
        title: 'David\'s Legacy',
        description: 'The lasting impact of a life surrendered to God.',
        verses: ['Acts 13:36', '2 Samuel 23:1-4', 'Psalm 71:18'],
        questions: [
          'What does "served God\'s purpose in his generation" mean?',
          'What kind of legacy do you want to leave?',
          'How did David finish well?'
        ],
        prayer: 'Lord, let me serve Your purpose in my generation. Use my life for Your glory. When my time comes, may it be said I followed You wholeheartedly. Amen.',
        reflection: 'If you could pick one legacy, what would it be? How are you building that today?'
      }
    ]
  },
  {
    id: 'themes-1',
    title: 'Trust in God',
    description: 'Learn to trust God completely in every circumstance.',
    category: 'themes',
    duration: '7 days',
    difficulty: 'intermediate',
    totalLessons: 7,
    lessons: [
      {
        id: 'trust-1',
        title: 'What Is Trust?',
        description: 'Understanding biblical trust versus worldly confidence.',
        verses: ['Proverbs 3:5-6', 'Psalm 37:3', 'Isaiah 26:4'],
        questions: [
          'What does "lean not on your own understanding" mean?',
          'How do we "trust in the LORD and do good"?',
          'Why is God called "the Rock everlasting"?'
        ],
        prayer: 'Lord, I confess I often trust my own understanding. Teach me to lean entirely on You. You are my Rock and my Salvation. In Jesus\' name, Amen.',
        reflection: 'What area do you struggle to trust God with most?'
      },
      {
        id: 'trust-2',
        title: 'Trust When You Don\'t Understand',
        description: 'Trusting God when His ways don\'t make sense.',
        verses: ['Isaiah 55:8-9', 'Proverbs 16:9', 'Psalm 119:105'],
        questions: [
          'How are God\'s thoughts higher than ours?',
          'How can we plan our way while God directs our steps?',
          'Why is God\'s Word a lamp to our feet?'
        ],
        prayer: 'Father, Your ways are higher than mine. When I don\'t understand, help me to trust Your character. You know the end from the beginning. In Jesus\' name, Amen.',
        reflection: 'Recall a time when God\'s plan turned out better than yours. Thank Him for that.'
      },
      {
        id: 'trust-3',
        title: 'Trust in Difficult Times',
        description: 'Trusting God when life is hard.',
        verses: ['Daniel 3:17-18', 'Habakkuk 3:17-19', '2 Corinthians 1:8-9'],
        questions: [
          'What gave Shadrach, Meshach, and Abednego such bold trust?',
          'How could Habakkuk rejoice even in loss?',
          'How does suffering teach us to rely on God?'
        ],
        prayer: 'Lord, even if ___ happens, I will trust You. You are good. You are faithful. You are worthy of my trust, no matter what. In Jesus\' name, Amen.',
        reflection: 'What "even if" are you facing? Surrender it to God with trust.'
      },
      {
        id: 'trust-4',
        title: 'Trust With Your Finances',
        description: 'Trusting God as your provider.',
        verses: ['Matthew 6:25-34', 'Philippians 4:19', 'Malachi 3:10'],
        questions: [
          'Why does worry show a lack of trust?',
          'What promise does God make about providing our needs?',
          'How does giving demonstrate trust?'
        ],
        prayer: 'Father, You know what I need before I ask. Forgive my worry. You are my Provider. I will seek Your kingdom first. In Jesus\' name, Amen.',
        reflection: 'What financial worry keeps you up at night? Give it to God today.'
      },
      {
        id: 'trust-5',
        title: 'Trust With Your Future',
        description: 'Trusting God with your unknown tomorrow.',
        verses: ['Jeremiah 29:11', 'Psalm 32:8', 'Psalm 119:133'],
        questions: [
          'What kind of plans does God have for you?',
          'How does God guide our steps?',
          'Why can we face the future with confidence?'
        ],
        prayer: 'Lord, I don\'t know what the future holds, but I know You hold the future. Order my steps according to Your Word. Let no sin rule over me. In Jesus\' name, Amen.',
        reflection: 'What future fear do you need to surrender to God?'
      },
      {
        id: 'trust-6',
        title: 'Trust With Your Relationships',
        description: 'Trusting God with the people in your life.',
        verses: ['1 Peter 5:7', 'Philippians 1:6', 'Psalm 55:22'],
        questions: [
          'Why can we cast all anxiety on God?',
          'What is God\'s promise about the work He began in you?',
          'What does it mean to cast your burden on the LORD?'
        ],
        prayer: 'Lord, I surrender ___ to You. Only You can change hearts. I release control and trust You with this relationship. In Jesus\' name, Amen.',
        reflection: 'Is there a relationship you\'re trying to control? Give it to God.'
      },
      {
        id: 'trust-7',
        title: 'Growing in Trust',
        description: 'How trust in God grows over time.',
        verses: ['Psalm 9:10', 'Psalm 56:3', 'Proverbs 3:24-26'],
        questions: [
          'What is the connection between knowing God and trusting Him?',
          'How can we trust God "at all times"?',
          'What confidence does God give His followers?'
        ],
        prayer: 'Lord, may my trust in You grow daily. When I am afraid, I will trust in You. You are my refuge, my fortress, my confidence. In Jesus\' name, Amen.',
        reflection: 'How has your trust in God grown over the past year? Thank Him for that growth.'
      }
    ]
  },
  {
    id: 'life-1',
    title: 'Finding Peace in Anxiety',
    description: 'Biblical answers for worry, fear, and anxiety.',
    category: 'life-application',
    duration: '7 days',
    difficulty: 'beginner',
    totalLessons: 7,
    lessons: [
      {
        id: 'peace-1',
        title: 'Why We Worry',
        description: 'Understanding the root of anxiety.',
        verses: ['Matthew 6:25-27', 'Psalm 139:23-24', '1 Peter 5:7'],
        questions: [
          'What does worry reveal about what we believe?',
          'Why does worry accomplish nothing?',
          'How does God care for you?'
        ],
        prayer: 'Search me, O God, and know my heart. See if there is any anxious way in me. I cast my anxiety on You, for You care for me. In Jesus\' name, Amen.',
        reflection: 'What is your most recurring worry? Trace it back to its root fear.'
      },
      {
        id: 'peace-2',
        title: 'God\'s Peace That Surpasses Understanding',
        description: 'Receiving the peace only God can give.',
        verses: ['Philippians 4:6-7', 'John 14:27', 'Colossians 3:15'],
        questions: [
          'How do we access God\'s peace?',
          'What kind of peace does Jesus give?',
          'What does it mean to let peace rule in your heart?'
        ],
        prayer: 'Lord, I bring my worries to You with thanksgiving. Guard my heart and mind with Your peace. I receive the peace Jesus gives. In Jesus\' name, Amen.',
        reflection: 'What would it look like to live ruled by God\'s peace instead of anxiety?'
      },
      {
        id: 'peace-3',
        title: 'Replacing Lies with Truth',
        description: 'Fighting anxious thoughts with Scripture.',
        verses: ['2 Corinthians 10:5', 'Philippians 4:8', 'Psalm 119:11'],
        questions: [
          'How do we "take every thought captive"?',
          'What should we think about instead?',
          'Why is memorizing Scripture important?'
        ],
        prayer: 'Lord, show me the lies I\'m believing. Replace them with Your truth. Fill my mind with what is true, noble, right, and pure. In Jesus\' name, Amen.',
        reflection: 'What anxious thought needs to be replaced with Scripture? Find a verse today.'
      },
      {
        id: 'peace-4',
        title: 'Perfect Love Casts Out Fear',
        description: 'How God\'s love combats our fears.',
        verses: ['1 John 4:18', 'Romans 8:15', 'Psalm 23:4'],
        questions: [
          'What is the relationship between love and fear?',
          'What Spirit did we receive, not a spirit of fear?',
          'How does God\'s presence change how we face fear?'
        ],
        prayer: 'Father, thank You that I\'m Your child. Perfect love casts out fear. I don\'t have a spirit of fear, but of power, love, and self-discipline. In Jesus\' name, Amen.',
        reflection: 'What fear would dissolve if you truly grasped God\'s love?'
      },
      {
        id: 'peace-5',
        title: 'When Anxiety Attacks',
        description: 'Practical help in moments of panic.',
        verses: ['Psalm 46:1', 'Psalm 46:10', 'Psalm 94:19'],
        questions: [
          'How is God "a very present help in trouble"?',
          'Why does God tell us to "be still"?',
          'What does God promise when your anxious thoughts multiply?'
        ],
        prayer: 'God is my refuge and strength, an ever-present help in trouble. Be still, my soul, and know that He is God. He will calm my anxious thoughts. In Jesus\' name, Amen.',
        reflection: 'Create a "peace plan" - 3 Scripture verses to read when anxiety strikes.'
      },
      {
        id: 'peace-6',
        title: 'Praying Through Panic',
        description: 'Using prayer as a weapon against anxiety.',
        verses: ['Psalm 34:4-6', 'Psalm 56:3', 'Psalm 91:1-2'],
        questions: [
          'What happens when we seek the LORD?',
          'How can we trust God "when I am afraid"?',
          'What does it mean to dwell in the shelter of the Most High?'
        ],
        prayer: 'I sought the LORD, and He answered me. He delivered me from all my fears. When I am afraid, I put my trust in You. You are my refuge and fortress. Amen.',
        reflection: 'Turn your current worry into a prayer right now.'
      },
      {
        id: 'peace-7',
        title: 'Living in Peace Daily',
        description: 'Building a lifestyle of peace.',
        verses: ['Isaiah 26:3', '2 Thessalonians 3:16', 'Psalm 29:11'],
        questions: [
          'What keeps us in perfect peace?',
          'Who is the Lord of peace, and what does He give?',
          'How does the LORD bless His people with peace?'
        ],
        prayer: 'Lord, keep my mind stayed on You. You give peace always and in every way. You bless your people with peace. Let me walk in that peace today. In Jesus\' name, Amen.',
        reflection: 'What practical changes can you make to live a more peace-filled life?'
      }
    ]
  },
  {
    id: 'life-2',
    title: 'Discovering Your Purpose',
    description: 'Find God\'s unique plan and calling for your life.',
    category: 'life-application',
    duration: '7 days',
    difficulty: 'intermediate',
    totalLessons: 7,
    lessons: [
      {
        id: 'purpose-1',
        title: 'Created with Purpose',
        description: 'You were made on purpose, for a purpose.',
        verses: ['Ephesians 2:10', 'Psalm 139:16', 'Jeremiah 1:5'],
        questions: [
          'What does it mean to be God\'s "workmanship"?',
          'What does God have prepared for you?',
          'When did God know you?'
        ],
        prayer: 'Father, thank You that I am Your workmanship, created in Christ Jesus for good works. Show me the works You prepared for me. In Jesus\' name, Amen.',
        reflection: 'What makes you feel alive and close to God? This may be a clue to your purpose.'
      },
      {
        id: 'purpose-2',
        title: 'Glorifying God in Everything',
        description: 'Your first and highest purpose.',
        verses: ['1 Corinthians 10:31', 'Colossians 3:17', 'Matthew 5:16'],
        questions: [
          'How can you "do all to the glory of God"?',
          'What does it mean to do everything in Jesus\' name?',
          'How can your good works point others to God?'
        ],
        prayer: 'Lord, let every aspect of my life glorify You. My work, my relationships, my words, my thoughts - all for Your glory. In Jesus\' name, Amen.',
        reflection: 'What area of your life doesn\'t currently glorify God? How can you change that?'
      },
      {
        id: 'purpose-3',
        title: 'Using Your Gifts',
        description: 'How God uniquely equipped you.',
        verses: ['1 Peter 4:10', 'Romans 12:6-8', '1 Corinthians 12:4-7'],
        questions: [
          'What kind of stewards are we to be of God\'s gifts?',
          'What are some spiritual gifts mentioned?',
          'Why is every gift important?'
        ],
        prayer: 'Lord, thank You for the gifts You\'ve given me. Help me to use them faithfully to serve others. Show me how You\'ve uniquely equipped me. In Jesus\' name, Amen.',
        reflection: 'What gifts do others see in you? How are you using them for God?'
      },
      {
        id: 'purpose-4',
        title: 'Your Unique Calling',
        description: 'Discovering your specific mission from God.',
        verses: ['Ephesians 4:1', '2 Timothy 1:9', 'Galatians 1:15'],
        questions: [
          'What "calling" have you received?',
          'What was Timothy\'s calling based on?',
          'When did God set Paul apart?'
        ],
        prayer: 'Lord, I walk in a manner worthy of my calling. You saved me and called me to a holy purpose. Help me fulfill it. In Jesus\' name, Amen.',
        reflection: 'If you could do anything for God and succeed, what would it be?'
      },
      {
        id: 'purpose-5',
        title: 'Faithfulness in Small Things',
        description: 'Purpose often starts small.',
        verses: ['Luke 16:10', 'Matthew 25:21', 'Zechariah 4:10'],
        questions: [
          'Why is being faithful in small things important?',
          'What does the faithful servant receive?',
          'What does "do not despise small beginnings" mean?'
        ],
        prayer: 'Lord, help me be faithful with what You\'ve given me today. I won\'t despise small beginnings. I will be faithful where I am. In Jesus\' name, Amen.',
        reflection: 'What "small thing" has God placed before you? Be faithful there.'
      },
      {
        id: 'purpose-6',
        title: 'Purpose in Suffering',
        description: 'Finding meaning in pain.',
        verses: ['Romans 8:28', '2 Corinthians 1:3-4', 'James 1:2-4'],
        questions: [
          'What promise does God give about all things?',
          'How does God comfort us?',
          'What does suffering produce?'
        ],
        prayer: 'Lord, I don\'t always understand my suffering, but I trust You works all things for good. Use even my pain for Your glory and others\' comfort. In Jesus\' name, Amen.',
        reflection: 'How has God used past difficulties for good in your life?'
      },
      {
        id: 'purpose-7',
        title: 'Leaving a Legacy',
        description: 'Living a life that echoes for eternity.',
        verses: ['2 Timothy 4:7-8', 'Hebrews 12:1', 'Matthew 6:19-21'],
        questions: [
          'What did Paul fight the good fight for?',
          'What hinders us from running our race?',
          'Where should our treasure be?'
        ],
        prayer: 'Lord, help me finish well. I want to fight the good fight, finish the race, keep the faith. My treasure is in heaven. In Jesus\' name, Amen.',
        reflection: 'What do you want your spiritual legacy to be? Are you building that?'
      }
    ]
  },
  {
    id: 'character-2',
    title: 'Women of Faith: Esther',
    description: 'Learn courage and divine timing from Queen Esther.',
    category: 'character',
    duration: '5 days',
    difficulty: 'intermediate',
    totalLessons: 5,
    lessons: [
      {
        id: 'esther-1',
        title: 'For Such a Time as This',
        description: 'Esther\'s preparation for her moment.',
        verses: ['Esther 2:17', 'Esther 4:14', 'Psalm 33:11'],
        questions: [
          'How did God prepare Esther for her role?',
          'What does "for such a time as this" mean?',
          'How does God\'s counsel stand forever?'
        ],
        prayer: 'Lord, prepare me for my "such a time as this." Your purposes will stand. Align my heart with Yours. In Jesus\' name, Amen.',
        reflection: 'What circumstances might God be using to prepare you for something bigger?'
      },
      {
        id: 'esther-2',
        title: 'Courageous Risk',
        description: 'The bold decision to approach the king.',
        verses: ['Esther 4:16', 'Esther 5:1-2', 'Joshua 1:9'],
        questions: [
          'What was Esther willing to risk?',
          'Where did Esther\'s courage come from?',
          'Why can we be strong and courageous?'
        ],
        prayer: 'Lord, give me Esther-like courage. If I perish, I perish. But I will not stay silent. Be with me as I step out. In Jesus\' name, Amen.',
        reflection: 'What bold step is God calling you to take?'
      },
      {
        id: 'esther-3',
        title: 'The Power of Fasting and Prayer',
        description: 'Seeking God before taking action.',
        verses: ['Esther 4:16', 'Ezra 8:23', 'Nehemiah 1:4'],
        questions: [
          'Why did Esther call for fasting?',
          'How did God\'s people seek Him in Scripture?',
          'Why is it important to seek God before acting?'
        ],
        prayer: 'Lord, I humble myself before You. I seek Your face. Before I act, I will pray. Show me Your will. In Jesus\' name, Amen.',
        reflection: 'What decision are you facing? Have you sought God through fasting and prayer?'
      },
      {
        id: 'esther-4',
        title: 'Wisdom in Action',
        description: 'Esther\'s strategic approach to the king.',
        verses: ['Esther 5:4-8', 'Esther 7:3-4', 'Proverbs 16:23'],
        questions: [
          'Why didn\'t Esther make her request immediately?',
          'How did wisdom guide Esther\'s timing?',
          'What does the heart of the wise teach?'
        ],
        prayer: 'Lord, give me wisdom from heaven. Help me know when to speak and when to wait. Guide my timing. In Jesus\' name, Amen.',
        reflection: 'Are there times you\'ve rushed ahead of God\'s timing? What did you learn?'
      },
      {
        id: 'esther-5',
        title: 'God\'s Providence',
        description: 'Seeing God\'s hand behind the scenes.',
        verses: ['Esther 10:3', 'Psalm 115:3', 'Proverbs 21:1'],
        questions: [
          'How did God work through Esther\'s life?',
          'What does "our God is in the heavens" mean?',
          'How does God guide the king\'s heart?'
        ],
        prayer: 'Lord, Your providence rules over all. You work all things according to Your will. I trust Your sovereign plan. In Jesus\' name, Amen.',
        reflection: 'Looking back, where can you see God\'s providence at work?'
      }
    ]
  }
];

// Get all study plans
export function getAllStudyPlans(): StudyPlan[] {
  return bibleStudyPlans;
}

// Get study plan by ID
export function getStudyPlanById(id: string): StudyPlan | undefined {
  return bibleStudyPlans.find(plan => plan.id === id);
}

// Get study plans by category
export function getStudyPlansByCategory(category: StudyPlan['category']): StudyPlan[] {
  return bibleStudyPlans.filter(plan => plan.category === category);
}

// Get study plans by difficulty
export function getStudyPlansByDifficulty(difficulty: StudyPlan['difficulty']): StudyPlan[] {
  return bibleStudyPlans.filter(plan => plan.difficulty === difficulty);
}

// Get user's progress
export function getStudyProgress(planId: string): { completed: string[]; inProgress: string[]; current?: string } {
  const progress = localStorage.getItem(`study-progress-${planId}`);
  if (progress) {
    return JSON.parse(progress);
  }
  return { completed: [], inProgress: [] };
}

// Save lesson progress
export function saveLessonProgress(planId: string, lessonId: string) {
  const progress = getStudyProgress(planId);
  if (!progress.completed.includes(lessonId)) {
    progress.completed.push(lessonId);
  }
  localStorage.setItem(`study-progress-${planId}`, JSON.stringify(progress));
}

// Save lesson as in progress
export function saveLessonInProgress(planId: string, lessonId: string) {
  const progress = getStudyProgress(planId);
  if (!progress.inProgress.includes(lessonId)) {
    progress.inProgress.push(lessonId);
  }
  progress.current = lessonId;
  localStorage.setItem(`study-progress-${planId}`, JSON.stringify(progress));
}

// Get or set the start date for a study plan
export function getPlanStartDate(planId: string): string {
  let startDate = localStorage.getItem(`study-start-${planId}`);
  if (!startDate) {
    startDate = new Date().toISOString();
    localStorage.setItem(`study-start-${planId}`, startDate);
  }
  return startDate;
}

// Get the number of unlocked lessons based on days elapsed
export function getUnlockedLessonCount(planId: string, totalLessons: number): number {
  const startDate = new Date(getPlanStartDate(planId));
  const now = new Date();
  const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  // Unlock one lesson per day, starting with day 0 = lesson 1 unlocked
  return Math.min(daysElapsed + 1, totalLessons);
}
