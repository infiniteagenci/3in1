import { useState, useCallback } from 'react';

// Comprehensive Catholic content structure
const catholicContent = {
  sacraments: {
    title: 'Sacraments',
    icon: '✝️',
    description: 'The seven sacred signs of grace',
    items: [
      {
        id: 'baptism',
        title: 'Baptism',
        description: 'The door to the Church and the beginning of new life',
        prayers: [
          'Prayer for Baptism: "Almighty God, you have given new birth through water and the Holy Spirit..."',
          'Baptismal Promises: "Do you reject Satan? And all his works? And all his empty show?"',
          'Renewal of Baptismal Promises: "I reject Satan; and all his works; and all his empty show..."'
        ],
        catechism: 'Baptism is the first sacrament of initiation, freeing us from original sin.',
        scripture: 'Matthew 28:19, Romans 6:4'
      },
      {
        id: 'eucharist',
        title: 'Holy Eucharist',
        description: 'The source and summit of Christian life',
        prayers: [
          'Prayer before Communion: "Lord Jesus Christ, with faith in your love and mercy..."',
          'Prayer after Communion: "Lord, I am not worthy that you should enter under my roof..."',
          'Act of Spiritual Communion: "My Jesus, I believe that you are present in the Holy Sacrament..."',
          'Anima Christi: "Soul of Christ, sanctify me. Body of Christ, save me..."'
        ],
        catechism: 'The Eucharist is the memorial of Christ\'s Passover, the work of salvation accomplished by Christ.',
        scripture: 'John 6:53-58, 1 Corinthians 11:23-29'
      },
      {
        id: 'confirmation',
        title: 'Confirmation',
        description: 'Completion of baptismal grace',
        prayers: [
          'Prayer for Confirmation: "Come, Holy Spirit, fill the hearts of your faithful..."',
          'Sequence for Pentecost: "Come, Holy Spirit, come! And from your celestial home..."'
        ],
        catechism: 'Confirmation perfects Baptismal grace and gives us the special strength of the Holy Spirit.',
        scripture: 'Acts 2:1-4, Acts 8:14-17'
      },
      {
        id: 'reconciliation',
        title: 'Reconciliation',
        description: 'Sacrament of healing and forgiveness',
        prayers: [
          'Act of Contrition: "Oh my God, because you are so good..."',
          'Examination of Conscience Prayer: "Holy Spirit, enlighten my mind..."',
          'Prayer for Forgiveness: "Lord Jesus Christ, you are the mercy of the Father..."'
        ],
        catechism: 'Penance reconciles us with God and the Church.',
        scripture: 'John 20:22-23, 2 Corinthians 5:18-20'
      },
      {
        id: 'anointing',
        title: 'Anointing of the Sick',
        description: 'Healing sacrament for the ill',
        prayers: [
          'Prayer for the Sick: "Lord Jesus Christ, you came to heal the sick..."',
          'Prayer for Healing: "Almighty and everlasting God, the eternal health..."'
        ],
        catechism: 'This sacrament unites the sick with Christ\'s suffering.',
        scripture: 'James 5:14-15, Mark 16:18'
      },
      {
        id: 'holy-orders',
        title: 'Holy Orders',
        description: 'Sacrament of apostolic ministry',
        prayers: [
          'Prayer for Priests: "Lord Jesus Christ, Eternal High Priest..."',
          'Prayer for Vocations: "Lord Jesus Christ, Shepherd of your people..."'
        ],
        catechism: 'Holy Orders ordains men to serve the Church as deacons, priests, and bishops.',
        scripture: 'Luke 22:19-20, 1 Timothy 3:1-13'
      },
      {
        id: 'matrimony',
        title: 'Holy Matrimony',
        description: 'Sacred bond of marriage',
        prayers: [
          'Prayer for Married Couples: "Lord God, you have consecrated marriage..."',
          'Prayer for Families: "God our Father, we thank you for the gift of family..."'
        ],
        catechism: 'Marriage is a covenant between a man and woman, reflecting Christ\'s love for the Church.',
        scripture: 'Ephesians 5:31-32, Matthew 19:4-6'
      }
    ]
  },
  prayers: {
    title: 'Prayers',
    icon: '🙏',
    description: 'Traditional Catholic prayers',
    items: [
      {
        id: 'our-father',
        title: 'Our Father (Lord\'s Prayer)',
        description: 'The prayer Jesus taught His disciples',
        prayers: ['Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done...'],
        catechism: 'The summary of the entire Gospel and the perfect prayer.',
        scripture: 'Matthew 6:9-13, Luke 11:2-4'
      },
      {
        id: 'hail-mary',
        title: 'Hail Mary',
        description: 'Prayer honoring the Blessed Mother',
        prayers: ['Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women...'],
        catechism: 'A prayer of praise and petition to Mary, the Mother of God.',
        scripture: 'Luke 1:28, Luke 1:42'
      },
      {
        id: 'glory-be',
        title: 'Glory Be',
        description: 'Doxology praising the Trinity',
        prayers: ['Glory be to the Father, and to the Son, and to the Holy Spirit...'],
        catechism: 'A short prayer of praise to the Holy Trinity.',
        scripture: 'Romans 16:27, Jude 1:25'
      },
      {
        id: 'rosary',
        title: 'The Holy Rosary',
        description: 'Meditative prayer on the life of Christ',
        prayers: [
          'Apostles\' Creed: "I believe in God, the Father Almighty..."',
          'Joyful Mysteries: Annunciation, Visitation, Nativity, Presentation, Finding in Temple',
          'Sorrowful Mysteries: Agony in Garden, Scourging, Crowning with Thorns, Carrying Cross, Crucifixion',
          'Glorious Mysteries: Resurrection, Ascension, Descent of Holy Spirit, Assumption, Coronation',
          'Luminous Mysteries: Baptism, Wedding at Cana, Proclamation of Kingdom, Transfiguration, Institution of Eucharist'
        ],
        catechism: 'The Rosary is a meditative prayer honoring Mary and contemplating Christ\'s life.',
        scripture: 'Luke 1:28, Luke 1:42'
      },
      {
        id: 'divine-mercy',
        title: 'Divine Mercy Chaplet',
        description: 'Prayer for mercy through Christ\'s passion',
        prayers: [
          'Opening Prayer: "Eternal Father, I offer you the Body and Blood, Soul and Divinity..."',
          'For the sake of His sorrowful Passion, have mercy on us and on the whole world (10x)',
          'Holy God Prayer: "Holy God, Holy Mighty One, Holy Immortal One, have mercy on us..."'
        ],
        catechism: 'Devotion to God\'s infinite mercy revealed to St. Faustina.',
        scripture: 'Psalm 136, Ephesians 2:4-5'
      },
      {
        id: 'st-michael',
        title: 'Prayer to St. Michael',
        description: 'Protection against evil',
        prayers: ['St. Michael the Archangel, defend us in battle...'],
        catechism: 'A prayer for protection and strength in spiritual warfare.',
        scripture: 'Revelation 12:7-9, Daniel 10:13'
      },
      {
        id: 'memorare',
        title: 'Memorare',
        description: 'Prayer to the Blessed Virgin Mary',
        prayers: ['Remember, O most gracious Virgin Mary, that never was it known...'],
        catechism: 'A prayer of confidence in Mary\'s intercession.',
        scripture: 'John 2:1-11'
      },
      {
        id: 'act-faith',
        title: 'Act of Faith',
        description: 'Profession of belief',
        prayers: ['O my God, I firmly believe that you are one God in three divine persons...'],
        catechism: 'A prayer professing faith in the Holy Trinity and Catholic teachings.',
        scripture: 'Hebrews 11:1, 1 Corinthians 13:13'
      },
      {
        id: 'act-hope',
        title: 'Act of Hope',
        description: 'Prayer of trust in God\'s mercy',
        prayers: ['O my God, relying on your almighty power and infinite goodness...'],
        catechism: 'A prayer expressing hope in God\'s promises and heaven.',
        scripture: 'Romans 15:13, Titus 2:13'
      },
      {
        id: 'act-charity',
        title: 'Act of Charity',
        description: 'Prayer of love for God',
        prayers: ['O my God, I love you above all things...'],
        catechism: 'A prayer expressing love for God and neighbor.',
        scripture: 'Matthew 22:37, 1 John 4:7-8'
      },
      {
        id: 'guardian-angel',
        title: 'Prayer to Guardian Angel',
        description: 'Prayer for angelic protection',
        prayers: ['Angel of God, my guardian dear, to whom God\'s love commits me here...'],
        catechism: 'A prayer to one\'s guardian angel for protection and guidance.',
        scripture: 'Psalm 91:11-12, Matthew 18:10'
      },
      {
        id: 'grace-meals',
        title: 'Grace Before Meals',
        description: 'Prayer of thanksgiving',
        prayers: ['Bless us, O Lord, and these your gifts, which we are about to receive...'],
        catechism: 'A prayer thanking God for food and sustenance.',
        scripture: 'Matthew 14:19, Acts 27:35'
      },
      {
        id: 'grace-after',
        title: 'Grace After Meals',
        description: 'Thanksgiving after eating',
        prayers: ['We give you thanks, Almighty God, for all your benefits...'],
        catechism: 'A prayer of gratitude after meals.',
        scripture: 'Deuteronomy 8:10, 1 Timothy 4:4-5'
      }
    ]
  },
  catechism: {
    title: 'Catechism',
    icon: '📖',
    description: 'Catholic teaching and doctrine',
    items: [
      {
        id: 'apostles-creed',
        title: 'Apostles\' Creed',
        description: 'Statement of Catholic faith',
        prayers: ['I believe in God, the Father Almighty, Creator of heaven and earth...'],
        catechism: 'The basic statement of Christian faith, dating to the early Church.',
        scripture: '1 Corinthians 15:3-4'
      },
      {
        id: 'nicene-creed',
        title: 'Nicene Creed',
        description: 'Profession of faith from the Mass',
        prayers: ['I believe in one God, the Father almighty...'],
        catechism: 'The profession of faith used in the Liturgy, affirming core Catholic doctrines.',
        scripture: 'John 1:1-3, John 10:30'
      },
      {
        id: 'ten-commandments',
        title: 'Ten Commandments',
        description: 'God\'s moral law given to Moses',
        prayers: [
          '1. I am the Lord your God, you shall not have strange gods before me',
          '2. You shall not take the name of the Lord your God in vain',
          '3. Remember to keep holy the Lord\'s Day',
          '4. Honor your father and your mother',
          '5. You shall not kill',
          '6. You shall not commit adultery',
          '7. You shall not steal',
          '8. You shall not bear false witness against your neighbor',
          '9. You shall not covet your neighbor\'s wife',
          '10. You shall not covet your neighbor\'s goods'
        ],
        catechism: 'The moral law given by God to guide His people in holiness.',
        scripture: 'Exodus 20:2-17, Deuteronomy 5:6-21'
      },
      {
        id: 'beatitudes',
        title: 'The Beatitudes',
        description: 'Jesus\' teaching on blessed living',
        prayers: [
          'Blessed are the poor in spirit, for theirs is the kingdom of heaven',
          'Blessed are they who mourn, for they will be comforted',
          'Blessed are the meek, for they will inherit the land',
          'Blessed are they who hunger and thirst for righteousness, for they will be satisfied',
          'Blessed are the merciful, for they will be shown mercy',
          'Blessed are the clean of heart, for they will see God',
          'Blessed are the peacemakers, for they will be called children of God',
          'Blessed are they who are persecuted for righteousness, for theirs is the kingdom of heaven'
        ],
        catechism: 'Jesus\' teaching on the path to true happiness and holiness.',
        scripture: 'Matthew 5:3-12, Luke 6:20-26'
      },
      {
        id: 'works-of-mercy',
        title: 'Corporal & Spiritual Works of Mercy',
        description: 'Christian acts of charity',
        prayers: [
          'Corporal: Feed the hungry, Give drink to the thirsty, Clothe the naked, Shelter the homeless, Visit the sick, Visit the imprisoned, Bury the dead',
          'Spiritual: Counsel the doubtful, Instruct the ignorant, Admonish sinners, Comfort the sorrowful, Forgive injuries, Bear wrongs patiently, Pray for the living and the dead'
        ],
        catechism: 'Charitable acts that flow from love of neighbor.',
        scripture: 'Matthew 25:35-40, James 2:14-17'
      },
      {
        id: 'holy-spirit',
        title: 'The Holy Spirit',
        description: 'Third Person of the Trinity',
        prayers: [
          'Come Holy Spirit, fill the hearts of your faithful',
          'The seven gifts: Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, Fear of the Lord',
          'The twelve fruits: Charity, Joy, Peace, Patience, Kindness, Goodness, Generosity, Gentleness, Faithfulness, Modesty, Self-control, Chastity'
        ],
        catechism: 'The Holy Spirit is the third Person of the Trinity, who proceeds from the Father and the Son.',
        scripture: 'John 14:15-17, Acts 2:1-4'
      },
      {
        id: 'church',
        title: 'The Church',
        description: 'The People of God',
        prayers: [
          'The Church is one, holy, catholic, and apostolic',
          'The Four Marks: One - united in faith; Holy - sanctified by Christ; Catholic - universal; Apostolic - founded on apostles'
        ],
        catechism: 'The Church is the People of God, united in faith, worship, and sacramental life.',
        scripture: 'Matthew 16:18, Ephesians 4:4-6'
      },
      {
        id: 'mary',
        title: 'Mary, Mother of God',
        description: 'Theotokos - God-bearer',
        prayers: [
          'Immaculate Conception: Mary was conceived without original sin',
          'Perpetual Virginity: Mary remained a virgin before, during, and after Christ\'s birth',
          'Mother of God: Mary is truly the Mother of God',
          'Assumption: Mary was taken body and soul into heaven'
        ],
        catechism: 'Mary is the Mother of God and Mother of the Church, conceived without sin and assumed into heaven.',
        scripture: 'Luke 1:26-55, Luke 1:43'
      },
      {
        id: 'last-things',
        title: 'The Last Things',
        description: 'Eschatology - the four last things',
        prayers: [
          'Death: The separation of soul from body',
          'Judgment: Particular judgment after death, Final judgment at Christ\'s return',
          'Heaven: Eternal happiness with God',
          'Hell: Eternal separation from God',
          'Purgatory: State of purification for the saved'
        ],
        catechism: 'The four last things are death, judgment, heaven, and hell.',
        scripture: 'Hebrews 9:27, Revelation 20:12-15'
      },
      {
        id: 'precepts',
        title: 'Precepts of the Church',
        description: 'Minimum requirements for Catholic life',
        prayers: [
          '1. Attend Mass on Sundays and holy days',
          '2. Confess sins at least once a year',
          '3. Receive Holy Communion at least once during Easter season',
          '4. Observe days of fasting and abstinence',
          '5. Provide for the needs of the Church'
        ],
        catechism: 'The precepts are the minimum requirements for living the Catholic faith.',
        scripture: 'Acts 2:42, 1 Corinthians 11:26'
      }
    ]
  },
  saints: {
    title: 'Saints',
    icon: '✨',
    description: 'Holy men and women of faith',
    items: [
      {
        id: 'mary',
        title: 'Blessed Virgin Mary',
        description: 'Mother of God and Queen of Saints',
        image: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&h=400&fit=crop',
        prayers: [
          'Hail Holy Queen: "Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope..."',
          'Memorare: "Remember, O most gracious Virgin Mary..."',
          'Magnificat: "My soul proclaims the greatness of the Lord..."'
        ],
        catechism: 'Mary is the Mother of God, Mother of the Church, and our spiritual mother.',
        scripture: 'Luke 1:26-55, Luke 2:6-7'
      },
      {
        id: 'joseph',
        title: 'St. Joseph',
        description: 'Guardian of the Holy Family',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        prayers: [
          'Prayer to St. Joseph: "O blessed Joseph, faithful guardian of Jesus..."',
          'Litany of St. Joseph: "St. Joseph, renowned offspring of David..."'
        ],
        catechism: 'Joseph is the model father, protector of the Church, and patron of workers.',
        scripture: 'Matthew 1:18-25, Matthew 2:13-15'
      },
      {
        id: 'peter',
        title: 'St. Peter',
        description: 'First Pope and Prince of Apostles',
        image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=400&fit=crop',
        prayers: ['Prayer for the Pope: "Lord, we pray for Your Holy Father Pope Francis..."'],
        catechism: 'Peter was chosen by Christ to lead His Church as the first Pope.',
        scripture: 'Matthew 16:18-19, Acts 2:14-41'
      },
      {
        id: 'paul',
        title: 'St. Paul',
        description: 'Apostle to the Gentiles',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        prayers: ['Prayer for Evangelization: "Lord, like St. Paul, give us zeal to spread Your Gospel..."'],
        catechism: 'Paul\'s letters form much of New Testament teaching on Christian life.',
        scripture: 'Acts 9:1-22, Romans 1:16'
      },
      {
        id: 'francis',
        title: 'St. Francis of Assisi',
        description: 'Founder of Franciscans, patron of animals',
        image: 'https://images.unsplash.com/photo-1518173946687-a4c036bc1c9a?w=400&h=400&fit=crop',
        prayers: [
          'Peace Prayer: Lord, make me an instrument of Your peace...',
          'Canticle of the Sun: Most High, all-powerful, good Lord...'
        ],
        catechism: 'Francis embraced poverty and preached the Gospel through joy and simplicity.',
        scripture: 'Matthew 10:9-10, Luke 14:33'
      },
      {
        id: 'therese',
        title: 'St. Thérèse of Lisieux',
        description: 'Doctor of the Church, Little Way',
        image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=400&h=400&fit=crop',
        prayers: ['Prayer: St. Thérèse, intercede for us to do small things with great love...'],
        catechism: 'Thérèse taught the "Little Way" of spiritual childhood and doing small things with love.',
        scripture: 'Matthew 18:3-4, Mark 10:15'
      },
      {
        id: 'thomas-aquinas',
        title: 'St. Thomas Aquinas',
        description: 'Angelic Doctor, theologian',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop',
        prayers: ['Prayer for Students: "St. Thomas Aquinas, patron of students and schools..."'],
        catechism: 'Thomas Aquinas authored the Summa Theologica, a comprehensive work of Catholic theology.',
        scripture: '1 Corinthians 1:17-25'
      },
      {
        id: 'augustine',
        title: 'St. Augustine',
        description: 'Doctor of Grace, bishop of Hippo',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop',
        prayers: ['Prayer: "Late have I loved you, O Beauty ever ancient, ever new..."'],
        catechism: 'Augustine\'s Confessions and City of God are foundational works of Western Christianity.',
        scripture: 'Psalm 90, Romans 8'
      },
      {
        id: 'anthony',
        title: 'St. Anthony of Padua',
        description: 'Patron of lost things',
        image: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&h=400&fit=crop',
        prayers: ['Prayer: "St. Anthony, please help me find what I have lost..."'],
        catechism: 'Anthony was a powerful preacher and miracle worker, patron of the poor and lost items.',
        scripture: 'Matthew 25:35-40'
      },
      {
        id: 'jude',
        title: 'St. Jude Thaddeus',
        description: 'Patron of hopeless causes',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=400&fit=crop',
        prayers: ['Prayer: "St. Jude, apostle of Christ, intercede for us..."'],
        catechism: 'St. Jude is the patron saint of hopeless causes and difficult situations.',
        scripture: 'Luke 6:12-16'
      },
      {
        id: 'rita',
        title: 'St. Rita of Cascia',
        description: 'Patroness of impossible causes',
        image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop',
        prayers: ['Prayer: "St. Rita, helper of the hopeless, pray for us..."'],
        catechism: 'St. Rita is known as the patroness of impossible causes and abused wives.',
        scripture: 'Romans 8:28'
      },
      {
        id: 'monica',
        title: 'St. Monica',
        description: 'Mother of St. Augustine',
        image: 'https://images.unsplash.com/photo-1548625361-9872e4533e36?w=400&h=400&fit=crop',
        prayers: ['Prayer: "St. Monica, patron saint of mothers, pray for us..."'],
        catechism: 'Monica\'s persistent prayers led to her son Augustine\'s conversion.',
        scripture: 'Luke 18:1-8, 1 Thessalonians 5:17'
      },
      {
        id: 'patrick',
        title: 'St. Patrick',
        description: 'Apostle of Ireland',
        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop',
        prayers: [
          'St. Patrick\'s Breastplate: "Christ be with me, Christ before me..."',
          'Prayer: "St. Patrick, missionary to Ireland, pray for us..."'
        ],
        catechism: 'Patrick converted Ireland through preaching, miracles, and faithful witness.',
        scripture: 'Matthew 28:19-20'
      },
      {
        id: 'catherine',
        title: 'St. Catherine of Siena',
        description: 'Doctor of the Church, mystic',
        image: 'https://images.unsplash.com/photo-1518173946687-a4c036bc1c9a?w=400&h=400&fit=crop',
        prayers: ['Prayer: "St. Catherine, who dialogued with Christ, pray for us..."'],
        catechism: 'Catherine was a mystic, theologian, and advisor to popes.',
        scripture: '1 Corinthians 12:31'
      },
      {
        id: 'benedict',
        title: 'St. Benedict',
        description: 'Father of Western monasticism',
        image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=400&fit=crop',
        prayers: [
          'The Rule of St. Benedict: "Ora et Labora" - Pray and Work',
          'Prayer: St. Benedict, patron of Europe, pray for us'
        ],
        catechism: 'Benedict founded Western monasticism and wrote the Rule that guides many religious.',
        scripture: 'Luke 10:41-42'
      },
      {
        id: 'ignatius',
        title: 'St. Ignatius of Loyola',
        description: 'Founder of Jesuits, Spiritual Exercises',
        image: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&h=400&fit=crop',
        prayers: [
          'Suscipe: "Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will..."',
          'Prayer for Discernment: "Teach me, good Lord, to be generous, to serve you as you deserve..."',
          'Novena to St. Ignatius for discernment and spiritual growth'
        ],
        catechism: 'Ignatius founded the Society of Jesus and developed the Spiritual Exercises for discernment.',
        scripture: 'Philippians 3:8-14'
      },
      {
        id: 'francis-xavier',
        title: 'St. Francis Xavier',
        description: 'Apostle of the Indies, missionary',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        prayers: [
          'Prayer for missionaries: "St. Francis Xavier, patron of foreign missions..."',
          'Novena to St. Francis Xavier for missionary zeal'
        ],
        catechism: 'Francis Xavier was a Jesuit missionary who spread the Gospel in Asia.',
        scripture: 'Romans 10:14-15, Matthew 28:19'
      },
      {
        id: 'therese-lisieux',
        title: 'St. Thérèse of the Child Jesus',
        description: 'Little Flower, Doctor of the Church',
        image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. Thérèse, my spiritual mother, help me to do small things with great love..."',
          'Novena to St. Thérèse for obtaining favors through her intercession'
        ],
        catechism: 'Thérèse is the patron saint of missionaries, florists, and pilots.',
        scripture: 'Matthew 18:3-4'
      },
      {
        id: 'dominic',
        title: 'St. Dominic',
        description: 'Founder of Dominicans, preacher',
        image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. Dominic, preacher of the Rosary, pray for us..."',
          'Novena to St. Dominic for preaching and teaching'
        ],
        catechism: 'Dominic founded the Order of Preachers and promoted the Rosary.',
        scripture: 'Romans 10:14-15'
      },
      {
        id: 'anne',
        title: 'St. Anne',
        description: 'Mother of the Blessed Virgin Mary',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "Good St. Anne, mother of she who is our life..."',
          'Novena to St. Anne for finding a spouse and for mothers'
        ],
        catechism: 'Anne is the grandmother of Jesus and patron of mothers and grandmothers.',
        scripture: 'Luke 3:27'
      },
      {
        id: 'joachim',
        title: 'St. Joachim',
        description: 'Father of the Blessed Virgin Mary',
        image: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. Joachim, father of Mary and grandfather of Jesus..."',
          'Novena to St. Joachim for fathers and grandparents'
        ],
        catechism: 'Joachim is the grandfather of Jesus and patron of fathers and grandfathers.',
        scripture: 'Luke 3:27'
      },
      {
        id: 'john-vianney',
        title: 'St. John Vianney',
        description: 'Cure of Ars, patron of priests',
        image: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. John Vianney, patron of priests, pray for our priests..."',
          'Novena for vocations and for priests'
        ],
        catechism: 'John Vianney is the patron saint of parish priests.',
        scripture: 'Hebrews 5:1-4'
      },
      {
        id: 'pius-x',
        title: 'St. Pius X',
        description: 'Pope who promoted frequent Communion',
        image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. Pius X, defender of the Catholic faith, pray for us..."',
          'Encyclical promoting early and frequent Communion'
        ],
        catechism: 'Pius X encouraged frequent Communion and lowered the age for First Communion.',
        scripture: 'John 6:53-58'
      },
      {
        id: 'maximilian',
        title: 'St. Maximilian Kolbe',
        description: 'Martyr of Auschwitz, apostle of Mary',
        image: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&h=400&fit=crop',
        prayers: [
          'Prayer: "St. Maximilian Kolbe, who gave his life for another..."',
          'Novena for prisoners and for pro-life intentions'
        ],
        catechism: 'Maximilian Kolbe is the patron saint of prisoners, pro-life movements, and journalists.',
        scripture: 'John 15:13'
      },
      {
        id: 'faustina',
        title: 'St. Faustina Kowalska',
        description: 'Secretary of Divine Mercy',
        prayers: [
          'Prayer: "St. Faustina, vessel of Divine Mercy, pray for us..."',
          'Novena to Divine Mercy revealed to St. Faustina'
        ],
        catechism: 'Faustina received the Divine Mercy devotion and wrote the Diary.',
        scripture: 'Psalm 136, Ephesians 2:4-5'
      },
      {
        id: 'raphael',
        title: 'St. Raphael the Archangel',
        description: 'Archangel of healing',
        prayers: [
          'Prayer to St. Raphael: "St. Raphael, angel of health and healing..."',
          'Novena to St. Raphael for healing and for travelers'
        ],
        catechism: 'Raphael is the archangel of healing and patron of travelers.',
        scripture: 'Tobit 12:15'
      },
      {
        id: 'gabriel',
        title: 'St. Gabriel the Archangel',
        description: 'Archangel who announced to Mary',
        prayers: [
          'Prayer to St. Gabriel: "St. Gabriel, messenger of God, pray for us..."',
          'Novena to St. Gabriel for communicators and for purity'
        ],
        catechism: 'Gabriel is the archangel who announced the births of John the Baptist and Jesus.',
        scripture: 'Luke 1:19-38'
      },
      {
        id: 'michael-archangel',
        title: 'St. Michael the Archangel',
        description: 'Leader of heavenly armies',
        prayers: [
          'Prayer to St. Michael: "St. Michael the Archangel, defend us in battle..."',
          'Novena to St. Michael for protection against evil'
        ],
        catechism: 'Michael is the archangel who led the battle against Satan.',
        scripture: 'Revelation 12:7-9'
      },
      {
        id: 'martin-porres',
        title: 'St. Martin de Porres',
        description: 'Patron of social justice',
        prayers: [
          'Prayer: "St. Martin de Porres, friend of the poor and sick..."',
          'Novena to St. Martin for those seeking racial harmony'
        ],
        catechism: 'Martin de Porres is the patron saint of social justice, barbers, and innkeepers.',
        scripture: 'Matthew 25:35-40'
      },
      {
        id: 'claire',
        title: 'St. Clare of Assisi',
        description: 'Patron of television, founder of Poor Clares',
        prayers: [
          'Prayer: "St. Clare, follower of St. Francis, pray for us..."',
          'Novena to St. Clare for eye problems and for television workers'
        ],
        catechism: 'Clare founded the Poor Clares and is the patron saint of television.',
        scripture: 'Luke 18:28'
      },
      {
        id: 'louis',
        title: 'St. Louis de Montfort',
        description: 'Promoter of Marian devotion',
        prayers: [
          'Prayer: "St. Louis de Montfort, teacher of true devotion to Mary..."',
          'Novena for learning to love Mary'
        ],
        catechism: 'Louis de Montfort wrote True Devotion to Mary.',
        scripture: 'Luke 1:26-55'
      },
      {
        id: 'alphonsus',
        title: 'St. Alphonsus Liguori',
        description: 'Founder of Redemptorists, moral theologian',
        prayers: [
          'Prayer: "St. Alphonsus Liguori, patron of confessors, pray for us..."',
          'Novena for sinners and for those struggling with scruples'
        ],
        catechism: 'Alphonsus Liguori is the patron saint of confessors and moral theologians.',
        scripture: 'James 5:16, 1 John 1:9'
      },
      {
        id: 'dismas',
        title: 'St. Dismas',
        description: 'The Good Thief, patron of prisoners',
        prayers: [
          'Prayer: "St. Dismas, who converted on the cross, pray for us..."',
          'Novena for prisoners and for deathbed conversions'
        ],
        catechism: 'Dismas was the thief crucified with Jesus who repented and was promised paradise.',
        scripture: 'Luke 23:39-43'
      },
      {
        id: 'stephen',
        title: 'St. Stephen',
        description: 'First martyr, deacon',
        prayers: [
          'Prayer: "St. Stephen, first martyr, pray for us..."',
          'Novena for deacons and for those persecuted for faith'
        ],
        catechism: 'Stephen was the first Christian martyr and a deacon.',
        scripture: 'Acts 6-7'
      },
      {
        id: 'lawrence',
        title: 'St. Lawrence',
        description: 'Deacon, martyr of Rome',
        prayers: [
          'Prayer: "St. Lawrence, who gave his life for the poor..."',
          'Novena for chefs and comedians'
        ],
        catechism: 'Lawrence is the patron saint of chefs and comedians.',
        scripture: 'Hebrews 13:16'
      },
      {
        id: 'sebastian',
        title: 'St. Sebastian',
        description: 'Martyr, patron of athletes',
        prayers: [
          'Prayer: "St. Sebastian, athlete for Christ, pray for us..."',
          'Novena for athletes and for protection from plague'
        ],
        catechism: 'Sebastian is the patron saint of athletes and soldiers.',
        scripture: '2 Timothy 4:7'
      },
      {
        id: 'christopher',
        title: 'St. Christopher',
        description: 'Patron of travelers',
        prayers: [
          'Prayer: "St. Christopher, patron of travelers, protect us..."',
          'Novena for safe travel and for drivers'
        ],
        catechism: 'Christopher is the patron saint of travelers.',
        scripture: 'Psalm 91:11-12'
      },
      {
        id: 'nicholas',
        title: 'St. Nicholas',
        description: 'Bishop of Myra, patron of children',
        prayers: [
          'Prayer: "St. Nicholas, helper of the poor and needy..."',
          'Novena for children and for those seeking justice'
        ],
        catechism: 'Nicholas is the patron saint of children, merchants, and sailors.',
        scripture: 'Matthew 19:14'
      },
      {
        id: 'valentine',
        title: 'St. Valentine',
        description: 'Martyr, patron of lovers',
        prayers: [
          'Prayer: "St. Valentine, witness to Christian love..."',
          'Novena for engaged couples and for happy marriages'
        ],
        catechism: 'Valentine is the patron saint of lovers and engaged couples.',
        scripture: '1 Corinthians 13:4-7'
      },
      {
        id: 'mark',
        title: 'St. Mark',
        description: 'Evangelist, author of Gospel',
        prayers: [
          'Prayer: "St. Mark, evangelist, intercede for us..."',
          'Novena for evangelists and for those seeking to understand Scripture'
        ],
        catechism: 'Mark wrote the second Gospel and is the patron saint of notaries.',
        scripture: 'Mark 1:1'
      },
      {
        id: 'luke',
        title: 'St. Luke',
        description: 'Evangelist, physician',
        prayers: [
          'Prayer: "St. Luke, physician and evangelist..."',
          'Novena for doctors and for those seeking to understand Jesus\' compassion'
        ],
        catechism: 'Luke wrote the third Gospel and the Acts of the Apostles.',
        scripture: 'Luke 1:1-4'
      },
      {
        id: 'matthew',
        title: 'St. Matthew',
        description: 'Apostle, evangelist, tax collector',
        prayers: [
          'Prayer: "St. Matthew, apostle and evangelist..."',
          'Novena for tax collectors and for those seeking to follow Jesus\' call'
        ],
        catechism: 'Matthew wrote the first Gospel and was a tax collector.',
        scripture: 'Matthew 9:9'
      },
      {
        id: 'john',
        title: 'St. John the Apostle',
        description: 'Beloved disciple, evangelist',
        prayers: [
          'Prayer: "St. John the Apostle, whom Jesus loved..."',
          'Novena for love of Jesus and for writers'
        ],
        catechism: 'John wrote the fourth Gospel and three epistles.',
        scripture: 'John 13:23'
      },
      {
        id: 'james-greater',
        title: 'St. James the Greater',
        description: 'Apostle of Spain, Santiago',
        prayers: [
          'Prayer: "St. James, apostle and pilgrim..."',
          'Novena for travelers and for those seeking courage'
        ],
        catechism: 'James is the patron saint of pilgrims and Spain.',
        scripture: 'Acts 12:1-2'
      },
      {
        id: 'philip',
        title: 'St. Philip the Apostle',
        description: 'Apostle, brought Nathanael to Jesus',
        prayers: [
          'Prayer: "St. Philip, apostle and evangelist..."',
          'Novena for evangelizers and for those seeking to share their faith'
        ],
        catechism: 'Philip brought Nathanael to Jesus.',
        scripture: 'John 1:43-46'
      },
      {
        id: 'bartholomew',
        title: 'St. Bartholomew (Nathanael)',
        description: 'Apostle, flayed alive',
        prayers: [
          'Prayer: "St. Bartholomew, apostle of Armenia..."',
          'Novena for plasterers and for those seeking honesty'
        ],
        catechism: 'Bartholomew was brought to Jesus by Philip.',
        scripture: 'John 1:45-51'
      },
      {
        id: 'matthias',
        title: 'St. Matthias',
        description: 'Apostle, replaced Judas',
        prayers: [
          'Prayer: "St. Matthias, chosen apostle..."',
          'Novena for those seeking God\'s will in difficult choices'
        ],
        catechism: 'Matthias was chosen to replace Judas Iscariot.',
        scripture: 'Acts 1:15-26'
      },
      {
        id: 'thomas-apostle',
        title: 'St. Thomas the Apostle',
        description: 'Doubting Apostle, patron of India',
        prayers: [
          'Prayer: "St. Thomas, who touched the wounds of Christ..."',
          'Novena for skeptics and for those struggling with faith'
        ],
        catechism: 'Thomas is the patron saint of India and architects.',
        scripture: 'John 20:24-29'
      },
      {
        id: 'simon-peter',
        title: 'St. Simon Peter',
        description: 'First Pope, fisherman apostle',
        prayers: [
          'Prayer: "St. Peter, first Pope and Vicar of Christ..."',
          'Novena for the Pope and for the papacy'
        ],
        catechism: 'Peter was the first Pope and the leader of the apostles.',
        scripture: 'Matthew 16:18-19'
      },
      {
        id: 'jude-thaddaeus',
        title: 'St. Jude Thaddaeus',
        description: 'Apostle, patron of lost causes',
        prayers: [
          'Prayer to St. Jude: "St. Jude, apostle of Christ, intercede for us..."',
          'Novena for hopeless situations and desperate cases'
        ],
        catechism: 'Jude Thaddaeus is the patron saint of hopeless causes.',
        scripture: 'Luke 6:16'
      }
    ]
  },
  scripture: {
    title: 'Scripture',
    icon: '📜',
    description: 'Bible readings and passages',
    items: [
      {
        id: 'psalms',
        title: 'Psalms',
        description: 'Prayers and songs from Scripture',
        prayers: [
          'Psalm 1: Blessed is the man who follows not the counsel of the wicked',
          'Psalm 23: The Lord is my shepherd, I shall not want',
          'Psalm 27: The Lord is my light and my salvation',
          'Psalm 42: As the deer longs for running water',
          'Psalm 51: Have mercy on me, O God, in your goodness',
          'Psalm 91: You who dwell in the shelter of the Most High',
          'Psalm 100: Cry out with joy to the Lord, all the earth',
          'Psalm 103: Bless the Lord, O my soul, and all my being',
          'Psalm 121: I lift up my eyes toward the mountains',
          'Psalm 127: Unless the Lord build the house',
          'Psalm 130: Out of the depths I cry to you, O Lord',
          'Psalm 150: Praise the Lord in his sanctuary'
        ],
        catechism: 'The Psalms are prayers and hymns used in the Liturgy and personal prayer.',
        scripture: 'Psalms 1, 23, 27, 42, 51, 91, 100, 103, 121, 127, 130, 150'
      },
      {
        id: 'gospel-parables',
        title: 'Parables of Jesus',
        description: 'Teachings through stories',
        prayers: [
          'The Prodigal Son - God\'s mercy',
          'The Good Samaritan - Love your neighbor',
          'The Sower - Receiving God\'s word',
          'The Lost Sheep - God seeks the lost',
          'The Mustard Seed - Growth of faith',
          'The Talents - Using gifts wisely',
          'The Unforgiving Servant - Mercy and forgiveness',
          'The Workers in the Vineyard - God\'s generosity',
          'The Tenants - Rejection of prophets',
          'The Wedding Feast - Call to salvation'
        ],
        catechism: 'Parables teach us about God\'s kingdom and how to live as His disciples.',
        scripture: 'Luke 15, Luke 10, Matthew 13, Matthew 25'
      },
      {
        id: 'miracles',
        title: 'Miracles of Jesus',
        description: 'Signs of God\'s power',
        prayers: [
          'Wedding at Cana - First miracle',
          'Feeding the 5000 - God\'s provision',
          'Healing the blind - Physical and spiritual sight',
          'Raising Lazarus - Power over death',
          'Calming the storm - Trust in God',
          'Healing the leper - Compassion for outcasts',
          'Walking on water - Faith',
          'Healing the paralytic - Forgiveness of sins',
          'Raising Jairus\' daughter - Faith of parents',
          'Healing the deaf mute - Opening ears to faith'
        ],
        catechism: 'Miracles reveal Jesus\' divine power and compassion.',
        scripture: 'John 2, Mark 6, Mark 10, John 11, Mark 4, Mark 1'
      },
      {
        id: 'gospel-readings',
        title: 'Gospel Readings',
        description: 'Life and teachings of Jesus',
        prayers: [
          'Birth of Jesus - Matthew 2, Luke 2',
          'Baptism of Jesus - Matthew 3, Mark 1',
          'Temptation in desert - Matthew 4, Luke 4',
          'Sermon on the Mount - Matthew 5-7',
          'Parables - Matthew 13, Mark 4, Luke 15',
          'Miracles - Throughout Gospels',
          'Transfiguration - Matthew 17, Mark 9, Luke 9',
          'Institution of Eucharist - Matthew 26, Mark 14, Luke 22',
          'Crucifixion - Matthew 27, Mark 15, Luke 23, John 19',
          'Resurrection - Matthew 28, Mark 16, Luke 24, John 20'
        ],
        catechism: 'The Gospels proclaim the good news of Jesus Christ\'s life, death, and resurrection.',
        scripture: 'Matthew, Mark, Luke, John'
      },
      {
        id: 'epistles',
        title: 'Pauline Epistles',
        description: 'Letters of St. Paul',
        prayers: [
          'Romans - Salvation through faith',
          '1 Corinthians - Christian living and resurrection',
          '2 Corinthians - Comfort in suffering',
          'Galatians - Freedom in Christ',
          'Ephesians - Unity of the Church',
          'Philippians - Joy in Christ',
          'Colossians - Christ\'s supremacy',
          '1 Thessalonians - Second coming',
          '2 Timothy - Faithfulness to the end'
        ],
        catechism: 'Paul\'s letters explain Christian doctrine and guide the early Church.',
        scripture: 'Romans, Corinthians, Galatians, Ephesians, Philippians, Colossians, Thessalonians'
      },
      {
        id: 'proverbs',
        title: 'Wisdom Literature',
        description: 'Proverbs, Ecclesiastes, Wisdom',
        prayers: [
          'Proverbs - Practical wisdom for daily living',
          'Ecclesiastes - Meaning of life',
          'Wisdom - Personification of divine wisdom',
          'Sirach - Teachings on wisdom and virtue',
          'Job - Suffering and God\'s sovereignty',
          'Song of Songs - God\'s love for His people'
        ],
        catechism: 'Wisdom literature teaches practical living and deeper spiritual truths.',
        scripture: 'Proverbs, Ecclesiastes, Wisdom, Sirach, Job, Song of Songs'
      }
    ]
  },
  devotions: {
    title: 'Devotions',
    icon: '💒',
    description: 'Traditional Catholic practices',
    items: [
      {
        id: 'eucharistic-adoration',
        title: 'Eucharistic Adoration',
        description: 'Prayer before the Blessed Sacrament',
        prayers: [
          'Prayer before Exposition: "Lord Jesus Christ, we thank you for giving us your Body and Blood..."',
          'Prayer during Adoration: "My Lord Jesus Christ, I believe that you are truly present..."'
        ],
        catechism: 'Adoration is the worship of the Eucharistic Christ outside of Mass.',
        scripture: 'Matthew 28:20'
      },
      {
        id: 'stations-cross',
        title: 'Stations of the Cross',
        description: 'Meditation on Christ\'s passion',
        prayers: [
          '14 stations commemorating Jesus\' journey from condemnation to burial',
          'Opening: "We adore you, O Christ, and we bless you, because by your holy cross..."'
        ],
        catechism: 'The Stations help us unite our suffering with Christ\'s passion.',
        scripture: 'Luke 23:26-49'
      },
      {
        id: 'liturgy-hours',
        title: 'Liturgy of the Hours',
        description: 'Prayer throughout the day',
        prayers: [
          'Morning Prayer (Lauds): Opening the day with praise',
          'Evening Prayer (Vespers): Thanking God for the day',
          'Night Prayer (Compline): Commending ourselves to God before sleep',
          'Office of Readings: Scripture and Church Fathers'
        ],
        catechism: 'The Liturgy of the Hours sanctifies the entire day with prayer.',
        scripture: 'Psalm 119:164, Acts 3:1'
      },
      {
        id: 'novena',
        title: 'Novenas',
        description: 'Nine days of prayer',
        prayers: [
          'Novena to the Holy Spirit',
          'Novena to Our Lady of the Miraculous Medal',
          'Novena to St. Joseph',
          'Novena for the Holy Souls in Purgatory',
          'Novena to St. Jude',
          'Novena to St. Anthony',
          'Novena to Sacred Heart of Jesus',
          'Novena to Immaculate Heart of Mary'
        ],
        catechism: 'Novenas are nine days of prayer for a special intention.',
        scripture: 'Acts 1:12-14 (nine days of prayer before Pentecost)'
      },
      {
        id: 'first-friday',
        title: 'First Friday Devotion',
        description: 'Devotion to Sacred Heart of Jesus',
        prayers: [
          'Nine First Fridays: Reparation for sins through communion',
          'Sacred Heart promises: "I will give them all the graces necessary for their state of life"'
        ],
        catechism: 'Devotion to the Sacred Heart of Jesus, emphasizing His love and mercy.',
        scripture: 'John 19:34, Ephesians 3:17-19'
      },
      {
        id: 'first-saturday',
        title: 'First Saturday Devotion',
        description: 'Devotion to Immaculate Heart of Mary',
        prayers: [
          'Five First Saturdays: Reparation for blasphemies against Mary',
          'Rosary, meditation, and communion for five consecutive Saturdays'
        ],
        catechism: 'Devotion to the Immaculate Heart of Mary as requested at Fatima.',
        scripture: 'Luke 2:19, Luke 2:51'
      },
      {
        id: 'scapular',
        title: 'Brown Scapular',
        description: 'Mary\'s protection',
        prayers: [
          'Wearing the scapular is a sign of consecration to Mary',
          'Sabbatine Privilege: Mary\'s help for souls in purgatory'
        ],
        catechism: 'The scapular is a sign of devotion to Mary and her protection.',
        scripture: 'Genesis 3:15'
      },
      {
        id: 'holy-hour',
        title: 'Holy Hour',
        description: 'Hour of prayer with Jesus',
        prayers: [
          'Hour of adoration before the Blessed Sacrament',
          'Meditation on Christ\'s passion in Gethsemane'
        ],
        catechism: 'A Holy Hour is an hour of prayer and meditation on Christ\'s suffering.',
        scripture: 'Matthew 26:36-46'
      }
    ]
  },
  traditions: {
    title: 'Catholic Traditions',
    icon: '⛪',
    description: 'Church history and practices',
    items: [
      {
        id: 'liturgical-year',
        title: 'Liturgical Calendar',
        description: 'Church year and seasons',
        prayers: [
          'Advent: Preparation for Christmas (4 weeks)',
          'Christmas: Celebration of Christ\'s birth (12 days)',
          'Lent: 40 days of penance before Easter',
          'Easter: Celebration of resurrection (50 days)',
          'Ordinary Time: Weeks outside major seasons',
          'Feast days: Saints\' days and holy days of obligation'
        ],
        catechism: 'The liturgical year celebrates the mysteries of Christ\'s life.',
        scripture: 'Leviticus 23, Colossians 2:16-17'
      },
      {
        id: 'holy-days',
        title: 'Holy Days of Obligation',
        description: 'Major feast days requiring Mass',
        prayers: [
          'Mary, Mother of God - January 1',
          'Epiphany - January 6',
          'Ascension of Jesus - 40 days after Easter',
          'Assumption of Mary - August 15',
          'All Saints - November 1',
          'Immaculate Conception - December 8',
          'Christmas - December 25'
        ],
        catechism: 'Holy days are special celebrations requiring participation in Mass.',
        scripture: 'Acts 2:1, Leviticus 23'
      },
      {
        id: 'church-fathers',
        title: 'Church Fathers',
        description: 'Early Christian theologians',
        prayers: [
          'Patristic Period: 1st-8th centuries',
          'Eastern Fathers: Athanasius, Basil, Gregory Nazianzen, John Chrysostom',
          'Western Fathers: Ambrose, Jerome, Augustine, Gregory the Great',
          'Desert Fathers: Early monastics and hermits',
          'Their writings preserve and explain apostolic teaching'
        ],
        catechism: 'The Church Fathers preserved apostolic teaching and developed theology.',
        scripture: '2 Timothy 2:2, Jude 1:3'
      },
      {
        id: 'ecumenical-councils',
        title: 'Ecumenical Councils',
        description: 'Church-wide teaching councils',
        prayers: [
          'Council of Nicaea (325) - Defended Christ\'s divinity',
          'Council of Constantinople (381) - Affirmed Trinity',
          'Council of Ephesus (431) - Mary as Mother of God',
          'Council of Chalcedon (451) - Christ\'s two natures',
          'Council of Trent (1545-1563) - Reformation response',
          'Vatican I (1869-1870) - Papal infallibility',
          'Vatican II (1962-1965) - Church in modern world'
        ],
        catechism: 'Ecumenical councils define Catholic doctrine and practice.',
        scripture: 'Acts 15 (Council of Jerusalem)'
      },
      {
        id: 'papacy',
        title: 'The Papacy',
        description: 'Pope as successor to Peter',
        prayers: [
          'Prayer for the Pope: "Lord, we pray for Your Holy Father Pope Francis..."',
          'Papal infallibility: Teaching authority on faith and morals',
          'Apostolic succession: Unbroken line from Peter',
          'Petrine primacy: Pope as visible head of Church'
        ],
        catechism: 'The Pope is the successor of St. Peter and Christ\'s representative on earth.',
        scripture: 'Matthew 16:18-19, John 21:15-17'
      },
      {
        id: 'relics',
        title: 'Veneration of Relics',
        description: 'Honoring holy objects and remains',
        prayers: [
          'First-class relics: Body or parts of saints',
          'Second-class relics: Items used by saints',
          'Third-class relics: Objects touched to relics',
          'Veneration vs. Worship: Honoring, not adoring'
        ],
        catechism: 'Relics connect us to the saints and their holy example.',
        scripture: 'Acts 19:11-12, 2 Kings 13:21'
      },
      {
        id: 'icons',
        title: 'Religious Art and Icons',
        description: 'Visual expressions of faith',
        prayers: [
          'Iconography: Windows to heaven',
          'Religious statues: Reminders of holy models',
          'Crucifix: Remembrance of Christ\'s sacrifice',
          'Stained glass: Teaching through beauty'
        ],
        catechism: 'Sacred art helps elevate the mind to God.',
        scripture: 'Exodus 25:18-22, Psalm 96:6'
      }
    ]
  },
  socialTeaching: {
    title: 'Catholic Social Teaching',
    icon: '🤝',
    description: 'Gospel values in society',
    items: [
      {
        id: 'life',
        title: 'Life Issues',
        description: 'Sanctity of all human life',
        prayers: [
          'Respect for life from conception to natural death',
          'Abortion: Protecting the unborn',
          'Euthanasia: Dignity in suffering',
          'Death penalty: Gospel of life',
          'War and peace: Just war theory'
        ],
        catechism: 'All human life is sacred from conception to natural death.',
        scripture: 'Jeremiah 1:5, Psalm 139, Deuteronomy 30:19'
      },
      {
        id: 'family',
        title: 'Family Life',
        description: 'Domestic Church',
        prayers: [
          'Marriage: Between man and woman',
          'Parenting: Forming children in faith',
          'Respect for elders: Honoring parents',
          'Family prayer: Foundation of faith life'
        ],
        catechism: 'The family is the domestic church and foundation of society.',
        scripture: 'Ephesians 5:22-6:4, Colossians 3:18-21'
      },
      {
        id: 'work',
        title: 'Dignity of Work',
        description: 'Labor and economic justice',
        prayers: [
          'Workers rights: Just wage and conditions',
          'Unions: Right to organize',
          'Private property: Stewardship of resources',
          'Business ethics: Serving the common good'
        ],
        catechism: 'Work participates in God\'s creation and should be justly compensated.',
        scripture: 'Genesis 2:15, Leviticus 19:13, James 5:4'
      },
      {
        id: 'poverty',
        title: 'Option for the Poor',
        description: 'Solidarity with the marginalized',
        prayers: [
          'Preferential option for the poor',
          'Care for the vulnerable',
          'Just distribution of resources',
          'Charity and justice'
        ],
        catechism: 'Christ identified with the poor; we must do likewise.',
        scripture: 'Matthew 25:31-46, Luke 4:18-19, James 2:14-17'
      },
      {
        id: 'peace',
        title: 'Peace and Justice',
        description: 'Building God\'s kingdom',
        prayers: [
          'Peacemaking: Blessed are the peacemakers',
          'Just war theory: Limited use of force',
          'Disarmament: Reducing violence',
          'Reconciliation: Forgiveness and healing'
        ],
        catechism: 'Peace is the fruit of charity and justice.',
        scripture: 'Matthew 5:9, Romans 12:18, Isaiah 32:17'
      },
      {
        id: 'ecology',
        title: 'Care for Creation',
        description: 'Environmental stewardship',
        prayers: [
          'Stewardship: Caring for God\'s creation',
          'Sustainable development: For future generations',
          'Climate justice: Protecting the vulnerable',
          'Laudato Si\' encyclical on ecology'
        ],
        catechism: 'We are called to be stewards of God\'s creation.',
        scripture: 'Genesis 1:26-31, Psalm 24:1'
      }
    ]
  },
  moralLife: {
    title: 'Moral Life',
    icon: '⚖️',
    description: 'Living Christian virtues',
    items: [
      {
        id: 'virtues',
        title: 'Theological Virtues',
        description: 'Faith, Hope, Charity',
        prayers: [
          'Faith: Believing in God and His revelation',
          'Hope: Trusting in God\'s promises',
          'Charity: Loving God above all things'
        ],
        catechism: 'The theological virtues direct us to God.',
        scripture: '1 Corinthians 13:13, 1 Thessalonians 1:3'
      },
      {
        id: 'cardinal',
        title: 'Cardinal Virtues',
        description: 'Prudence, Justice, Fortitude, Temperance',
        prayers: [
          'Prudence: Right reason in action',
          'Justice: Giving each his due',
          'Fortitude: Courage in pursuing good',
          'Temperance: Moderation in pleasures'
        ],
        catechism: 'The cardinal virtues are the foundation of moral life.',
        scripture: 'Wisdom 8:7, Proverbs 31'
      },
      {
        id: 'gifts-holy-spirit',
        title: 'Seven Gifts of Holy Spirit',
        description: 'Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, Fear of the Lord',
        prayers: [
          'Wisdom: Seeing things from God\'s perspective',
          'Understanding: Grasping divine truths',
          'Counsel: Right judgment in decisions',
          'Fortitude: Courage to do good',
          'Knowledge: Knowing God\'s will',
          'Piety: Reverence toward God',
          'Fear of the Lord: Awe and respect for God'
        ],
        catechism: 'The gifts of the Holy Spirit perfect the virtues.',
        scripture: 'Isaiah 11:2-3'
      },
      {
        id: 'fruits-holy-spirit',
        title: 'Twelve Fruits of Holy Spirit',
        description: 'Charity, Joy, Peace, Patience, Kindness, Goodness, Generosity, Gentleness, Faithfulness, Modesty, Self-control, Chastity',
        prayers: [
          'The fruits are the perfections that the Holy Spirit forms in us',
          'They manifest the presence of Christ in our lives'
        ],
        catechism: 'The fruits are the good works produced by the Spirit\'s presence.',
        scripture: 'Galatians 5:22-23'
      },
      {
        id: 'sins',
        title: 'Seven Deadly Sins',
        description: 'Pride, Greed, Lust, Envy, Gluttony, Wrath, Sloth',
        prayers: [
          'Pride: Excessive self-love',
          'Greed: Excessive desire for wealth',
          'Lust: Misuse of sexuality',
          'Envy: Jealousy of others\' goods',
          'Gluttony: Excessive consumption',
          'Wrath: Uncontrolled anger',
          'Sloth: Spiritual laziness'
        ],
        catechism: 'These are the root sins that give rise to other sins.',
        scripture: 'Proverbs 6:16-19, Galatians 5:19-21'
      },
      {
        id: 'commandments-church',
        title: 'Precepts of the Church',
        description: 'Minimum requirements for Catholics',
        prayers: [
          '1. Attend Mass on Sundays and holy days',
          '2. Confess sins annually',
          '3. Receive Communion during Easter season',
          '4. Observe fast and abstinence days',
          '5. Support the Church financially'
        ],
        catechism: 'The precepts set the minimum for Catholic Christian life.',
        scripture: 'Acts 2:42'
      }
    ]
  },
  mary: {
    title: 'Marian Devotion',
    icon: '🌹',
    description: 'Devotions to the Blessed Mother',
    items: [
      {
        id: 'rosary-mysteries',
        title: 'Rosary Mysteries',
        description: 'Meditations on Christ\'s life',
        prayers: [
          'Joyful: Annunciation, Visitation, Nativity, Presentation, Finding Jesus',
          'Sorrowful: Agony, Scourging, Crowning, Carrying Cross, Crucifixion',
          'Glorious: Resurrection, Ascension, Descent of Spirit, Assumption, Coronation',
          'Luminous: Baptism, Wedding at Cana, Kingdom Proclamation, Transfiguration, Eucharist'
        ],
        catechism: 'The Rosary is the school of Mary, learning Christ\'s life through her eyes.',
        scripture: 'Luke 1:28, Luke 2:19'
      },
      {
        id: 'marian-apparitions',
        title: 'Marian Apparitions',
        description: 'Approved appearances of Mary',
        prayers: [
          'Our Lady of Guadalupe (1531): Patroness of the Americas',
          'Our Lady of Lourdes (1858): Immaculate Conception',
          'Our Lady of Fatima (1917): Prayer and penance',
          'Our Lady of Knock (1879): Irish apparition',
          'Our Lady of Lasalette (1846): Reconciliation'
        ],
        catechism: 'Approved apparitions have been recognized by the Church.',
        scripture: 'Genesis 3:15, Luke 1:28'
      },
      {
        id: 'marian-titles',
        title: 'Titles of Mary',
        description: 'Honors given to Mary',
        prayers: [
          'Mother of God (Theotokos)',
          'Mother of the Church',
          'Queen of Heaven',
          'Mother of Mercy',
          'Our Lady of the Rosary',
          'Immaculate Conception',
          'Assumption into Heaven',
          'Ever Virgin',
          'Seat of Wisdom',
          'Refuge of Sinners'
        ],
        catechism: 'These titles honor Mary\'s role in salvation history.',
        scripture: 'Luke 1:43, Luke 1:48'
      },
      {
        id: 'marian-prayers',
        title: 'Marian Prayers',
        description: 'Traditional prayers to Mary',
        prayers: [
          'Hail Mary',
          'Hail Holy Queen',
          'Memorare',
          'Angelus: "The Angel of the Lord declared unto Mary..."',
          'Regina Coeli: "Queen of Heaven, rejoice..."',
          'Sub Tuum: "We fly to thy patronage, O Holy Mother of God..."',
          'Magnificat'
        ],
        catechism: 'These prayers express devotion to Mary and ask for her intercession.',
        scripture: 'Luke 1:28, Luke 1:42-55'
      }
    ]
  }
};

type MenuCategory = keyof typeof catholicContent;

interface CatholicMenuProps {
  onSelectItem: (category: string, item: any) => void;
  onClose: () => void;
  initialCategory?: string;
}

export default function CatholicMenu({ onSelectItem, onClose, initialCategory }: CatholicMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(
    initialCategory ? (initialCategory as MenuCategory) : null
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Enhanced comprehensive search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchTerms = lowerQuery.split(/\s+/).filter(term => term.length > 2); // Split into terms, filter short ones
    const primaryTerm = lowerQuery;

    // Collect all matching content
    const matches: any[] = [];
    const saintMatches: any[] = [];
    const prayerMatches: any[] = [];
    const teachingMatches: any[] = [];
    const scriptureMatches: any[] = [];

    Object.entries(catholicContent).forEach(([catKey, category]: [string, any]) => {
      category.items.forEach((item: any) => {
        const itemTitle = item.title.toLowerCase();
        const itemDesc = item.description?.toLowerCase() || '';
        const itemCatechism = item.catechism?.toLowerCase() || '';
        const itemScripture = item.scripture?.toLowerCase() || '';
        const itemPrayers = item.prayers || [];

        // Check if this item matches the search
        const matchesTitle = itemTitle.includes(primaryTerm) ||
                            searchTerms.some(term => itemTitle.includes(term));
        const matchesDesc = itemDesc.includes(primaryTerm) ||
                          searchTerms.some(term => itemDesc.includes(term));
        const matchesPrayers = itemPrayers.some((p: string) =>
          p.toLowerCase().includes(primaryTerm) || searchTerms.some(term => p.toLowerCase().includes(term))
        );
        const matchesCatechism = itemCatechism.includes(primaryTerm) ||
                               searchTerms.some(term => itemCatechism.includes(term));
        const matchesScripture = itemScripture.includes(primaryTerm) ||
                                searchTerms.some(term => itemScripture.includes(term));

        if (matchesTitle || matchesDesc || matchesPrayers || matchesCatechism || matchesScripture) {
          const matchObj = {
            ...item,
            category: category.title,
            categoryKey: catKey,
            matchType: matchesTitle ? 'title' : matchesDesc ? 'description' : matchesPrayers ? 'prayers' :
                      matchesCatechism ? 'catechism' : 'scripture',
            relevance: calculateRelevance(item, primaryTerm, searchTerms)
          };

          // Categorize matches
          if (catKey === 'saints') {
            saintMatches.push(matchObj);
          } else if (catKey === 'prayers' || catKey === 'devotions' || catKey === 'mary') {
            prayerMatches.push(matchObj);
          } else if (catKey === 'catechism' || catKey === 'moralLife' || catKey === 'socialTeaching' || catKey === 'traditions') {
            teachingMatches.push(matchObj);
          } else if (catKey === 'scripture') {
            scriptureMatches.push(matchObj);
          } else {
            matches.push(matchObj);
          }
        }
      });
    });

    // Sort by relevance
    const sortByRelevance = (a: any, b: any) => b.relevance - a.relevance;
    saintMatches.sort(sortByRelevance);
    prayerMatches.sort(sortByRelevance);
    teachingMatches.sort(sortByRelevance);
    scriptureMatches.sort(sortByRelevance);
    matches.sort(sortByRelevance);

    // Combine results with categories
    const allResults = [
      ...saintMatches.map(m => ({ ...m, resultType: 'Saint' })),
      ...prayerMatches.map(m => ({ ...m, resultType: 'Prayer' })),
      ...teachingMatches.map(m => ({ ...m, resultType: 'Teaching' })),
      ...scriptureMatches.map(m => ({ ...m, resultType: 'Scripture' })),
      ...matches.map(m => ({ ...m, resultType: m.category }))
    ];

    setSearchResults(allResults);
  }, []);

  // Calculate relevance score for search results
  const calculateRelevance = (item: any, primaryTerm: string, searchTerms: string[]): number => {
    let score = 0;
    const title = item.title.toLowerCase();
    const desc = item.description?.toLowerCase() || '';
    const catechism = item.catechism?.toLowerCase() || '';

    // Exact title match gets highest score
    if (title === primaryTerm) score += 100;
    else if (title.includes(primaryTerm)) score += 50;

    // Title contains search terms
    searchTerms.forEach(term => {
      if (title.includes(term)) score += 30;
    });

    // Description match
    if (desc.includes(primaryTerm)) score += 20;
    searchTerms.forEach(term => {
      if (desc.includes(term)) score += 10;
    });

    // Catechism match
    if (catechism.includes(primaryTerm)) score += 15;

    return score;
  };

  const handleSelectItem = (categoryKey: string, item: any) => {
    setSelectedItem(item);
    onSelectItem(categoryKey, item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-geist">Sacred Library</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search anything Catholic - prayers, saints, teachings, scripture..."
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-geist"
            />
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[60vh]">
          {searchQuery ? (
            // Enhanced Search Results
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-geist">
                Search Results for "{searchQuery}" ({searchResults.length})
              </h3>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectItem(item.categoryKey, item)}
                      className="w-full text-left p-4 rounded-xl bg-white hover:bg-purple-50 transition-all border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <span className="text-2xl">{item.icon}</span>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-gray-800 font-geist">{item.title}</h4>
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-geist">
                              {item.resultType}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-geist">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 font-geist">{item.description}</p>

                          {/* Show what's included */}
                          {(item.prayers && item.prayers.length > 0) && (
                            <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-xs font-semibold text-green-700 mb-1 font-geist">✨ Includes {item.prayers.length} {item.prayers.length === 1 ? 'prayer' : 'prayers'}:</p>
                              <p className="text-xs text-green-600 font-geist line-clamp-2">{item.prayers[0].substring(0, 150)}...</p>
                            </div>
                          )}

                          {item.catechism && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-xs font-semibold text-blue-700 mb-1 font-geist">📖 Teaching:</p>
                              <p className="text-xs text-blue-600 font-geist line-clamp-2">{item.catechism}</p>
                            </div>
                          )}

                          {item.scripture && (
                            <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                              <p className="text-xs font-semibold text-amber-700 mb-1 font-geist">📜 Scripture: {item.scripture}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <p className="text-gray-600 font-geist mb-2">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500 font-geist">Try searching for saints, prayers, sacraments, or teachings</p>
                </div>
              )}
            </div>
          ) : activeCategory ? (
            // Sub-items for selected category
            <div>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-geist"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to categories
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-1 font-geist">
                {catholicContent[activeCategory].icon} {catholicContent[activeCategory].title}
              </h3>
              <p className="text-gray-600 mb-4 font-geist">{catholicContent[activeCategory].description}</p>
              <div className="space-y-2">
                {catholicContent[activeCategory].items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(activeCategory, item)}
                    className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors border border-gray-200 hover:border-purple-300 group"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 font-geist">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 font-geist">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Main Categories
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(catholicContent).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as MenuCategory)}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all border border-purple-200 hover:border-purple-300 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-purple-700 font-geist">{category.title}</h3>
                      <p className="text-sm text-gray-600 font-geist">{category.description}</p>
                      <p className="text-xs text-purple-600 mt-1 font-geist">{category.items.length} items</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
