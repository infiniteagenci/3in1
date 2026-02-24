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
        story: 'Baptism is the first sacrament of initiation, washing away original sin and making us children of God. Jesus was baptized by John in the Jordan, and He commanded His apostles to baptize all nations in the name of the Father, Son, and Holy Spirit.',
        ageGroups: {
          infants: 'Infants are typically baptized within weeks of birth. Parents and godparents promise to raise the child in the Catholic faith. The baby is anointed with holy oils and water is poured over the head three times.',
          children: 'Children of catechetical age (7+) enter the Rite of Christian Initiation for Children (RCIC). They receive special instruction and preparation before receiving Baptism, Confirmation, and First Eucharist at the Easter Vigil.',
          teens: 'Teens who were not baptized as children enter the Rite of Christian Initiation for Teens (RCIT). They journey toward the Easter sacraments with their peers, learning the faith and preparing for full initiation.',
          adults: 'Adults enter the Rite of Christian Initiation for Adults (RCIA). This is a months-long process of learning about the Catholic faith, culminating in receiving Baptism, Confirmation, and First Eucharist at the Easter Vigil.'
        },
        prayers: [
          `Prayer for Baptism:

Almighty, ever-living God, Your only-begotten Son has shared in our humanity, and in so doing, has united us in His body. We pray that by Your grace, we may be made one with Him in body and spirit, and share in His divine life. Through Christ our Lord. Amen.`,
          `Baptismal Promises:

Do you reject Satan? And all his works? And all his empty show?

I do.

Do you reject Satan, and all his works, and all his empty promises?

I do.

Do you believe in God, the Father Almighty, Creator of heaven and earth?

I do.

Do you believe in Jesus Christ, the only Son of God, our Lord, who was born of the Virgin Mary, suffered death, and was buried, rose again from the dead, and is now seated at the right hand of the Father?

I do.

Do you believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting?

I do.`,
          `Renewal of Baptismal Promises:

I reject Satan; and all his works; and all his empty show.

I believe in God, the Father Almighty, Creator of heaven and earth.

I believe in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead.

I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`
        ],
        catechism: 'Baptism is the first sacrament of initiation, freeing us from original sin and making us members of the Church. Through Baptism, we are reborn as children of God and made sharers in the Church\'s mission.',
        scripture: `Matthew 28:19

"Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."

Romans 6:4

"We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead by the glory of the Father, we too might walk in newness of life."`
      },
      {
        id: 'eucharist',
        title: 'Holy Eucharist',
        description: 'The source and summit of Christian life',
        story: 'At the Last Supper, Jesus took bread, blessed it, broke it, and gave it to His disciples saying "This is my body." He did the same with the cup, saying "This is my blood." He commanded them to "Do this in memory of me." The Eucharist is truly the Body and Blood of Christ.',
        ageGroups: {
          infants: 'Infants who are in danger of death may receive Holy Communion as Viaticum. The Church desires that even the youngest not be deprived of this spiritual food.',
          children: 'Children typically receive First Holy Communion around age 7-8 (second grade). They prepare through religious education, learning about the Real Presence, the Mass, and how to receive reverently.',
          teens: 'Teens should continue to receive Eucharist weekly. Many parishes offer teen Masses and youth programs to help them understand and appreciate this sacrament more deeply.',
          adults: 'Adults are obligated to attend Mass and receive Communion at least once a year (Easter Duty), though the Church encourages weekly reception. Adults must fast for one hour before receiving.'
        },
        prayers: [
          `Prayer before Communion:

Lord Jesus Christ, with faith in your love and mercy, I approach the table of Your most sacred banquet. I cannot receive You in Holy Communion. Come spiritually into my heart. cleanse me from all sin, and let me never be separated from You. Amen.`,
          `Prayer after Communion:

Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed. (3 times)

Lord Jesus Christ, You gave Your life for me. May I love You and serve You all the days of my life. Amen.`,
          `Act of Spiritual Communion:

My Jesus, I believe that You are present in the Holy Sacrament. I love You above all things, and I long to receive You into my soul. Since I cannot now receive You sacramentally, come at least spiritually into my heart. I embrace You as if You were already there, and I unite myself wholly to You. Amen.`,
          `Anima Christi:

Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O good Jesus, hear me.
Within Your wounds, hide me.
Permit me not to be separated from You.
From the wicked enemy, defend me.
At the hour of my death, call me.
And bid me come to You,
That with Your saints I may praise You
Forever and ever. Amen.`
        ],
        catechism: 'The Eucharist is the memorial of Christ\'s Passover, the source and summit of Christian life, containing the whole spiritual good of the Church. In the Eucharist, Christ Himself is truly present - Body, Blood, Soul, and Divinity under the appearances of bread and wine.',
        scripture: `John 6:53-58

Jesus said to them, "Truly, truly, I say to you, unless you eat the flesh of the Son of Man and drink his blood, you have no life in you. Whoever feeds on my flesh and drinks my blood has eternal life, and I will raise him on the last day. For my flesh is true food, and my blood is true drink. Whoever eats my flesh and drinks my blood remains in me and I in him."

1 Corinthians 11:23-29

For I received from the Lord what I also handed on to you, that the Lord Jesus, on the night he was handed over, took bread, and after he had given thanks, broke it and said, "This is my body that is for you. Do this in memory of me." In the same way also the cup, after supper, saying, "This cup is the new covenant in my blood. Do this, as often as you drink it, in memory of me." For as often as you eat this bread and drink the cup, you proclaim the death of the Lord until he comes.`
      },
      {
        id: 'confirmation',
        title: 'Confirmation',
        description: 'Completion of baptismal grace',
        story: 'Confirmation completes the sacraments of initiation. In the early Church, bishops would confirm all baptisms by laying on hands and anointing with chrism. Today, the bishop anoints with chrism on the forehead, saying "Be sealed with the Gift of the Holy Spirit."',
        ageGroups: {
          infants: 'Infants in danger of death may be confirmed immediately after baptism, receiving the fullness of the Holy Spirit.',
          children: 'In many dioceses, children are confirmed between ages 7-9, often together with First Eucharist. This restores the ancient order of initiation sacraments.',
          teens: 'In some dioceses, teens are confirmed around age 15-16 (high school). Preparation includes retreats, service projects, and instruction on the Holy Spirit\'s gifts and fruits.',
          adults: 'Adult converts receive Confirmation at the Easter Vigil along with Baptism and Eucharist. Adult Catholics who missed Confirmation can prepare through special programs and receive from the bishop.'
        },
        prayers: [
          'Prayer for Confirmation: "Come, Holy Spirit, fill the hearts of your faithful..."',
          'Sequence for Pentecost: "Come, Holy Spirit, come! And from your celestial home..."'
        ],
        catechism: 'Confirmation perfects Baptismal grace, gives us the special strength of the Holy Spirit, and obliges us to spread and defend the faith.',
        scripture: 'Acts 2:1-4, Acts 8:14-17'
      },
      {
        id: 'reconciliation',
        title: 'Reconciliation',
        description: 'Sacrament of healing and forgiveness',
        story: 'Jesus appeared to His apostles after resurrection, breathed on them, and said "Whose sins you forgive are forgiven them." Priests act in persona Christi, absolving sins in Jesus\' name. Confession includes examination of conscience, confession, penance, and absolution.',
        ageGroups: {
          infants: 'Infants cannot commit personal sin but still bear original sin, which is washed away in Baptism.',
          children: 'Children prepare for First Reconciliation around age 7, usually before First Communion. They learn the difference between right and wrong, and how to examine their conscience.',
          teens: 'Teens are encouraged to confess monthly or quarterly. Confession helps them navigate moral challenges, peer pressure, and growing independence with God\'s grace.',
          adults: 'Adults should confess at least once a year (preferably during Lent or Advent). Many find monthly confession helpful for spiritual growth. All serious sins must be confessed.'
        },
        prayers: [
          `Act of Contrition:

Oh my God, because you are so good,
I am very sorry that I have sinned against you,
and with the help of your grace,
I will not sin again. Amen.

Traditional version:
Oh my God, I am heartily sorry for having offended Thee, and I detest all my sins because of thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.`,
          `Examination of Conscience Prayer:

Come Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created. And you shall renew the face of the earth.

Lord, help me to see my sins as You see them. Give me the courage to confess them sincerely, the grace to amend my life, and the strength to follow Your holy will. Amen.`,
          `Prayer for Forgiveness:

Lord Jesus Christ, You are the mercy of the Father. I ask You to forgive me all my sins and the wrong I have done. I ask for Your mercy and Your love. I desire to sin no more and to live according to Your holy will. Amen.`
        ],
        catechism: 'Penance reconciles us with God and the Church, forgiving sins committed after Baptism. Through this sacrament, we are reconciled with God and with the Church community. The priest acts in the person of Christ (in persona Christi), granting absolution in Jesus\' name.',
        scripture: `John 20:22-23

Jesus breathed on them and said to them, "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained."

2 Corinthians 5:18-20

All this is from God, who has reconciled us to himself through Christ and given us the ministry of reconciliation... God was reconciling the world to himself in Christ, not counting people's sins against them. And he has committed to us the message of reconciliation.

We are therefore Christ's ambassadors, as though God were making his appeal through us.`
      },
      {
        id: 'anointing',
        title: 'Anointing of the Sick',
        description: 'Healing sacrament for the ill',
        story: 'Jesus and the apostles anointed many sick people with oil and healed them. This sacrament brings grace for the sick, strengthens them, and prepares them for eternal life if death is near. Formerly called "Extreme Unction," it is now available before death becomes imminent.',
        ageGroups: {
          infants: 'Infants who are critically ill may be anointed, giving them grace and strength. Parents should request the sacrament promptly.',
          children: 'Children facing serious illness, surgery, or chronic conditions can be anointed. The sacrament helps them understand suffering in light of Christ\'s passion.',
          teens: 'Teens with serious health conditions, mental illness, or facing major surgery can be anointed. It helps them unite their suffering with Christ\'s.',
          adults: 'Adults should request anointing when seriously ill, before major surgery, or in declining health due to age. It may be repeated if the condition worsens.'
        },
        prayers: [
          'Prayer for the Sick: "Lord Jesus Christ, you came to heal the sick..."',
          'Prayer for Healing: "Almighty and everlasting God, the eternal health..."'
        ],
        catechism: 'This sacrament unites the sick with Christ\'s suffering, brings peace, and may lead to physical healing if it is for the soul\'s good.',
        scripture: 'James 5:14-15, Mark 16:18'
      },
      {
        id: 'holy-orders',
        title: 'Holy Orders',
        description: 'Sacrament of apostolic ministry',
        story: 'Jesus chose twelve apostles and gave them authority to teach, sanctify, and lead. Through Holy Orders, bishops, priests, and deacons continue this ministry. Only men can be ordained, as Christ chose only men as apostles. Those ordained act in persona Christi.',
        ageGroups: {
          infants: 'Infants cannot be ordained but can be dedicated to God, as Samuel was in the Old Testament.',
          children: 'Boys as young as 7-8 may serve at the altar, fostering vocation awareness. Many priests first felt God\'s call while serving as altar boys.',
          teens: 'Teens considering priesthood can join discernment groups, attend seminary visits, and speak with vocation directors. High school seminaries exist for serious discerners.',
          adults: 'Adults (18+) enter seminary for 6-9 years of formation. Permanent deacons are often married men over 30, while priests remain celibate. Discernment continues throughout formation.'
        },
        prayers: [
          'Prayer for Priests: "Lord Jesus Christ, Eternal High Priest..."',
          'Prayer for Vocations: "Lord Jesus Christ, Shepherd of your people..."',
          'Prayer for Discernment: "God, I do not know if You are calling me to priesthood. Give me wisdom and clarity to know Your will."'
        ],
        catechism: 'Holy Orders ordains men to serve the Church as deacons, priests, and bishops, who act in persona Christi.',
        scripture: 'Luke 22:19-20, 1 Timothy 3:1-13'
      },
      {
        id: 'matrimony',
        title: 'Holy Matrimony',
        description: 'Sacred bond of marriage',
        story: 'God created marriage in the Garden of Eden. Jesus elevated it to a sacrament, making marriage a sign of His love for the Church. The couple are the ministers of the sacrament to each other; the priest witnesses. Valid Catholic marriage is permanent and open to children.',
        ageGroups: {
          infants: 'Infants born into valid marriages are legitimate and have rights to parental care. Parents model Christian marriage for their children.',
          children: 'Children from holy marriages learn love, fidelity, and sacrifice. They witness their parents\' faith and prepare for their own future vocations.',
          teens: 'Teens begin dating and learning about relationships. They are taught that marriage is permanent and should only be entered after serious discernment and preparation.',
          adults: 'Adults must be at least 18 (16 with permission) and complete marriage preparation (Pre-Cana). They must be free to marry (not previously married) and commit to permanence, fidelity, and openness to children.'
        },
        prayers: [
          'Prayer for Married Couples: "Lord God, you have consecrated marriage..."',
          'Prayer for Families: "God our Father, we thank you for the gift of family..."',
          'Prayer for Engaged Couples: "Lord, bless this couple as they prepare for marriage. Help them build a love that lasts a lifetime."'
        ],
        catechism: 'Marriage is a covenant between a man and woman, reflecting Christ\'s love for the Church - permanent, faithful, and open to life.',
        scripture: 'Ephesians 5:31-32, Matthew 19:4-6'
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
      },
      {
        id: 'our-father',
        title: 'Our Father (Lord\'s Prayer)',
        description: 'The prayer Jesus taught His disciples',
        prayers: ['Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.'],
        catechism: 'The summary of the entire Gospel and the perfect prayer taught by Jesus Himself.',
        scripture: 'Matthew 6:9-13, Luke 11:2-4'
      },
      {
        id: 'hail-mary',
        title: 'Hail Mary',
        description: 'Prayer honoring the Blessed Mother',
        prayers: ['Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'],
        catechism: 'A prayer of praise and petition to Mary, the Mother of God.',
        scripture: 'Luke 1:28, Luke 1:42'
      },
      {
        id: 'glory-be',
        title: 'Glory Be (Doxology)',
        description: 'Praise to the Holy Trinity',
        prayers: ['Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
        catechism: 'A short prayer of praise to the Holy Trinity.',
        scripture: 'Romans 16:27, Jude 1:25'
      },
      {
        id: 'apostles-creed',
        title: 'Apostles\' Creed',
        description: 'Statement of Catholic faith',
        prayers: ['I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried. He descended into hell; the third day He rose again from the dead; He ascended into heaven, and sits at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.'],
        catechism: 'The basic statement of Christian faith, dating to the early Church.',
        scripture: '1 Corinthians 15:3-4'
      },
      {
        id: 'nicene-creed',
        title: 'Nicene Creed',
        description: 'Profession of faith from the Mass',
        prayers: ['I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.'],
        catechism: 'The profession of faith used in the Liturgy, affirming core Catholic doctrines.',
        scripture: 'John 1:1-3, John 10:30'
      },
      {
        id: 'act-faith',
        title: 'Act of Faith',
        description: 'Profession of belief',
        prayers: ['O my God, I firmly believe that you are one God in three divine persons, Father, Son, and Holy Spirit. I believe that your divine Son became man and died for our sins, and that he will come to judge the living and the dead. I believe these and all the truths which your holy Catholic Church teaches, because you have revealed them, who can neither deceive nor be deceived. Amen.'],
        catechism: 'A prayer professing faith in the Holy Trinity and Catholic teachings.',
        scripture: 'Hebrews 11:1, 1 Corinthians 13:13'
      },
      {
        id: 'act-hope',
        title: 'Act of Hope',
        description: 'Prayer of trust in God\'s mercy',
        prayers: ['O my God, relying on your almighty power and infinite goodness and promises, I hope to obtain pardon of my sins, the help of your grace, and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer. Amen.'],
        catechism: 'A prayer expressing hope in God\'s promises and heaven.',
        scripture: 'Romans 15:13, Titus 2:13'
      },
      {
        id: 'act-charity',
        title: 'Act of Charity',
        description: 'Prayer of love for God',
        prayers: ['O my God, I love you above all things, with my whole heart and soul, because you are all-good and worthy of all love. I love my neighbor as myself for love of you. Forgive me for not loving you enough. Help me to love you more each day. Amen.'],
        catechism: 'A prayer expressing love for God and neighbor.',
        scripture: 'Matthew 22:37, 1 John 4:7-8'
      },
      {
        id: 'act-contrition',
        title: 'Act of Contrition',
        description: 'Prayer of sorrow for sin',
        prayers: ['O my God, I am heartily sorry for having offended you, and I detest all my sins because of your just punishments, but most of all because they offend you, my God, who are all-good and deserving of all my love. I firmly resolve, with the help of your grace, to sin no more and to avoid the near occasions of sin. Amen.'],
        catechism: 'A prayer expressing sorrow for sins and resolve to amend.',
        scripture: 'Psalm 51, 2 Corinthians 7:10'
      },
      {
        id: 'guardian-angel',
        title: 'Prayer to Guardian Angel',
        description: 'Prayer for angelic protection',
        prayers: ['Angel of God, my guardian dear, to whom God\'s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.'],
        catechism: 'A prayer to one\'s guardian angel for protection and guidance.',
        scripture: 'Psalm 91:11-12, Matthew 18:10'
      },
      {
        id: 'grace-meals',
        title: 'Grace Before Meals',
        description: 'Prayer of thanksgiving',
        prayers: ['Bless us, O Lord, and these your gifts, which we are about to receive from your bounty. Through Christ our Lord. Amen.'],
        catechism: 'A prayer thanking God for food and sustenance.',
        scripture: 'Matthew 14:19, Acts 27:35'
      },
      {
        id: 'grace-after',
        title: 'Grace After Meals',
        description: 'Thanksgiving after eating',
        prayers: ['We give you thanks, Almighty God, for all your benefits, who lives and reigns forever. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen.'],
        catechism: 'A prayer of gratitude after meals.',
        scripture: 'Deuteronomy 8:10, 1 Timothy 4:4-5'
      },
      {
        id: 'st-michael',
        title: 'Prayer to St. Michael',
        description: 'Protection against evil',
        prayers: ['St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do you, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.'],
        catechism: 'A prayer for protection and strength in spiritual warfare.',
        scripture: 'Revelation 12:7-9, Daniel 10:13'
      },
      {
        id: 'memorare',
        title: 'Memorare',
        description: 'Prayer to the Blessed Virgin Mary',
        prayers: ['Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to your protection, implored your help or sought your intercession, was left unaided. Inspired with this confidence, I fly to you, O Virgin of virgins, my Mother; to you do I come, before you I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in your mercy hear and answer me. Amen.'],
        catechism: 'A prayer of confidence in Mary\'s intercession.',
        scripture: 'John 2:1-11'
      },
      {
        id: 'rosary-prayer',
        title: 'The Holy Rosary',
        description: 'Meditative prayer on the life of Christ',
        prayers: [
          'Apostles\' Creed: I believe in God, the Father Almighty...',
          'Our Father: Our Father, who art in heaven...',
          'Hail Mary (10x): Hail Mary, full of grace...',
          'Glory Be: Glory be to the Father...',
          'Fatima Prayer: O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to heaven, especially those in most need of your mercy.',
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
          'Opening: You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.',
          'Eternal Father (10x): Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
          'For the sake of His sorrowful Passion, have mercy on us and on the whole world (10x)',
          'Holy God: Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world (3x)',
          'Closing: O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You.'
        ],
        catechism: 'Devotion to God\'s infinite mercy revealed to St. Faustina.',
        scripture: 'Psalm 136, Ephesians 2:4-5'
      },
      {
        id: 'holy-spirit-prayer',
        title: 'Prayer to the Holy Spirit',
        description: 'Invocation of the Holy Spirit',
        prayers: ['Come Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created. And You shall renew the face of the earth. O, God, who by the light of the Holy Spirit did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise and ever enjoy His consolations, Through Christ Our Lord, Amen.'],
        catechism: 'A prayer invoking the Holy Spirit for guidance and wisdom.',
        scripture: 'John 14:15-17, Acts 2:1-4'
      },
      {
        id: 'sacred-heart',
        title: 'Prayer to the Sacred Heart',
        description: 'Devotion to Jesus\' heart of love',
        prayers: ['O most holy Heart of Jesus, full of compassion and love, I give you my heart. Receive it, O Sacred Heart, and fill it with your holy love. Make me love you more each day. Jesus, meek and humble of heart, make my heart like yours. Amen.'],
        catechism: 'Devotion to the Sacred Heart of Jesus, emphasizing His love and mercy.',
        scripture: 'John 19:34, Ephesians 3:17-19'
      },
      {
        id: 'immaculate-heart',
        title: 'Prayer to Immaculate Heart',
        description: 'Devotion to Mary\'s pure heart',
        prayers: ['O Immaculate Heart of Mary, full of love for God and mankind, accept my consecration. Be my mother and guide. Teach me to love Jesus as you love Him. Make my heart pure like yours. Amen.'],
        catechism: 'Devotion to Mary\'s Immaculate Heart and her maternal care.',
        scripture: 'Luke 2:19, Luke 2:51'
      },
      {
        id: 'holy-hour',
        title: 'Holy Hour Prayer',
        description: 'Hour of adoration before the Blessed Sacrament',
        prayers: [
          'Opening: My Lord Jesus Christ, I believe that you are truly present in the Blessed Sacrament.',
          'Act of Adoration: I adore you, O my God, with all my heart.',
          'Act of Love: O Jesus, I love you with my whole heart.',
          'Act of Thanksgiving: Thank you, Lord, for this time of prayer.',
          'Act of Contrition: I am sorry for my sins.',
          'Act of Offering: I offer you my life, my work, my prayers.',
          'Closing: Stay with me, Lord, for it is evening and the day is far spent.'
        ],
        catechism: 'A Holy Hour is an hour of prayer and meditation on Christ\'s presence.',
        scripture: 'Matthew 26:36-46'
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
        story: 'Mary was a young Jewish girl from Nazareth when the angel Gabriel appeared to her and announced that she would conceive God\'s Son by the Holy Spirit. She gave her humble "fiat" - let it be done to me. Despite the risk of being stoned, she trusted God. She gave birth to Jesus in a stable, raised Him, followed Him to the cross, and was present at Pentecost. She was assumed body and soul into heaven and crowned Queen of Heaven.',
        novena: `Memorare Novena:

For nine days, pray:

"Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to your protection, implored your help or sought your intercession was left unaided. Inspired by this confidence, I fly to you, O Virgin of virgins, my Mother. To you I come, before you I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in your mercy hear and answer me. Amen."`,
        prayers: [
          `Hail Holy Queen:

Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To you do we cry, poor banished children of Eve. To you do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.

Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.`,
          `The Rosary:

The Rosary is a powerful prayer devotion consisting of meditations on the life of Christ. Pray one Our Father, ten Hail Marys, and one Glory Be for each mystery.

Joyful Mysteries (Monday & Saturday): The Annunciation, Visitation, Nativity, Presentation, Finding in the Temple
Sorrowful Mysteries (Tuesday & Friday): Agony in the Garden, Scourging, Crowning with Thorns, Carrying the Cross, Crucifixion
Glorious Mysteries (Wednesday & Sunday): Resurrection, Ascension, Descent of Holy Spirit, Assumption, Coronation of Mary
Luminous Mysteries (Thursday): Baptism, Wedding at Cana, Proclamation of Kingdom, Transfiguration, Institution of Eucharist`,
          `The Angelus:

V. The Angel of the Lord declared unto Mary,
R. And she conceived by the Holy Spirit.

Hail Mary...

V. Behold the handmaid of the Lord,
R. Be it done to me according to your word.

Hail Mary...

V. And the Word was made flesh,
R. And dwelt among us.

Hail Mary...

V. Pray for us, O holy Mother of God,
R. That we may be made worthy of the promises of Christ.

Let us pray: Pour forth, we beseech you, O Lord, your grace into our hearts, that we to whom the Incarnation of Christ your Son was made known by the message of an angel, may by his Passion and Cross be brought to the glory of his Resurrection. Through the same Christ our Lord. Amen.`,
          `Sub Tuum:

We fly to thy patronage, O Holy Mother of God; despise not our petitions in our necessities, but deliver us always from all dangers, O glorious and blessed Virgin. Amen.`,
          `Magnificat:

My soul proclaims the greatness of the Lord, and my spirit rejoices in God my Savior, for he has looked with favor on his lowly servant. From this day all generations will call me blessed: the Almighty has done great things for me, and holy is his Name. He has mercy on those who fear him in every generation. He has shown the strength of his arm, he has scattered the proud in their conceit. He has cast down the mighty from their thrones, and has lifted up the lowly. He has filled the hungry with good things, and the rich he has sent away empty. He has come to the help of his servant Israel, for he has remembered his promise of mercy, The promise he made to our fathers, to Abraham and his children forever.`
        ],
        catechism: 'Mary is the Mother of God (Theotokos), Mother of the Church, and our spiritual mother. She is the greatest of all saints, having been preserved from all sin from the first moment of her existence (Immaculate Conception), assumed body and soul into heaven, and crowned as Queen of Heaven and Earth.',
        scripture: `Luke 1:26-38 (The Annunciation)

In the sixth month, the angel Gabriel was sent from God to a town of Galilee called Nazareth, to a virgin betrothed to a man named Joseph, of the house of David, and the virgin's name was Mary. And coming to her, he said, "Hail, full of grace! The Lord is with you." But she was greatly troubled at the saying, and considered in her mind what sort of greeting this might be. And the angel said to her, "Do not be afraid, Mary, for you have found favor with God. And behold, you will conceive in your womb and bear a son, and you shall call his name Jesus. He will be great, and will be called the Son of the Most High; and the Lord God will give to him the throne of his father David, and he will reign over the house of Jacob forever; and of his kingdom there will be no end."

And Mary said to the angel, "How can this be, since I have no husband?" And the angel said to her, "The Holy Spirit will come upon you, and the power of the Most High will overshadow you; therefore the child to be born will be called holy, the Son of God."

And Mary said, "Behold, I am the handmaid of the Lord; let it be to me according to your word." And the angel departed from her.

Luke 1:46-55 (The Magnificat)

And Mary said, "My soul magnifies the Lord, and my spirit rejoices in God my Savior, for he has regarded the low estate of his handmaiden. For behold, henceforth all generations will call me blessed; for he who is mighty has done great things for me, and holy is his name."`
      },
      {
        id: 'joseph',
        title: 'St. Joseph',
        description: 'Guardian of the Holy Family',
        story: 'A carpenter from Nazareth engaged to Mary when she was found with child. Being a righteous man, he planned to divorce her quietly until an angel appeared in a dream explaining the Holy Spirit\'s work. Joseph obeyed, married Mary, and became the foster father of Jesus. He protected the family by fleeing to Egypt to escape Herod\'s massacre. He taught Jesus his trade and was a faithful provider. Joseph is the patron of workers, fathers, and the universal Church.',
        novena: 'St. Joseph Novena (March 10-18): For nine days, pray for his intercession as: "O glorious St. Joseph, foster father of Jesus, who by your submission to the divine will and your devotion to the Holy Family, became worthy to be called the savior of the Holy Family. Pray for us, that we may be faithful like you in serving God\'s plan for our lives. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Joseph: O blessed Joseph, faithful guardian of Jesus, chosen by God to be the husband of Mary and foster father of Jesus. You watched over Him and provided for Him. We ask your intercession to protect our families and provide for our needs. Help us to be faithful to God\'s will as you were.',
          'Litany of St. Joseph: St. Joseph, renowned offspring of David, light of patriarchs, spouse of the Mother of God, chaste guardian of the Virgin, foster father of Jesus, diligent protector of Christ, head of the Holy Family, Joseph most just, Joseph most chaste, Joseph most prudent, Joseph most strong, Joseph most obedient, Joseph most faithful, mirror of patience, lover of poverty, model of workers, ornament of domestic life, solace of the afflicted, hope of the sick, patron of the dying, terror of demons, protector of Holy Church, pray for us.',
          'Prayer for Workers: St. Joseph, you worked hard with your hands to provide for the Holy Family. Help me to do my work well and for God\'s glory. Help all workers to receive fair wages and respect.',
          'Prayer for Fathers: St. Joseph, you protected the Holy Family. Bless and guide all fathers to be strong, loving, and holy.'
        ],
        catechism: 'Joseph is the model father, protector of the Church, and patron of workers, fathers, and the dying.',
        scripture: 'Matthew 1:18-25, Matthew 2:13-15'
      },
      {
        id: 'peter',
        title: 'St. Peter',
        description: 'First Pope and Prince of Apostles',
        story: 'Simon Peter was a fisherman from Galilee when Jesus called him to be "a fisher of men." impulsive and bold, Peter was often the first to speak and act. He walked on water toward Jesus until fear made him sink. He professed Jesus as "the Christ, the Son of the living God" and was given the keys to the Kingdom. After denying Jesus three times during His passion, Peter wept bitterly and was reconcigned by Christ after the resurrection. He became the leader of the early Church, preached at Pentecost, performed miracles, and was martyred in Rome by crucifixion upside-down, feeling unworthy to die as his Lord did.',
        novena: 'St. Peter Novena: For nine days, pray: "O glorious St. Peter, Prince of the Apostles, who was chosen by Christ to lead His Church, strengthen our faith and make us bold witnesses of the Gospel. Help us to remain steadfast in times of trial and to trust in Christ\'s mercy. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Peter: O glorious St. Peter, you were the first to confess Jesus as Christ and Lord. You were given the keys to the Kingdom and became the rock on which Christ built His Church. Help us to have a steadfast faith and to be bold witnesses of the Gospel. Intercede for the Holy Father Pope Francis and for the entire Church.',
          'Prayer for the Pope: Lord, we pray for Your Holy Father Pope Francis. Protect him, strengthen him, and guide him as he leads Your Church. Keep him safe from all harm and fill him with Your wisdom and grace.',
          'Prayer for Courage: St. Peter, who feared persecution but found courage through the Holy Spirit, help us to overcome our fears and boldly proclaim our faith.',
          'Prayer for Reconciliation: St. Peter, who denied Christ but was forgiven and restored, help us to trust in God\'s mercy when we fail and to always return to Him.'
        ],
        catechism: 'Peter was chosen by Christ to lead His Church as the first Pope.',
        scripture: 'Matthew 16:18-19, Acts 2:14-41'
      },
      {
        id: 'paul',
        title: 'St. Paul',
        description: 'Apostle to the Gentiles',
        story: 'Saul of Tarsus was a zealous Pharisee who persecuted Christians. While traveling to Damascus to arrest believers, he was struck down by a brilliant light and heard Jesus ask, "Saul, Saul, why do you persecute me?" Blinded for three days, he was healed by Ananias and baptized. Paul became the greatest missionary in Church history, traveling throughout the Roman world preaching the Gospel. He wrote 13 letters of the New Testament, establishing churches and theology. He was beheaded in Rome during Nero\'s persecution, having fought the good fight and finished the race.',
        novena: 'St. Paul Novena: For nine days, pray: "O great St. Paul, Apostle to the Gentiles, who was transformed from persecutor to preacher, fill us with zeal for the Gospel. Help us to spread Christ\'s message with courage and conviction. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Paul: O glorious St. Paul, once a persecutor of Christians, you were transformed by Christ\'s grace into His greatest apostle. You traveled the world, suffered imprisonment, and gave your life for the Gospel. Help us to be bold witnesses of Christ and to never be ashamed of the Gospel.',
          'Prayer for Evangelization: Lord, like St. Paul, give us zeal to spread Your Gospel to all nations. Open our mouths to proclaim Your truth and open hearts to receive it.',
          'Prayer for Conversion: St. Paul, who encountered Christ and was completely transformed, pray for all who have not yet met Jesus. Touch their hearts as yours was touched on the road to Damascus.',
          'Prayer for Missionaries: St. Paul, great missionary, protect and guide all who carry the Gospel to distant lands. Give them courage, wisdom, and fruit in their labors.'
        ],
        catechism: 'Paul\'s letters form much of New Testament teaching on Christian life.',
        scripture: 'Acts 9:1-22, Romans 1:16'
      },
      {
        id: 'francis',
        title: 'St. Francis of Assisi',
        description: 'Founder of Franciscans, patron of animals',
        story: 'Born into wealth, Francis lived a wild youth until he heard God call him to "rebuild my Church." He renounced his inheritance, gave away his clothes, and began preaching radical poverty. He founded the Franciscan order and preached to birds and animals. He received the stigmata - the wounds of Christ - on Mount La Verna. His Canticle of the Sun celebrates God through creation.',
        novena: 'St. Francis Novena: For nine days, pray for his intercession to grow in humility and love for all creation. Pray: "St. Francis, who kissed the leper and preached to the birds, help me to see God in all creation and to serve the poorest of the poor. Through Christ our Lord. Amen."',
        prayers: [
          'Peace Prayer: Lord, make me an instrument of Your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy. O Divine Master, grant that I may not so much seek to be consoled as to console; to be understood as to understand; to be loved as to love. For it is in giving that we receive; it is in pardoning that we are pardoned; it is in dying that we are born to eternal life. Amen.',
          'Canticle of the Sun: Most High, all-powerful, good Lord. To You be praise, glory, and honor. All creatures You have made, especially Brother Sun who brings the day. You give us light through Sister Moon and the stars. You give us water through Brother Wind and air, and food through Sister Earth. Thank you for these gifts, praise and bless You.',
          'Prayer for Animals: St. Francis, you saw all creatures as brothers and sisters. Pray for our pets and all animals that they may be treated with kindness.',
          'Prayer for the Poor: St. Francis, you embraced Lady Poverty. Help us to trust in God\'s provision and to share generously with those in need.'
        ],
        catechism: 'Francis embraced poverty and preached the Gospel through joy and simplicity.',
        scripture: 'Matthew 10:9-10, Luke 14:33'
      },
      {
        id: 'therese',
        title: 'St. Thérèse of Lisieux',
        description: 'Doctor of the Church, Little Way',
        story: 'Marie Françoise Thérèse Martin was born in France in 1873, the youngest of nine children. Her mother died when she was four, and she was raised by her older sisters. At age 15, she entered the Carmelite monastery in Lisieux, where she lived a hidden life of prayer and sacrifice. She developed her "Little Way" - doing small things with great love for God. She suffered from tuberculosis and died at age 24, promising to spend her heaven doing good on earth. Her autobiography "Story of a Soul" has inspired millions. She was declared a Doctor of the Church in 1997.',
        novena: 'St. Thérèse Novena: For nine days, pray: "O Little Flower of Jesus, who promised to spend your heaven doing good on earth, send down a shower of roses upon me. Grant me the favor I ask through your intercession. Help me to do small things with great love. Amen."',
        prayers: [
          'Prayer to St. Thérèse: O Little Flower of Lisieux, you found holiness in doing ordinary things with extraordinary love. Teach me your Little Way - to accept my smallness, to trust in God\'s mercy, and to offer every action as a prayer. You promised to spend your heaven doing good on earth; please grant the grace I seek.',
          'Act of Oblation: Living in the heart of the Church, my Mother, I shall be love. Thus I shall be everything, and my dream will be realized. O my God, I want to love You and to make You loved.',
          'Prayer for Trust: St. Thérèse, who trusted in God like a child, help me to abandon myself to His loving care without fear or anxiety.',
          'Prayer for Suffering: St. Thérèse, who offered your suffering for souls, help me to unite my crosses with Christ\'s for the salvation of others.'
        ],
        catechism: 'Thérèse taught the "Little Way" of spiritual childhood and doing small things with love.',
        scripture: 'Matthew 18:3-4, Mark 10:15'
      },
      {
        id: 'thomas-aquinas',
        title: 'St. Thomas Aquinas',
        description: 'Angelic Doctor, theologian',
        story: 'Thomas was born in Italy in 1225 to a noble family. Against his family\'s wishes, he joined the Dominican order. His brothers imprisoned him for a year trying to change his mind, but Thomas remained firm. He studied under Albert the Great and became one of the greatest theologians in history. He wrote the Summa Theologica, a comprehensive work of Catholic theology. Tradition says he heard Christ speak from a crucifix saying "You have written well of me, Thomas. What is your reward?" Thomas replied "Only yourself, Lord." He died in 1274 while commenting on the Song of Songs.',
        novena: 'St. Thomas Aquinas Novena: For nine days, pray: "O glorious St. Thomas, Angelic Doctor of the Church, patron of students and schools, enlighten my mind with divine wisdom. Help me to seek truth with humility and to use my knowledge for God\'s glory. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer for Students: O St. Thomas Aquinas, patron of students and schools, grant me the grace to understand what I study and to retain what I learn. Help me to use my education to serve God and my neighbor. Intercede for all students, especially those struggling with their studies.',
          'Prayer for Wisdom: O God, who made St. Thomas Aquinas admirable for his zeal for your Church and for his learning, grant us, we pray, to understand what he taught and to imitate what he did. Through Christ our Lord.',
          'Prayer for Truth: St. Thomas, who sought truth above all things, help us to find Truth in Jesus Christ and to remain faithful to His Church.',
          'Prayer for Teachers: St. Thomas, great teacher of the faith, bless all educators. Give them wisdom, patience, and love for their students.'
        ],
        catechism: 'Thomas Aquinas authored the Summa Theologica, a comprehensive work of Catholic theology.',
        scripture: '1 Corinthians 1:17-25'
      },
      {
        id: 'augustine',
        title: 'St. Augustine',
        description: 'Doctor of Grace, bishop of Hippo',
        story: 'Augustine was born in North Africa in 354 AD. His mother Monica prayed constantly for his conversion, but he pursued a life of pleasure and heretical teaching. He famously prayed "Lord, give me chastity, but not yet." After hearing a child\'s voice saying "Take up and read," he opened Scripture to Romans 13:13-14 and was converted. Baptized by St. Ambrose, he returned to Africa, founded a religious community, and became bishop of Hippo. His writings including Confessions and City of God shaped Western Christianity. He died as his city was under siege by Vandals in 430 AD.',
        novena: 'St. Augustine Novena: For nine days, pray: "O great St. Augustine, who were converted through the prayers of your mother Monica and the grace of God, help me to turn away from sin and seek God with all my heart. Intercede for all who are far from God. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Augustine: O great St. Augustine, you who were transformed from a sinner to a saint, pray for me. You who wrote "You have made us for yourself, O Lord, and our heart is restless until it rests in you," help me to find true rest in God alone. Intercede for all who are struggling with sin and seeking conversion.',
          'Prayer for Conversion: Late have I loved you, O Beauty ever ancient, ever new. Late have I loved you! You were within me, and I outside. You called, and I ran away. Help me to run to You now.',
          'Prayer for Those Far from God: St. Augustine, whose mother\'s tears won your conversion, intercede for all prodigals. Pray that they may hear God\'s voice and return to Him.',
          'Prayer for Wisdom: O God, who instructed the heart of your servant Augustine by the light of your grace, grant that we may in the same manner be filled with your wisdom.'
        ],
        catechism: 'Augustine\'s Confessions and City of God are foundational works of Western Christianity.',
        scripture: 'Psalm 90, Romans 8'
      },
      {
        id: 'anthony',
        title: 'St. Anthony of Padua',
        description: 'Patron of lost things',
        story: 'Fernando Martins de Bulhões was born in Portugal in 1195. He joined the Augustinians but was inspired by the first Franciscan martyrs to become a Franciscan, taking the name Anthony. He hoped to be a missionary but was shipwrecked in Italy. There he preached with such eloquence that crowds gathered to hear him. He was the first Franciscan to teach theology and was known as the "Hammer of Heretics." He died at age 36 and was canonized within a year. He is famous as the patron of lost things because of a story about a man who recovered a lost book through Anthony\'s intercession.',
        novena: 'St. Anthony Novena: For nine days, pray: "O glorious St. Anthony, helper of all who seek, when we lose what is precious to us, help us find it. Restore to us what is lost and lead us back to God when we stray. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to Find Lost Items: O St. Anthony, whose power is so great in finding lost things, please help me now to find [item]. I believe in your power before the throne of God. Amen.',
          'Prayer for Lost Souls: St. Anthony, who preaches to those who have lost their way, intercede for all who have wandered from the faith. Bring them home to the Church.',
          'Prayer for the Poor: St. Anthony, protector of the poor, help us to see Christ in those in need and to share generously with them.',
          'Prayer for Preachers: St. Anthony, eloquent preacher, bless all who proclaim God\'s word. Give them the fire of your zeal and the clarity of your teaching.'
        ],
        catechism: 'Anthony was a powerful preacher and miracle worker, patron of the poor and lost items.',
        scripture: 'Matthew 25:35-40'
      },
      {
        id: 'jude',
        title: 'St. Jude Thaddeus',
        description: 'Patron of hopeless causes',
        story: 'Jude was one of the Twelve Apostles, also called Thaddaeus. He is traditionally believed to have traveled as a missionary to Persia where he was martyred. In his New Testament letter, he urges believers to "contend for the faith." Because his name sounds like "Judas" (the betrayer), devotion to him was neglected for centuries. When people finally turned to him in prayer, they discovered his powerful intercession, especially in desperate situations. He is now known as the patron of hopeless causes and situations that seem impossible.',
        novena: 'St. Jude Novena: For nine days, pray: "O glorious St. Jude, apostle and martyr, great in virtue and rich in miracles, near kinsman of Jesus Christ, faithful intercessor of all who invoke your special patronage in time of need. To you I have recourse from the depths of my heart and humbly beg you to whom God has given such great power to come to my assistance. Help me in my urgent need. Amen."',
        prayers: [
          'Prayer to St. Jude: Most holy Apostle, St. Jude, faithful servant and friend of Jesus, the Church honors and invokes you universally as the patron of difficult cases, of things almost despaired of. Pray for me, I am so helpless and alone. Make use, I implore you, of that particular privilege accorded you to bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need that I may receive the consolation and help of heaven in all my necessities, tribulations, and sufferings.',
          'Prayer for Hopeless Causes: St. Jude, patron of hopeless causes, pray for me when all seems lost. When I cannot see a way forward, intercede for me before the throne of God.',
          'Prayer for the Desperate: St. Jude, friend of Jesus in his suffering, comfort all who are in despair. Bring them hope and the assurance that God is with them.',
          'Prayer for Impossible Situations: O St. Jude, who never fails those who trust in you, intercede for me in this impossible situation. Nothing is impossible with God.'
        ],
        catechism: 'St. Jude is the patron saint of hopeless causes and difficult situations.',
        scripture: 'Luke 6:12-16'
      },
      {
        id: 'rita',
        title: 'St. Rita of Cascia',
        description: 'Patroness of impossible causes',
        story: 'Rita was born in Italy in 1381. Despite wanting to be a nun, her parents arranged her marriage to a violent man. Through her patience and prayers, her husband was converted, but he was later murdered in a feud. Rita\'s two sons vowed revenge, but she prayed they would die rather than commit mortal sin. Both died of natural causes shortly after. Rita then entered the convent where she received a partial stigmata - a wound on her forehead from a crown of thorns. She is known as the patroness of impossible causes due to her patient endurance and miraculous answers to prayer.',
        novena: 'St. Rita Novena: For nine days, pray: "O glorious St. Rita, patroness of impossible causes, mirror of God\'s grace, you bore on your forehead the mark of Christ\'s passion. Help me in my desperate need. Intercede for me before the throne of God. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Rita: O holy St. Rita, who endured so much suffering with patience and faith, intercede for me in my impossible situation. You who bore the stigmata of Christ\'s crown of thorns, help me to carry my cross with faith. Obtain for me the grace I need from God.',
          'Prayer for Abused Wives: St. Rita, who suffered abuse from your husband but won his conversion through patience and prayer, protect all victims of domestic violence. Give them courage and hope.',
          'Prayer for Forgiveness: St. Rita, who forgave your husband\'s murderers and prayed for your sons\' repentance, help me to forgive those who have hurt me.',
          'Prayer for Mothers: St. Rita, who lost your husband and both sons, comfort all grieving mothers. Help them to trust in God\'s mercy.'
        ],
        catechism: 'St. Rita is known as the patroness of impossible causes and abused wives.',
        scripture: 'Romans 8:28'
      },
      {
        id: 'monica',
        title: 'St. Monica',
        description: 'Mother of St. Augustine',
        story: 'Monica was born in North Africa in 331 AD and married a pagan official named Patricius, who had a violent temper. Through her patience and prayers, he was baptized before his death. Her greatest cross was her son Augustine, who lived a sinful life and rejected Christianity. Monica wept and prayed for him for 17 years, following him to Rome and Milan. In Milan, she met St. Ambrose whose preaching helped convert Augustine. Monica died shortly after his baptism, rejoicing that God had answered her prayers. She is the patron saint of mothers, wives, and patience.',
        novena: 'St. Monica Novena: For nine days, pray: "O holy St. Monica, mother of St. Augustine, who by your tears and prayers won your son\'s conversion, intercede for all mothers and their children. Help us to trust God\'s timing and never to give up praying for our loved ones. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Monica: O glorious St. Monica, who by your patience and prayers won the conversion of your husband and son, intercede for me. Help me to be patient in suffering and persistent in prayer. Obtain for me the grace to never lose hope for those I love.',
          'Prayer for Mothers: St. Monica, whose tears won your son\'s soul, watch over all mothers. Comfort those who worry about their children and strengthen them to keep praying.',
          'Prayer for Wayward Children: St. Monica, who never stopped praying for Augustine, intercede for all children who have strayed from God. Bring them home to the faith.',
          'Prayer for Patience: St. Monica, who endured so much with patience, help me to accept difficulties as opportunities for grace.'
        ],
        catechism: 'Monica\'s persistent prayers led to her son Augustine\'s conversion.',
        scripture: 'Luke 18:1-8, 1 Thessalonians 5:17'
      },
      {
        id: 'patrick',
        title: 'St. Patrick',
        description: 'Apostle of Ireland',
        story: 'Patrick was born in Britain around 385 AD. At age 16, he was captured by Irish pirates and sold into slavery, working as a shepherd for six years. During this time, he converted to Christ and learned to pray constantly. After escaping and returning home, he had a vision calling him back to Ireland as a missionary. Ordained a bishop, he returned to Ireland in 432 AD. Through his preaching, countless Irish were converted, including kings and princes. He used the shamrock to explain the Trinity and is said to have driven all snakes from Ireland. He died on March 17, 461 AD.',
        novena: 'St. Patrick Novena: For nine days, pray: "O glorious St. Patrick, apostle of Ireland, who preached the Gospel to pagans and converted a nation, help me to be a faithful witness of Christ. Intercede for all missionaries and for the conversion of sinners. Through Christ our Lord. Amen."',
        prayers: [
          'St. Patrick\'s Breastplate: Christ be with me, Christ before me, Christ behind me, Christ in me, Christ beneath me, Christ above me, Christ on my right, Christ on my left, Christ when I lie down, Christ when I sit down, Christ when I arise, Christ in the heart of every man who thinks of me, Christ in the mouth of everyone who speaks of me, Christ in every eye that sees me, Christ in every ear that hears me.',
          'Prayer to St. Patrick: O glorious St. Patrick, who left your home and comfort to bring the faith to Ireland, help us to be generous missionaries of the Gospel. Intercede for the Irish people and for all who preach Christ.',
          'Prayer for Protection: St. Patrick, who protected Ireland from paganism, protect us from all evil. Surround us with God\'s presence.',
          'Prayer for Converts: St. Patrick, who converted a nation, pray for all who are entering the Church. Welcome them as Christ welcomed you.'
        ],
        catechism: 'Patrick converted Ireland through preaching, miracles, and faithful witness.',
        scripture: 'Matthew 28:19-20'
      },
      {
        id: 'catherine',
        title: 'St. Catherine of Siena',
        description: 'Doctor of the Church, mystic',
        story: 'Catherine Benincasa was born in Siena in 1347, the 24th of 25 children. From childhood she had mystical experiences and vowed her life to Christ at age 7. She became a Dominican tertiary and lived a life of prayer and service. She received the stigmata and had mystical dialogues with God. She played a key role in persuading the Pope to return from Avignon to Rome. She wrote "The Dialogue," a mystical conversation between the soul and God. She died at age 33 and was declared a Doctor of the Church in 1970. She is patron of Italy, Europe, and nurses.',
        novena: 'St. Catherine Novena: For nine days, pray: "O glorious St. Catherine, Doctor of the Church and mystic, who conversed intimately with Christ, help me to grow in prayer and love for God. Intercede for the Church and for all who seek God\'s will. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Catherine: O glorious St. Catherine, who mystical union with Christ produced such spiritual fruit, help me to seek God above all things. You who advised popes and served the poor, teach me to combine contemplation with action.',
          'Prayer for the Church: St. Catherine, who helped restore the papacy to Rome, intercede for the Holy Father and the entire Church. Unite all Christians in one faith.',
          'Prayer for Courage: St. Catherine, who fearlessly spoke truth to power, give me courage to stand up for what is right even when it is difficult.',
          'Prayer for the Sick: St. Catherine, who cared for the sick during the plague, intercede for all who suffer illness. Comfort them and their caregivers.'
        ],
        catechism: 'Catherine was a mystic, theologian, and advisor to popes.',
        scripture: '1 Corinthians 12:31'
      },
      {
        id: 'benedict',
        title: 'St. Benedict',
        description: 'Father of Western monasticism',
        story: 'Benedict was born in Italy around 480 AD. Sent to study in Rome, he was disgusted by the immorality he saw and fled to the mountains to live as a hermit. His holiness attracted followers, and he eventually founded 12 monasteries. He wrote the Rule of St. Benedict, which emphasizes prayer, work, community life, and moderation. His motto "Ora et Labora" (Pray and Work) captures the Benedictine spirit. He is known for many miracles, including breaking a poisoned wineglass with the sign of the cross. He is patron of Europe and students.',
        novena: 'St. Benedict Novena: For nine days, pray: "O glorious St. Benedict, father of Western monasticism, help me to balance prayer and work in my life. Protect me from all evil and guide me in the path of holiness. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Benedict: O glorious St. Benedict, who sought God in solitude and served Him in community, teach me to pray and work faithfully. Protect me from all evil and help me to grow in holiness.',
          'The Medal Prayer: The Cross be my light; let not the dragon be my guide. Begone Satan! Suggest not vain things to me. Evil is the cup you offer; drink your own poison.',
          'Prayer for Balance: St. Benedict, who taught prayer and work, help me to find balance in my life. May I worship God in both my prayers and my daily work.',
          'Prayer for Protection: St. Benedict, who wore the cross as a shield, protect all who call upon you from every danger, especially from the snares of the devil.'
        ],
        catechism: 'Benedict founded Western monasticism and wrote the Rule that guides many religious.',
        scripture: 'Luke 10:41-42'
      },
      {
        id: 'ignatius',
        title: 'St. Ignatius of Loyola',
        description: 'Founder of Jesuits, Spiritual Exercises',
        story: 'Iñigo López de Loyola was born in Spain in 1491. A soldier and courtier, he was struck by a cannonball in battle. During his long recovery, he read the Life of Christ and the Lives of the Saints, which inspired him to serve God. He founded the Society of Jesus (Jesuits) in 1534. His Spiritual Exercises became a powerful tool for discernment and spiritual growth. He sent missionaries worldwide, including St. Francis Xavier. Ignatius was a master of discerning God\'s will and teaching others to find God in all things. He died in 1556, and the Jesuits now number thousands worldwide.',
        novena: 'St. Ignatius Novena: For nine days, pray: "O glorious St. Ignatius, founder of the Jesuits and teacher of discernment, help me to find God\'s will in my life. Teach me to see God in all things and to choose what leads most to His greater glory. Through Christ our Lord. Amen."',
        prayers: [
          'Suscipe: Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will, all that I have and possess. You have given all to me; to You, O Lord, I return it. All is Yours; dispose of it wholly according to Your will. Give me only Your love and Your grace; that is enough for me.',
          'Prayer for Discernment: Teach me, good Lord, to be generous, to serve You as You deserve, to give and not to count the cost, to fight and not to heed the wounds, to toil and not to seek for rest, to labor and not to ask for any reward, save that of knowing that I do Your will.',
          'Prayer for Finding God: St. Ignatius, who found God in all things, help me to recognize His presence in my daily life - in work, in prayer, in relationships, in every moment.',
          'Prayer for Spiritual Growth: St. Ignatius, master of the spiritual life, guide me in my journey toward God. Help me to overcome attachments and seek only what leads to greater love.'
        ],
        catechism: 'Ignatius founded the Society of Jesus and developed the Spiritual Exercises for discernment.',
        scripture: 'Philippians 3:8-14'
      },
      {
        id: 'francis-xavier',
        title: 'St. Francis Xavier',
        description: 'Apostle of the Indies, missionary',
        story: 'Francis Xavier was born in Spain in 1506 and met St. Ignatius of Loyola at the University of Paris. Together they founded the Jesuits. Francis was sent as a missionary to Asia, arriving in Goa, India in 1542. For the next ten years, he preached throughout India, Malaysia, and Japan. He baptized tens of thousands, cared for the sick, and instructed children. He died on an island off China at age 46, waiting to enter that closed land. He is considered the greatest missionary since St. Paul and is patron of foreign missions.',
        novena: 'St. Francis Xavier Novena: For nine days, pray: "O glorious St. Francis Xavier, apostle of the Indies and patron of missionaries, help us to share our faith with zeal and love. Intercede for all missionaries and for the conversion of unbelievers. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Francis Xavier: O glorious St. Francis Xavier, who left everything to preach Christ to distant lands, inflame my heart with missionary zeal. Help me to be a witness of the Gospel wherever I am. Intercede for all missionaries and for those who have not yet heard the good news.',
          'Prayer for Missionaries: O God, who through the preaching of St. Francis Xavier won many peoples to Yourself, grant that the hearts of the faithful may burn with the same zeal for spreading the Gospel.',
          'Prayer for Evangelization: St. Francis Xavier, who baptized thousands and preached to kings, give me courage to share my faith with others.',
          'Prayer for the Unreached: St. Francis Xavier, who died trying to enter China, intercede for all peoples who have not yet heard of Christ. Send laborers into His harvest.'
        ],
        catechism: 'Francis Xavier was a Jesuit missionary who spread the Gospel in Asia.',
        scripture: 'Romans 10:14-15, Matthew 28:19'
      },
      {
        id: 'therese-lisieux',
        title: 'St. Thérèse of the Child Jesus',
        description: 'Little Flower, Doctor of the Church',
        story: 'Same as St. Thérèse of Lisieux above - this is an alternate entry for the same saint.',
        novena: 'See St. Thérèse of Lisieux novena above.',
        prayers: [
          'See St. Thérèse of Lisieux prayers above.'
        ],
        catechism: 'Thérèse is the patron saint of missionaries, florists, and pilots.',
        scripture: 'Matthew 18:3-4'
      },
      {
        id: 'dominic',
        title: 'St. Dominic',
        description: 'Founder of Dominicans, preacher',
        story: 'Dominic de Guzmán was born in Spain around 1170. A canon of the cathedral, he accompanied his bishop to southern France where they encountered the Albigensian heresy. Dominic saw the need for well-educated preachers who could teach the true faith and defend it against errors. In 1216, he founded the Order of Preachers (Dominicans). He received the Rosary from the Blessed Virgin Mary as a weapon against heresy. Dominic traveled throughout Europe preaching, converting many, and establishing friaries. He died in 1221 and was canonized in 1234.',
        novena: 'St. Dominic Novena: For nine days, pray: "O glorious St. Dominic, founder of the Order of Preachers and promoter of the Holy Rosary, help me to love and preach the truth of the Catholic faith. Intercede for all preachers and teachers. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Dominic: O glorious St. Dominic, who founded the Order of Preachers and promoted the Rosary throughout the world, intercede for me. Help me to love the truth and to share it with others. Bless all preachers and teachers of the faith.',
          'Prayer for Preachers: O God, who raised up St. Dominic to preach the true faith and to refute error, grant that we may have in him an effective intercessor.',
          'Prayer for the Rosary: St. Dominic, who received the Rosary from Mary, help me to pray it faithfully and to bring others to this powerful devotion.',
          'Prayer for Truth: St. Dominic, light of the Church, guide all who teach and defend the faith. Give them clarity of thought and strength of conviction.'
        ],
        catechism: 'Dominic founded the Order of Preachers and promoted the Rosary.',
        scripture: 'Romans 10:14-15'
      },
      {
        id: 'anne',
        title: 'St. Anne',
        description: 'Mother of the Blessed Virgin Mary',
        story: 'Anne was the wife of St. Joachim and mother of the Blessed Virgin Mary. Though not mentioned in the Bible, ancient tradition tells us she and Joachim were devout but childless for many years. An angel appeared to each separately, promising them a daughter who would be dedicated to God. Anne brought Mary to the Temple at age three, where she lived until betrothed to Joseph. Anne is honored as the grandmother of Jesus. Many churches and hospitals are named after her, and she is especially invoked by couples seeking children and by grandmothers.',
        novena: 'St. Anne Novena: For nine days, pray: "O good St. Anne, mother of she who is our life, our sweetness, and our hope, obtain for me the grace I need. Pray for all mothers and grandmothers, and for all who desire children. Through Jesus Christ your grandson. Amen."',
        prayers: [
          'Prayer to St. Anne: O glorious St. Anne, mother of Mary and grandmother of Jesus, intercede for me. You who brought forth the Mother of God, obtain for me the grace to imitate your faith and devotion. Watch over all mothers and grandmothers.',
          'Prayer for Mothers: St. Anne, loving mother of Mary, bless all mothers. Give them strength, wisdom, and patience as they raise their children.',
          'Prayer for Grandmothers: St. Anne, devoted grandmother, watch over all grandmothers. Help them pass on the faith to their grandchildren.',
          'Prayer for Couples Seeking Children: Good St. Anne, who waited years for a child, intercede for all couples longing for children. May God bless them with the gift of life.'
        ],
        catechism: 'Anne is the grandmother of Jesus and patron of mothers and grandmothers.',
        scripture: 'Luke 3:27'
      },
      {
        id: 'joachim',
        title: 'St. Joachim',
        description: 'Father of the Blessed Virgin Mary',
        story: 'Joachim was the husband of St. Anne and father of the Blessed Virgin Mary. Tradition holds that he was a wealthy and pious man from Nazareth. Because he and Anne were childless for many years, Joachim was rejected from offering sacrifice in the Temple, as childlessness was considered a sign of God\'s displeasure. Devastated, he went into the desert to fast and pray. An angel appeared, announcing that Anne would bear a daughter. Returning to Jerusalem, he met Anne at the city gate, and they rejoiced together.',
        novena: 'St. Joachim Novena: For nine days, pray: "O glorious St. Joachim, father of Mary and grandfather of Jesus, intercede for me. You who trusted God\'s promise in your old age, help me to trust God\'s providence. Bless all fathers and grandfathers. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Joachim: O glorious St. Joachim, father of the Blessed Virgin Mary and grandfather of our Lord Jesus Christ, intercede for me. You who trusted God\'s promise despite long waiting, help me to trust in God\'s timing. Bless and protect all fathers.',
          'Prayer for Fathers: St. Joachim, devoted father and grandfather, bless all fathers. Give them wisdom, patience, and faith as they lead their families.',
          'Prayer for Grandfathers: St. Joachim, loving grandfather, watch over all grandfathers. May they pass on the faith to their grandchildren.',
          'Prayer for Trust: St. Joachim, who trusted God\'s promise after years of disappointment, help me to trust God even when His answers seem delayed.'
        ],
        catechism: 'Joachim is the grandfather of Jesus and patron of fathers and grandfathers.',
        scripture: 'Luke 3:27'
      },
      {
        id: 'john-vianney',
        title: 'St. John Vianney',
        description: 'Cure of Ars, patron of priests',
        story: 'John Marie Vianney was born in France in 1786, the son of a farmer. His studies for the priesthood were interrupted by the French Revolution and he struggled greatly with Latin. Through heroic perseverance, he was ordained in 1815 and sent to the small village of Ars, where he spent the rest of his life. He was a gifted confessor and preacher, spending up to 18 hours a day in the confessional. People from all over Europe came to him for reconciliation. He performed miracles and had profound spiritual insight. He died in 1859 and is patron of parish priests.',
        novena: 'St. John Vianney Novena: For nine days, pray: "O glorious St. John Vianney, patron of priests, intercede for all priests. Help them to be holy, zealous, and compassionate. Bless our parish priests with your spirit. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. John Vianney: O glorious St. John Vianney, Cure of Ars, you who spent hours in the confessional and labored tirelessly for souls, intercede for me. Help me to appreciate the sacrament of reconciliation and to seek God\'s mercy. Bless and protect all priests.',
          'Prayer for Priests: O God, who gave St. John Vianney to Your Church as a model of priestly holiness, grant that all priests may imitate his zeal for souls and his devotion to the Eucharist.',
          'Prayer for Confessors: St. John Vianney, great confessor, help all priests to be compassionate and wise in the confessional. Give them your discernment.',
          'Prayer for Vocations: St. John Vianney, zealous pastor, inspire young men to answer God\'s call to the priesthood. Send holy priests to Your Church.'
        ],
        catechism: 'John Vianney is the patron saint of parish priests.',
        scripture: 'Hebrews 5:1-4'
      },
      {
        id: 'pius-x',
        title: 'St. Pius X',
        description: 'Pope who promoted frequent Communion',
        story: 'Giuseppe Sarto was born in Italy in 1835, the son of a poor cobbler and postman. He rose through the ranks of the priesthood to become Patriarch of Venice and then Pope in 1903, taking the name Pius X. As Pope, he reformed liturgical music, encouraged daily Bible reading, and fought modernist theology. His greatest legacy was lowering the age for First Communion to age 7 and encouraging frequent Communion. He died at the outbreak of World War I in 1914. He was canonized in 1954 and his motto was "To restore all things in Christ."',
        novena: 'St. Pius X Novena: For nine days, pray: "O glorious St. Pius X, who promoted frequent Communion and early First Communion, help us to receive Jesus in the Eucharist with devotion. Intercede for the Holy Father and the entire Church. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Pius X: O glorious St. Pius X, lover of the Holy Eucharist and champion of frequent Communion, help me to approach the altar with reverence and love. You who taught children to receive Jesus, bless all who receive First Communion.',
          'Prayer for the Pope: St. Pius X, holy Pope, intercede for our Holy Father Pope Francis. Protect him, guide him, and grant him wisdom in leading the Church.',
          'Prayer for Eucharistic Devotion: St. Pius X, who promoted frequent Communion, help us to receive Jesus worthily and frequently. May the Eucharist be the center of our lives.',
          'Prayer for Children: St. Pius X, who lowered the age for First Communion, watch over all children making their First Communion. Prepare their hearts to receive Jesus.'
        ],
        catechism: 'Pius X encouraged frequent Communion and lowered the age for First Communion.',
        scripture: 'John 6:53-58'
      },
      {
        id: 'maximilian',
        title: 'St. Maximilian Kolbe',
        description: 'Martyr of Auschwitz, apostle of Mary',
        story: 'Raymond Kolbe was born in Poland in 1894. At age 12, Mary appeared to him offering two crowns: one white representing purity, one red representing martyrdom. He accepted both. He became a Franciscan priest and founded the Militia of the Immaculata to spread devotion to Mary. During World War II, he was arrested by the Nazis and sent to Auschwitz. When a prisoner escaped, ten men were chosen to starve as punishment. One cried out for his family. Maximilian volunteered to take his place. In the starvation bunker, he led prayers and songs until he died after two weeks. He is patron of prisoners.',
        novena: 'St. Maximilian Kolbe Novena: For nine days, pray: "O glorious St. Maximilian Kolbe, martyr of charity, who gave your life for another, help us to love as Christ loved. Intercede for all prisoners and for the pro-life cause. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Maximilian: O glorious St. Maximilian Kolbe, martyr of Auschwitz, who gave your life so another might live, intercede for me. You who accepted both the crown of purity and the crown of martyrdom, help me to be generous in my love for others.',
          'Prayer for Prisoners: St. Maximilian, prisoner for Christ, watch over all those incarcerated. Comfort them, strengthen them, and bring them hope.',
          'Prayer for Pro-Life: St. Maximilian, who sacrificed your life for another, intercede for the pro-life movement. May all life be respected from conception to natural death.',
          'Prayer for the Persecuted: St. Maximilian, who died in a concentration camp, be with all who are persecuted for their faith. Give them courage and hope.'
        ],
        catechism: 'Maximilian Kolbe is the patron saint of prisoners, pro-life movements, and journalists.',
        scripture: 'John 15:13'
      },
      {
        id: 'faustina',
        title: 'St. Faustina Kowalska',
        description: 'Secretary of Divine Mercy',
        story: 'Helena Kowalska was born in Poland in 1905 to a poor peasant family. Despite having only three years of formal education, she was called by Jesus to become a religious and to spread the message of Divine Mercy. As a nun, she received visions and locutions from Jesus, who asked her to write a diary. Jesus revealed the Chaplet of Divine Mercy, the Image of Divine Mercy, and the feast of Divine Mercy Sunday. She suffered greatly and died of tuberculosis at age 33 in 1938. Her Diary has been translated into many languages and the Divine Mercy devotion has spread worldwide.',
        novena: 'St. Faustina Novena: For nine days, pray: "O St. Faustina, secretary of Divine Mercy, help us to trust in Jesus\' mercy completely. Obtain for us the grace to be merciful to others. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Faustina: O St. Faustina, vessel of Divine Mercy, who trusted completely in Jesus\' mercy, intercede for me. Help me to trust in God\'s mercy even when I feel unworthy. Obtain for all sinners the grace of conversion.',
          'Chaplet of Divine Mercy: (using rosary beads) Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world. (On each Hail Mary bead: For the sake of His sorrowful Passion, have mercy on us and on the whole world.)',
          'Prayer for Mercy: Jesus, I trust in You. St. Faustina, teach us to trust completely in God\'s infinite mercy.',
          'Prayer for the Dying: St. Faustina, who prayed for the dying at the hour of mercy, intercede for all who are in their final moments. May they experience God\'s mercy.'
        ],
        catechism: 'Faustina received the Divine Mercy devotion and wrote the Diary.',
        scripture: 'Psalm 136, Ephesians 2:4-5'
      },
      {
        id: 'raphael',
        title: 'St. Raphael the Archangel',
        description: 'Archangel of healing',
        story: 'Raphael is one of the seven archangels who stand before God\'s throne. His name means "God heals." In the Book of Tobit, Raphael disguises himself as a human and accompanies Tobiah on a journey. He protects Tobiah from danger, helps him catch a fish whose organs drive away demons, and heals Tobiah\'s father\'s blindness. Only at the end does he reveal his true identity as an archangel. Raphael is the patron of healers, travelers, and those seeking matches in marriage. He intercedes for physical, emotional, and spiritual healing.',
        novena: 'St. Raphael Novena: For nine days, pray: "O glorious St. Raphael, archangel and healer, accompany me on my journey. Bring God\'s healing to my body, mind, and soul. Guide me safely to my destination. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Raphael: O glorious St. Raphael, archangel of God who heals, accompany me on my journey as you accompanied Tobiah. Protect me from danger, heal me from sickness, and guide me safely home. Intercede for all who are ill, all travelers, and all who seek God\'s will.',
          'Prayer for Healing: St. Raphael, whose name means "God heals," bring God\'s healing power to all who suffer. Comfort the sick, strengthen the weak, and restore health to body and soul.',
          'Prayer for Travelers: St. Raphael, protector of travelers, watch over all who journey. Keep them safe from harm and guide them to their destination.',
          'Prayer for Matchmakers: St. Raphael, who helped Sarah find a husband, bless all who seek a godly spouse. Guide them to their vocation.'
        ],
        catechism: 'Raphael is the archangel of healing and patron of travelers.',
        scripture: 'Tobit 12:15'
      },
      {
        id: 'gabriel',
        title: 'St. Gabriel the Archangel',
        description: 'Archangel who announced to Mary',
        story: 'Gabriel is one of the seven archangels who stand before God\'s throne. His name means "Strength of God." He is God\'s messenger for the most important announcements. In the Old Testament, he explained Daniel\'s vision. In the New Testament, he announced to Zechariah the birth of John the Baptist and then to Mary the birth of Jesus. His greeting "Hail, full of grace, the Lord is with you" became the beginning of the Hail Mary. Gabriel is the patron of communicators, messengers, and those who work in media.',
        novena: 'St. Gabriel Novena: For nine days, pray: "O glorious St. Gabriel, archangel and messenger of God, help us to hear and respond to God\'s word as Mary did. Intercede for all who communicate the Gospel. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Gabriel: O glorious St. Gabriel, archangel and messenger of God, who announced the birth of Christ to Mary, help me to hear God\'s voice and respond with faith. Intercede for all who work in communication and media.',
          'Prayer for Communicators: St. Gabriel, God\'s messenger, bless all who communicate news and information. May they speak truth and bring messages of hope.',
          'Prayer for Purity: St. Gabriel, who addressed Mary as "full of grace," help us to remain pure and holy in thought, word, and deed.',
          'Prayer for Annunciation: St. Gabriel, who brought the good news of salvation, help us to share the Gospel with others joyfully.'
        ],
        catechism: 'Gabriel is the archangel who announced the births of John the Baptist and Jesus.',
        scripture: 'Luke 1:19-38'
      },
      {
        id: 'michael-archangel',
        title: 'St. Michael the Archangel',
        description: 'Leader of heavenly armies',
        story: 'Michael is the archangel who led the heavenly armies against Satan and the fallen angels. His name means "Who is like God?" - a battle cry against Satan\'s pride. In the Book of Daniel, Michael is the great prince who protects God\'s people. In Revelation, he defeats the dragon. Tradition says Michael appeared at Monte Gargano in Italy and at Monte Sant\'Angelo. He is honored as protector of the Church, defender against evil, and patron of soldiers, police, and doctors. Pope Leo XIII had a vision of Satan\'s attacks on the Church and composed the famous prayer to St. Michael.',
        novena: 'St. Michael Novena: For nine days, pray: "O glorious St. Michael, prince of the heavenly host, defend us in battle against the wickedness and snares of the devil. May God rebuke him, we humbly pray. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Michael: St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray. And do you, O prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls.',
          'Prayer for Protection: St. Michael, warrior of God, protect the Church from all evil. Defend the faithful from temptation and danger.',
          'Prayer for Soldiers: St. Michael, patron of soldiers, watch over all who serve in the military. Protect them from harm and give them courage.',
          'Prayer for the Dying: St. Michael, who escorts souls to heaven, be with all who are dying. Deliver them from the snares of the devil.'
        ],
        catechism: 'Michael is the archangel who led the battle against Satan.',
        scripture: 'Revelation 12:7-9'
      },
      {
        id: 'martin-porres',
        title: 'St. Martin de Porres',
        description: 'Patron of social justice',
        story: 'Martin was born in Lima, Peru in 1579, the illegitimate son of a Spanish nobleman and a freed slave. Because of his mixed race, he was treated as a second-class citizen. He became a Dominican lay brother and served in many roles: barber, surgeon, almoner, and infirmarian. He cared for the sick, fed the poor, and tended to animals. He had a special gift for reconciling enemies and healing divisions. His monastery was known for its harmony, thanks to Martin\'s prayers. He died in 1639 and was canonized in 1962. He is patron of social justice, racial harmony, and barbers.',
        novena: 'St. Martin de Porres Novena: For nine days, pray: "O glorious St. Martin de Porres, who served all without distinction, help us to see Christ in every person. Intercede for racial harmony and social justice. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Martin: O glorious St. Martin de Porres, who served the poor, the sick, and the outcast with great love, intercede for me. Help me to see Christ in every person and to serve without discrimination. You who broke down barriers of race and class, pray for harmony and justice.',
          'Prayer for Racial Harmony: St. Martin de Porres, who crossed racial barriers to serve all, intercede for an end to racism and discrimination. May all people see each other as children of God.',
          'Prayer for the Sick: St. Martin, compassionate caregiver, comfort all who are ill. Protect healthcare workers and bless their work of healing.',
          'Prayer for the Poor: St. Martin, friend of the poor, help us to share generously with those in need. May we see Jesus in the poor and serve Him through them.'
        ],
        catechism: 'Martin de Porres is the patron saint of social justice, barbers, and innkeepers.',
        scripture: 'Matthew 25:35-40'
      },
      {
        id: 'claire',
        title: 'St. Clare of Assisi',
        description: 'Patron of television, founder of Poor Clares',
        story: 'Clare was born in Italy in 1194 to a noble family. Inspired by St. Francis, she ran away from home at age 18 to follow Christ in poverty. She founded the Order of Poor Ladies (Poor Clares), becoming the first woman to write a religious rule. When her convent was attacked by soldiers, Clare displayed the Blessed Sacrament at the window and prayed; the attackers fled. She was so ill that she could not attend Mass but miraculously saw and heard it on the wall of her room - making her patron of television. She died in 1253 and was canonized two years later.',
        novena: 'St. Clare Novena: For nine days, pray: "O glorious St. Clare, follower of St. Francis and patroness of television, help us to use media for God\'s glory. Intercede for all who suffer from eye problems. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Clare: O glorious St. Clare, who left wealth and comfort to follow Christ in poverty, intercede for me. Help me to detach from worldly things and seek God alone. You who protected your convent through the Eucharist, teach me devotion to the Blessed Sacrament.',
          'Prayer for Eyes: St. Clare, patron of those with eye problems, intercede for all who suffer from eye disease and blindness. Restore their sight, physical and spiritual.',
          'Prayer for Those in Media: St. Clare, patron of television, bless all who work in media. May they use their platforms to spread truth and goodness.',
          'Prayer for the Poor: St. Clare, lover of holy poverty, help us to be generous and to trust in God\'s provision.'
        ],
        catechism: 'Clare founded the Poor Clares and is the patron saint of television.',
        scripture: 'Luke 18:28'
      },
      {
        id: 'louis',
        title: 'St. Louis de Montfort',
        description: 'Promoter of Marian devotion',
        story: 'Louis-Marie Grignion de Montfort was born in France in 1673. Ordained a priest in 1700, he traveled throughout France preaching missions and promoting devotion to Mary. He wrote "True Devotion to Mary," teaching that consecration to Mary is the shortest, easiest, and most perfect way to Jesus. He also wrote "The Secret of the Rosary" and "The Love of Eternal Wisdom." He founded two religious communities: the Montfort Fathers and the Daughters of Wisdom. He died at age 43 in 1716. His methods of Marian consecration influenced Pope John Paul II.',
        novena: 'St. Louis de Montfort Novena: For nine days, pray: "O glorious St. Louis de Montfort, apostle of Mary, teach us true devotion to the Blessed Virgin. Help us to consecrate ourselves completely to Jesus through Mary. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Louis: O glorious St. Louis de Montfort, fiery preacher of Mary\'s love, teach me true devotion to the Mother of God. Help me to consecrate myself to Jesus through Mary\'s hands. May I, like you, bring many souls to her Son.',
          'Act of Consecration: I, a faithless sinner, renew and ratify today in your hands, O Immaculate Mother, the vows of my Baptism. I renounce forever Satan, his pomps and works, and I give myself entirely to Jesus Christ, the Incarnate Wisdom, to carry my cross after Him all the days of my life.',
          'Prayer for Marian Devotion: St. Louis, who taught that Mary leads us to Jesus, help all to love and honor the Blessed Mother.',
          'Prayer for Preachers: St. Louis, zealous missionary, bless all who preach the Gospel. Give them your fire and your Marian devotion.'
        ],
        catechism: 'Louis de Montfort wrote True Devotion to Mary.',
        scripture: 'Luke 1:26-55'
      },
      {
        id: 'alphonsus',
        title: 'St. Alphonsus Liguori',
        description: 'Founder of Redemptorists, moral theologian',
        story: 'Alphonsus was born in Italy in 1696. A brilliant lawyer, he lost his only case and left the legal profession to become a priest. He became famous for his missions and his simple, clear preaching. In 1732, he founded the Congregation of the Most Holy Redeemer (Redemptorists) to preach to the poor and abandoned. He wrote many works including "The Glories of Mary" and "Moral Theology," for which he was named a Doctor of the Church. He suffered greatly in his old age but remained patient and trusting. He died in 1787 and is patron of confessors, moral theologians, and arthritis sufferers.',
        novena: 'St. Alphonsus Novena: For nine days, pray: "O glorious St. Alphonsus, patron of confessors, help us to receive God\'s mercy in the sacrament of reconciliation. Intercede for all who struggle with guilt and scruples. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Alphonsus: O glorious St. Alphonsus, bishop and doctor of the Church, patron of confessors, intercede for me. Help me to appreciate God\'s mercy and to frequent the sacrament of reconciliation. You who suffered from arthritis, comfort all who live with chronic pain.',
          'Prayer for Confessors: St. Alphonsus, moral theologian, bless all priests who hear confessions. Give them wisdom, compassion, and understanding.',
          'Prayer for Mercy: St. Alphonsus, who wrote beautifully about God\'s mercy, help all sinners to approach God with confidence and contrition.',
          'Prayer for the Suffering: St. Alphonsus, who endured chronic pain, comfort all who suffer. Help them to unite their suffering with Christ\'s.'
        ],
        catechism: 'Alphonsus Liguori is the patron saint of confessors and moral theologians.',
        scripture: 'James 5:16, 1 John 1:9'
      },
      {
        id: 'dismas',
        title: 'St. Dismas',
        description: 'The Good Thief, patron of prisoners',
        story: 'Dismas is the name tradition gives to the "good thief" crucified alongside Jesus. While the other thief mocked Jesus, Dismas rebuked him, saying "We deserve our punishment, but this man has done nothing wrong." Then he turned to Jesus and made a simple but profound request: "Jesus, remember me when you come into your kingdom." Jesus replied with the promise of salvation: "Today you will be with me in Paradise." Dismas is the patron saint of prisoners, deathbed conversions, and hopeless cases.',
        novena: 'St. Dismas Novena: For nine days, pray: "O St. Dismas, who repented on the cross and found mercy, help all prisoners and those facing death to turn to Christ. May they find hope even in despair. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Dismas: O glorious St. Dismas, who repented at the last moment and received paradise, intercede for me. Help me to turn to Christ no matter how far I have strayed. Obtain mercy for all prisoners and those facing death.',
          'Prayer for Prisoners: St. Dismas, fellow prisoner of Christ, watch over all who are incarcerated. Comfort them, strengthen them, and bring them to repentance.',
          'Prayer for Deathbed Conversions: St. Dismas, who found salvation at the last hour, intercede for all who are dying. May they turn to Christ and find mercy.',
          'Prayer for Hope: St. Dismas, who found hope in despair, help all who feel their situation is hopeless to trust in God\'s mercy.'
        ],
        catechism: 'Dismas was the thief crucified with Jesus who repented and was promised paradise.',
        scripture: 'Luke 23:39-43'
      },
      {
        id: 'stephen',
        title: 'St. Stephen',
        description: 'First martyr, deacon',
        story: 'Stephen was one of the first seven deacons ordained by the apostles. He was "full of faith and the Holy Spirit" and performed great miracles. His preaching about Jesus angered the Jewish authorities, who brought false witnesses against him. In his defense speech, Stephen recounted Israel\'s history and accused them of rejecting the Messiah. Enraged, they stoned him to death. Stephen forgave his murderers, crying out "Lord, do not hold this sin against them." His martyrdom was witnessed by Saul (later St. Paul), who approved of his death.',
        novena: 'St. Stephen Novena: For nine days, pray: "O glorious St. Stephen, first martyr, who forgave your murderers, help us to forgive those who hurt us. Intercede for all deacons and persecuted Christians. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Stephen: O glorious St. Stephen, first martyr of the Church, full of faith and the Holy Spirit, intercede for me. Help me to be bold in witnessing to Christ and to forgive those who persecute me.',
          'Prayer for Forgiveness: St. Stephen, who forgave those who stoned you, help me to forgive those who have hurt me. May I respond to persecution with love.',
          'Prayer for Deacons: St. Stephen, deacon and martyr, bless all deacons. Give them your faith, your zeal, and your charity.',
          'Prayer for the Persecuted: St. Stephen, first witness to die for Christ, comfort all who are persecuted for their faith. Give them courage and endurance.'
        ],
        catechism: 'Stephen was the first Christian martyr and a deacon.',
        scripture: 'Acts 6-7'
      },
      {
        id: 'lawrence',
        title: 'St. Lawrence',
        description: 'Deacon, martyr of Rome',
        story: 'Lawrence was a deacon in Rome in the 3rd century, responsible for the Church\'s treasures and the care of the poor. When the emperor demanded the Church\'s wealth, Lawrence asked for three days to gather it. During that time, he distributed the Church\'s goods to the poor. Then he presented the poor, the crippled, and the blind to the emperor, saying "These are the Church\'s treasures." Enraged, the emperor had Lawrence roasted to death on a gridiron. Lawrence famously joked, "I\'m done on this side, turn me over!" He is patron of cooks, comedians, and the poor.',
        novena: 'St. Lawrence Novena: For nine days, pray: "O glorious St. Lawrence, who saw Christ in the poor, help us to serve those in need. Intercede for chefs and all who prepare food. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Lawrence: O glorious St. Lawrence, deacon and martyr, who saw the poor as the Church\'s true treasure, intercede for me. Help me to serve the needy with generosity and to face suffering with joy and humor.',
          'Prayer for Chefs: St. Lawrence, patron of cooks, bless all who prepare food for others. May they prepare meals with love and share generously with the hungry.',
          'Prayer for the Poor: St. Lawrence, protector of the poor, help us to see Christ in those in need. May we share our resources generously.',
          'Prayer for Joy: St. Lawrence, who joked even while martyred, help us to maintain joy and humor even in difficult times.'
        ],
        catechism: 'Lawrence is the patron saint of chefs and comedians.',
        scripture: 'Hebrews 13:16'
      },
      {
        id: 'sebastian',
        title: 'St. Sebastian',
        description: 'Martyr, patron of athletes',
        story: 'Sebastian was a Roman soldier who secretly became a Christian. He comforted persecuted Christians and converted many to the faith. When discovered, Emperor Diocletian ordered him tied to a tree and shot with arrows. Left for dead, he was nursed back to health by St. Irene. He then confronted the emperor again, who had him beaten to death and thrown in a sewer. Sebastian survived and died a martyr\'s death. He is depicted as a young man tied to a tree with arrows. He is patron of athletes, soldiers, and those suffering from plague.',
        novena: 'St. Sebastian Novena: For nine days, pray: "O glorious St. Sebastian, athlete for Christ, intercede for all athletes. Give them strength, discipline, and fair play. Protect all from illness. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Sebastian: O glorious St. Sebastian, athlete for Christ and martyr, intercede for me. Give me courage to live my faith even when it is dangerous. Protect all athletes and soldiers.',
          'Prayer for Athletes: St. Sebastian, patron of athletes, bless all who compete in sports. Give them strength, discipline, and the spirit of fair play.',
          'Prayer for Soldiers: St. Sebastian, soldier of Christ, protect all who serve in the military. Give them courage and keep them safe from harm.',
          'Prayer for the Sick: St. Sebastian, invoked against plague and disease, intercede for all who are ill. Bring them healing and comfort.'
        ],
        catechism: 'Sebastian is the patron saint of athletes and soldiers.',
        scripture: '2 Timothy 4:7'
      },
      {
        id: 'christopher',
        title: 'St. Christopher',
        description: 'Patron of travelers',
        story: 'Christopher, whose name means "Christ-bearer," was traditionally a tall man who wanted to serve the greatest king. After serving a king who feared the devil, then the devil who feared Christ, he sought to serve Christ. A hermit told him to carry travelers across a dangerous river. One night, a child asked to be carried. As Christopher crossed, the child became incredibly heavy, nearly sinking him. The child revealed Himself as Jesus, who carries the weight of the world\'s sins. Christopher became a missionary and was martyred. He is patron of travelers.',
        novena: 'St. Christopher Novena: For nine days, pray: "O glorious St. Christopher, Christ-bearer, protect all who travel. Keep them safe from accident and danger. Bring them safely to their destination. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Christopher: O glorious St. Christopher, who carried Christ across the river, intercede for all who travel. Protect them from every danger and bring them safely home. Help me to carry Christ to others in my daily journey.',
          'Prayer for Travelers: St. Christopher, patron of travelers, watch over all journeys - by car, plane, train, ship, or foot. Protect from accident, injury, and harm.',
          'Prayer for Drivers: St. Christopher, bless all who drive. Keep them alert, patient, and safe. Bring them home to their families.',
          'Prayer for Carrying Christ: St. Christopher, Christ-bearer, help me to carry Jesus in my heart and share Him with everyone I meet.'
        ],
        catechism: 'Christopher is the patron saint of travelers.',
        scripture: 'Psalm 91:11-12'
      },
      {
        id: 'nicholas',
        title: 'St. Nicholas',
        description: 'Bishop of Myra, patron of children',
        story: 'Nicholas was born in Asia Minor in the 3rd century. He became Bishop of Myra and was known for his generosity and miracles. The most famous story tells of three poor girls whose father could not afford dowries, meaning they would be sold into slavery. Nicholas secretly threw bags of gold through their window at night, providing for their future. He also saved three men from execution and provided grain during a famine. He died on December 6, 343 AD. His generosity inspired the figure of Santa Claus. He is patron of children, merchants, and sailors.',
        novena: 'St. Nicholas Novena: For nine days, pray: "O glorious St. Nicholas, helper of the poor and protector of children, intercede for us. Help us to be generous as you were. Protect all children and those who provide for them. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Nicholas: O glorious St. Nicholas, bishop and miracle-worker, intercede for me. You who gave secretly to those in need, teach us generous charity. Protect all children, especially those who are poor, abandoned, or abused.',
          'Prayer for Children: St. Nicholas, patron of children, watch over all young people. Protect them from harm and guide them in faith.',
          'Prayer for the Generous: St. Nicholas, model of charity, help us to share generously with those in need. May we give without seeking recognition.',
          'Prayer for Merchants: St. Nicholas, patron of merchants, bless all businesses. Guide them to deal honestly and justly, caring for the poor.'
        ],
        catechism: 'Nicholas is the patron saint of children, merchants, and sailors.',
        scripture: 'Matthew 19:14'
      },
      {
        id: 'valentine',
        title: 'St. Valentine',
        description: 'Martyr, patron of lovers',
        story: 'Valentine was a priest in Rome during the 3rd century. Emperor Claudius II forbade young men from marrying, believing single men made better soldiers. Valentine defied this unjust order and continued to perform Christian marriages. He was arrested and while in prison, converted the jailer and his daughter. Legend says he sent the girl a note signed "From your Valentine" before his martyrdom. He was beaten and beheaded around 269 AD. His feast day became associated with romantic love, and he is patron of lovers, engaged couples, and happy marriages.',
        novena: 'St. Valentine Novena: For nine days, pray: "O glorious St. Valentine, martyr and patron of lovers, bless all couples. Help them to love as Christ loves the Church. Strengthen marriages and prepare engaged couples for holy union. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Valentine: O glorious St. Valentine, who witnessed to Christian love even to death, intercede for me. Bless all marriages with fidelity, understanding, and sacrificial love. Help couples to grow together in faith.',
          'Prayer for Couples: St. Valentine, patron of lovers, bless all couples - married, engaged, or dating. May their love reflect Christ\'s love for the Church.',
          'Prayer for Marriages: St. Valentine, strengthen all marriages. Help spouses to forgive, communicate, and grow together in holiness.',
          'Prayer for the Engaged: St. Valentine, bless all couples preparing for marriage. Prepare them for the sacred commitment they are about to make.'
        ],
        catechism: 'Valentine is the patron saint of lovers and engaged couples.',
        scripture: '1 Corinthians 13:4-7'
      },
      {
        id: 'mark',
        title: 'St. Mark',
        description: 'Evangelist, author of Gospel',
        story: 'John Mark was a companion of St. Peter and St. Paul. His mother\'s home in Jerusalem was a meeting place for early Christians. He accompanied Paul and Barnabas on their first missionary journey but left early, causing Paul to refuse to take him later. Barnabas took Mark to Cyprus, where they reconciled with Paul. Later, Mark worked closely with Peter in Rome, and Peter calls him "my son" in his letter. Mark wrote the second Gospel, based on Peter\'s preaching. Tradition says he founded the Church in Alexandria and was martyred there. He is patron of notaries and lawyers.',
        novena: 'St. Mark Novena: For nine days, pray: "O glorious St. Mark, evangelist and companion of Peter, help us to understand and proclaim the Gospel. Intercede for all who share God\'s word. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Mark: O glorious St. Mark, evangelist and companion of the apostles, intercede for me. You who wrote the Gospel according to Mark, help me to understand Scripture and share it with others.',
          'Prayer for Understanding: St. Mark, who recorded Peter\'s preaching, help all who read Scripture to understand its meaning and apply it to their lives.',
          'Prayer for Evangelists: St. Mark, preacher of the Gospel, bless all who share God\'s word. Give them courage, clarity, and fruit.',
          'Prayer for Second Chances: St. Mark, who failed on a mission but later became a great evangelist, help those who have failed to try again.'
        ],
        catechism: 'Mark wrote the second Gospel and is the patron saint of notaries.',
        scripture: 'Mark 1:1'
      },
      {
        id: 'luke',
        title: 'St. Luke',
        description: 'Evangelist, physician',
        story: 'Luke was a Greek physician from Antioch who never met Jesus personally. He carefully investigated the events of Jesus\' life and wrote the third Gospel and the Acts of the Apostles. His Gospel emphasizes Jesus\' compassion for the poor, women, and outcasts. He was a companion of St. Paul on several missionary journeys, including Paul\'s final journey to Rome. Luke alone records the parables of the Good Samaritan and the Prodigal Son. Tradition says he remained unmarried, died at age 84, and was an artist who painted the first icons of Mary. He is patron of physicians, surgeons, and artists.',
        novena: 'St. Luke Novena: For nine days, pray: "O glorious St. Luke, physician and evangelist, intercede for all doctors and nurses. Help them to bring healing and compassion. Guide all who read Scripture to understand God\'s mercy. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Luke: O glorious St. Luke, physician and evangelist, intercede for me. You who recorded Jesus\' compassion for the suffering, help me to see Christ in those who are sick or marginalized. Bless all healthcare workers.',
          'Prayer for Doctors: St. Luke, patron of physicians, bless all doctors, nurses, and caregivers. Give them skill, compassion, and wisdom. May they see their patients as Christ sees them.',
          'Prayer for the Sick: St. Luke, healer and evangelist, comfort all who are ill. Bring them physical healing and spiritual peace.',
          'Prayer for Artists: St. Luke, patron of artists, bless all who create art for God\'s glory. May their work elevate hearts to heaven.'
        ],
        catechism: 'Luke wrote the third Gospel and the Acts of the Apostles.',
        scripture: 'Luke 1:1-4'
      },
      {
        id: 'matthew',
        title: 'St. Matthew',
        description: 'Apostle, evangelist, tax collector',
        story: 'Matthew was a tax collector in Capernaum when Jesus called him to leave everything and follow him. Tax collectors were despised as collaborators with Rome and often dishonest. Yet Jesus saw something in Matthew and chose him as an apostle. Matthew immediately left his lucrative post and hosted a feast for his fellow sinners to meet Jesus. He wrote the first Gospel, emphasizing how Jesus fulfilled Old Testament prophecies. Tradition says he preached for 15 years in Judea before traveling to Ethiopia, where he was martyred. He is patron of tax collectors, accountants, and bankers.',
        novena: 'St. Matthew Novena: For nine days, pray: "O glorious St. Matthew, apostle and evangelist, who left wealth to follow Christ, help us to value God\'s kingdom above worldly gain. Intercede for all who work in finance. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Matthew: O glorious St. Matthew, apostle and evangelist, who left your tax booth to follow Jesus, intercede for me. Help me to respond quickly to Christ\'s call and to leave behind whatever keeps me from following Him.',
          'Prayer for Those in Finance: St. Matthew, patron of accountants, bless all who work with money. Give them integrity and honesty in all their dealings.',
          'Prayer for Conversion: St. Matthew, who invited fellow sinners to meet Jesus, help me to share the Gospel with those far from God.',
          'Prayer for Generosity: St. Matthew, who gave up wealth to follow Christ, teach us detachment from material possessions.'
        ],
        catechism: 'Matthew wrote the first Gospel and was a tax collector.',
        scripture: 'Matthew 9:9'
      },
      {
        id: 'john',
        title: 'St. John the Apostle',
        description: 'Beloved disciple, evangelist',
        story: 'John was a fisherman from Galilee, the brother of James, and one of Jesus\' twelve apostles. He was especially close to Jesus - present at the Transfiguration, the raising of Jairus\' daughter, and in the Garden of Gethsemane. He leaned on Jesus\' chest at the Last Supper and was the only apostle to stand at the foot of the cross. Jesus entrusted Mary to John\'s care. John wrote the fourth Gospel, three epistles, and the Book of Revelation. He was the only apostle not martyred, dying of old age in Ephesus. He is patron of writers, theologians, and those in love.',
        novena: 'St. John Novena: For nine days, pray: "O glorious St. John, beloved disciple and apostle of love, help us to rest our heads on Christ\'s heart as you did. Intercede for all writers and for those seeking to love as Jesus loved. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. John: O glorious St. John, apostle whom Jesus loved, help me to grow in intimate friendship with Christ. You who rested your head on Jesus\' chest, teach me to find my home in His Sacred Heart.',
          'Prayer for Love: St. John, apostle of love, teach us to love as Jesus loves - selflessly, completely, sacrificially.',
          'Prayer for Writers: St. John, evangelist and writer, bless all who write. May their words point others to Christ and His love.',
          'Prayer for Purity: St. John, virgin apostle, help us to remain pure in heart and to honor the Blessed Mother whom you cared for.'
        ],
        catechism: 'John wrote the fourth Gospel and three epistles.',
        scripture: 'John 13:23'
      },
      {
        id: 'james-greater',
        title: 'St. James the Greater',
        description: 'Apostle of Spain, Santiago',
        story: 'James was a fisherman, the brother of John, and one of Jesus\' first apostles. With John and Peter, he witnessed the Transfiguration and Jesus\' agony in the garden. Jesus gave them the nickname "Boanerges" - sons of thunder - for their zeal. After Pentecost, tradition says James preached in Spain before returning to Judea, where Herod Agrippa beheaded him in 44 AD - the first apostle martyred. His followers supposedly carried his body back to Spain, where his shrine at Santiago de Compostela became a major pilgrimage site. He is patron of Spain, pilgrims, and laborers.',
        novena: 'St. James Novena: For nine days, pray: "O glorious St. James, first apostle to die for Christ, intercede for all pilgrims. Give us courage to witness to our faith even when it is dangerous. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. James: O glorious St. James, apostle and pilgrim, who gave your life for Christ, intercede for me. You who traveled far to spread the Gospel, bless all who travel - especially pilgrims seeking God.',
          'Prayer for Pilgrims: St. James, patron of pilgrims, protect all who journey to holy places. May they encounter Christ along the way and return transformed.',
          'Prayer for Courage: St. James, one of the sons of thunder, give us courage to witness to our faith boldly, even when it requires sacrifice.',
          'Prayer for Laborers: St. James, patron of workers, bless all who labor. May they offer their work as prayer and find dignity in honest work.'
        ],
        catechism: 'James is the patron saint of pilgrims and Spain.',
        scripture: 'Acts 12:1-2'
      },
      {
        id: 'philip',
        title: 'St. Philip the Apostle',
        description: 'Apostle, brought Nathanael to Jesus',
        story: 'Philip was from Bethsaida, the same city as Peter and Andrew. After Jesus called him, Philip immediately found Nathanael and told him "We have found the one Moses wrote about!" When Nathanael was skeptical, Philip simply said "Come and see." At the feeding of the 5000, Jesus tested Philip by asking where to buy bread for the crowd. Philip\'s practical response showed his trust in human calculation over divine power. Later, Philip asked Jesus to "show us the Father," leading to Jesus\' profound reply "Whoever has seen me has seen the Father." Philip preached in Greece and was martyred there.',
        novena: 'St. Philip Novena: For nine days, pray: "O glorious St. Philip, apostle who brought Nathanael to Jesus, help us to share our faith with those around us. Intercede for all evangelizers. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Philip: O glorious St. Philip, apostle who immediately shared the good news with Nathanael, help me to be an evangelizer. Give me the zeal to invite others to "come and see" Jesus.',
          'Prayer for Evangelizers: St. Philip, who brought your friend to Christ, bless all who share their faith. Give them words to speak and hearts full of love.',
          'Prayer for Trust: St. Philip, who learned to trust divine power over human calculation, help me to trust God\'s provision rather than my own resources.',
          'Prayer for Those Seeking God: St. Philip, who invited Nathanael to "come and see," help all who are searching for truth to encounter Christ.'
        ],
        catechism: 'Philip brought Nathanael to Jesus.',
        scripture: 'John 1:43-46'
      },
      {
        id: 'bartholomew',
        title: 'St. Bartholomew (Nathanael)',
        description: 'Apostle, flayed alive',
        story: 'Bartholomew, likely the same person as Nathanael, was from Cana. When Philip told him about Jesus, Nathanael asked "Can anything good come from Nazareth?" But when he met Jesus, who said "Here is a true Israelite in whom there is no deceit," he immediately confessed "Rabbi, you are the Son of God; you are the king of Israel." Tradition says he preached in India, Armenia, and Mesopotamia. He was martyred in Armenia by being flayed alive and then crucified upside down. He is often depicted holding his flayed skin. He is patron of plasterers, tanners, and those with nervous diseases.',
        novena: 'St. Bartholomew Novena: For nine days, pray: "O glorious St. Bartholomew, who confessed Jesus as Son of God, strengthen our faith. Intercede for all persecuted Christians. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Bartholomew: O glorious St. Bartholomew, apostle and martyr, who confessed Jesus as Son of God after one meeting, strengthen my faith. Help me to recognize Christ\'s presence and to proclaim Him boldly.',
          'Prayer for Honesty: St. Bartholomew, in whom Jesus found no deceit, help us to be honest and sincere in all our dealings.',
          'Prayer for Persecuted Christians: St. Bartholomew, who suffered a brutal martyrdom, comfort all Christians persecuted for their faith. Give them courage and endurance.',
          'Prayer for Skeptics: St. Bartholomew, who doubted at first but believed upon meeting Jesus, bless all who are skeptical about the faith. May they encounter Christ.'
        ],
        catechism: 'Bartholomew was brought to Jesus by Philip.',
        scripture: 'John 1:45-51'
      },
      {
        id: 'matthias',
        title: 'St. Matthias',
        description: 'Apostle, replaced Judas',
        story: 'After Judas Iscariot\'s betrayal and suicide, the apostles gathered to choose a replacement. They selected two candidates - Joseph Barsabbas and Matthias - and prayed, asking God to show which He had chosen. They cast lots, and Matthias was chosen to complete the number twelve, representing the twelve tribes of Israel. Little else is known about Matthias from Scripture. Tradition says he preached in Judea and then in Cappadocia near the Black Sea. He was martyred by stoning and then beheaded with an axe. He is invoked for those seeking God\'s will in difficult decisions.',
        novena: 'St. Matthias Novena: For nine days, pray: "O glorious St. Matthias, chosen apostle, help us to discern God\'s will in difficult decisions. Intercede for all called to replace others in ministry. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Matthias: O glorious St. Matthias, chosen to complete the number of apostles, intercede for me. You were selected by lot after prayer, help me to seek God\'s will in my decisions and to trust His guidance.',
          'Prayer for Discernment: St. Matthias, chosen by God through prayer and lots, help all who are discerning important decisions. Guide them to seek God\'s will above human preferences.',
          'Prayer for Second Chances: St. Matthias, who took the place of Judas, comfort all who step into roles left by others. Help them to be faithful.',
          'Prayer for Faithfulness: St. Matthias, apostle and martyr, give us the grace to remain faithful to our calling, even when it comes unexpectedly.'
        ],
        catechism: 'Matthias was chosen to replace Judas Iscariot.',
        scripture: 'Acts 1:15-26'
      },
      {
        id: 'thomas-apostle',
        title: 'St. Thomas the Apostle',
        description: 'Doubting Apostle, patron of India',
        story: 'Thomas, called Didymus (twin), was one of the Twelve. He is most famous for doubting Jesus\' resurrection, refusing to believe unless he could touch Jesus\' wounds. A week later, Jesus appeared and invited Thomas to touch His side. Thomas made the greatest confession in Scripture: "My Lord and my God!" Jesus said those who believe without seeing are blessed. Tradition says Thomas preached in Persia and then India, where he built a church with his own hands. He was martyred in India, pierced with spears. He is patron of India, architects, and those struggling with faith.',
        novena: 'St. Thomas Novena: For nine days, pray: "O glorious St. Thomas, who touched the wounds of Christ, help all who struggle with doubt. Intercede for the people of India and for architects. Through Christ our Lord. Amen."',
        prayers: [
          'Prayer to St. Thomas: O glorious St. Thomas, who doubted and then believed, intercede for me when my faith wavers. Help me to confess with you "My Lord and my God!" and to find peace in believing.',
          'Prayer for Skeptics: St. Thomas, who needed to see to believe, comfort all who struggle with doubt. May they encounter the risen Christ and find faith.',
          'Prayer for India: St. Thomas, apostle to India, bless the people of that land. Strengthen the Church there and protect all persecuted Christians.',
          'Prayer for Builders: St. Thomas, patron of architects, bless all who build. May they create structures that glorify God and serve human needs.'
        ],
        catechism: 'Thomas is the patron saint of India and architects.',
        scripture: 'John 20:24-29'
      },
      {
        id: 'simon-peter',
        title: 'St. Simon Peter',
        description: 'First Pope, fisherman apostle',
        story: 'This is the same as St. Peter above. Simon Peter was a fisherman from Galilee when Jesus called him to be a fisher of men. Jesus gave him the name Peter (Rock) and said "Upon this rock I will build my church." He was the first Pope, the leader of the apostles, and the Prince of Apostles.',
        novena: 'See St. Peter novena above.',
        prayers: [
          'See St. Peter prayers above.'
        ],
        catechism: 'Peter was the first Pope and the leader of the apostles.',
        scripture: 'Matthew 16:18-19'
      },
      {
        id: 'jude-thaddaeus',
        title: 'St. Jude Thaddaeus',
        description: 'Apostle, patron of lost causes',
        story: 'Same as St. Jude above. Jude was one of the Twelve Apostles, also called Thaddaeus or Lebbaeus. He is the author of the New Testament letter that bears his name. Because his name sounds like Judas Iscariot, devotion to him was neglected. When people finally turned to him, they discovered his powerful intercession, especially for hopeless causes.',
        novena: 'See St. Jude novena above.',
        prayers: [
          'See St. Jude prayers above.'
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
        story: 'The Catholic Church celebrates time itself as sacred. The liturgical year unfolds the mystery of Christ from His incarnation and birth to His ascension, the sending of the Spirit, and the expectation of His return. Each season has its own colors, prayers, and traditions.',
        prayers: [
          'Advent: Purple vestments, 4 weeks of preparation for Christmas. Advent wreath with 4 candles. Waiting and hope.',
          'Christmas: White/Gold vestments, December 25 - January 12 (Baptism of Lord). Nativity scenes, carols, gift-giving.',
          'Lent: Purple/rose vestments, 40 days of fasting, prayer, almsgiving. Ash Wednesday ashes on forehead. Stations of Cross.',
          'Paschal Triduum: Holy Thursday (foot washing), Good Friday (veneration of cross), Holy Saturday (Easter Vigil)',
          'Easter: White vestments, 50 days celebrating resurrection. Empty tomb symbols, alleluias, lilies.',
          'Ordinary Time: Green vestments, growing in discipleship. Focus on Christ\'s public ministry.',
          'Feast days: Saints\' days celebrated throughout the year. Patron saints of parishes and individuals.'
        ],
        catechism: 'The liturgical year celebrates the mysteries of Christ\'s life in a cycle of seasons.',
        scripture: 'Leviticus 23, Colossians 2:16-17'
      },
      {
        id: 'holy-days',
        title: 'Holy Days of Obligation',
        description: 'Major feast days requiring Mass',
        story: 'Holy days are special celebrations when Catholics are obligated to attend Mass, just as on Sundays. These commemorate central mysteries of the faith. In some countries, certain holy days are transferred to Sunday.',
        prayers: [
          'Mary, Mother of God (January 1): Honors Mary\'s divine maternity. World Day of Peace.',
          'Epiphany (January 6): The Magi visit Jesus. Manifestation to Gentiles. Blessing of homes with chalk.',
          'Ascension of Jesus (40 days after Easter): Christ ascends to heaven. Thursday or Sunday celebration.',
          'Corpus Christi (Thursday after Trinity Sunday): Processions honoring the Body and Blood of Christ.',
          'Assumption of Mary (August 15): Mary taken body and soul into heaven. Blessing of herbs and flowers.',
          'All Saints (November 1): All the saints in heaven. Cemetery visits, honoring the departed.',
          'Immaculate Conception (December 8): Mary conceived without sin. Patronal feast of USA, Philippines, etc.',
          'Christmas (December 25): Birth of Jesus Christ. Midnight Mass, family celebrations, gift-giving.'
        ],
        catechism: 'Holy days are special celebrations requiring participation in Mass.',
        scripture: 'Acts 2:1, Leviticus 23'
      },
      {
        id: 'church-fathers',
        title: 'Church Fathers',
        description: 'Early Christian theologians',
        story: 'The Church Fathers were early theologians (1st-8th centuries) whose writings established Christian doctrine. They defended the faith against heresies and explained apostolic teaching. Their works are still studied today.',
        prayers: [
          'Patristic Period: 1st-8th centuries, spanning from apostolic age to early medieval period.',
          'Eastern (Greek) Fathers: Athanasius (defended Christ\'s divinity), Basil the Great (monasticism), Gregory Nazianzen (Trinity), John Chrysostom (preaching), Cyril of Alexandria (Mary as Mother of God)',
          'Western (Latin) Fathers: Ambrose (baptized Augustine), Jerome (translated Bible to Latin), Augustine of Hippo (grace, original sin), Gregory the Great (Gregorian chant, liturgy)',
          'Desert Fathers: Anthony and others who fled to desert to pray, beginning monasticism',
          'Their writings preserve and explain apostolic teaching, forming the basis of Christian theology'
        ],
        catechism: 'The Church Fathers preserved apostolic teaching and developed theology.',
        scripture: '2 Timothy 2:2, Jude 1:3'
      },
      {
        id: 'ecumenical-councils',
        title: 'Ecumenical Councils',
        description: 'Church-wide teaching councils',
        story: 'An ecumenical council is a meeting of all Catholic bishops worldwide, convened by the Pope, to definitively settle matters of doctrine and discipline. There have been 21 ecumenical councils in Church history.',
        prayers: [
          'Council of Nicaea I (325): Defended Christ\'s divinity against Arianism. Composed Nicene Creed.',
          'Council of Constantinople I (381): Affirmed full divinity of Holy Spirit. Expanded Nicene Creed.',
          'Council of Ephesus (431): Proclaimed Mary as Theotokos (Mother of God). Condemned Nestorianism.',
          'Council of Chalcedon (451): Affirmed Christ has two natures (divine and human) in one person.',
          'Council of Trent (1545-1563): Responded to Protestant Reformation. Clarified doctrine of sacraments, justification, Scripture and Tradition.',
          'Vatican I (1869-1870): Defined papal infallibility when speaking ex cathedra on faith or morals.',
          'Vatican II (1962-1965): Updated Church for modern world. Liturgy in vernacular, ecumenism, religious freedom.'
        ],
        catechism: 'Ecumenical councils define Catholic doctrine and practice.',
        scripture: 'Acts 15 (Council of Jerusalem)'
      },
      {
        id: 'papacy',
        title: 'The Papacy',
        description: 'Pope as successor to Peter',
        story: 'Jesus chose Peter as the head of the apostles, giving him the "keys to the kingdom." The Pope is the Bishop of Rome and successor of St. Peter. He has supreme authority over the entire Church. The papacy has continued unbroken for over 2000 years.',
        prayers: [
          'Prayer for the Pope: "Lord, we pray for Your Holy Father Pope Francis. Protect him, strengthen him, and guide him as he leads Your Church."',
          'Papal infallibility: When the Pope speaks ex cathedra (from the chair of Peter) on faith or morals, he is protected from error by the Holy Spirit.',
          'Apostolic succession: Unbroken line from Peter to Pope Francis through laying on of hands.',
          'Petrine primacy: Pope as visible head of Church, Vicar of Christ, Servant of the Servants of God.',
          'Papal titles: Bishop of Rome, Vicar of Jesus Christ, Successor of the Prince of the Apostles, Supreme Pontiff, Primate of Italy, Archbishop and Metropolitan of the Roman Province, Sovereign of the Vatican City State, Servant of the Servants of God.'
        ],
        catechism: 'The Pope is the successor of St. Peter and Christ\'s representative on earth.',
        scripture: 'Matthew 16:18-19, John 21:15-17'
      },
      {
        id: 'relics',
        title: 'Veneration of Relics',
        description: 'Honoring holy objects and remains',
        story: 'Since apostolic times, Christians have honored the relics (remains) of saints. The bones of St. Polycarp were described as "more precious than gold." Relics are placed in altars and venerated but never worshipped.',
        prayers: [
          'First-class relics: Physical remains of saints (bones, hair, ashes). Most treasured. Placed in altar stones.',
          'Second-class relics: Items used or worn by saints during life (clothing, prayer books, instruments of torture).',
          'Third-class relics: Objects touched to first or second-class relics. Many people carry these as blessings.',
          'Veneration vs. Worship: We venerate (honor) relics and saints but worship (adore) God alone. Relics are channels of God\'s grace.',
          'Famous relics: True Cross (fragments of Jesus\' cross), Shroud of Turin, relics of Apostles in Roman basilicas.'
        ],
        catechism: 'Relics connect us to the saints and their holy example.',
        scripture: 'Acts 19:11-12, 2 Kings 13:21'
      },
      {
        id: 'icons',
        title: 'Religious Art and Icons',
        description: 'Visual expressions of faith',
        story: 'Sacred art has been part of Christianity from the catacomb paintings onward. Icons (sacred images) are called "windows to heaven" in the East. In the West, stained glass, statues, and paintings taught the faith to the illiterate.',
        prayers: [
          'Iconography: Byzantine and Orthodox tradition. Icons are written, not painted. Venerated as sacred.',
          'Religious statues: Three-dimensional representations of Jesus, Mary, and saints. Teaching tools and devotion aids.',
          'Crucifix: Cross with corpus of Christ. Focuses on Jesus\' sacrifice. Required in every Catholic church.',
          'Stained glass: Narratives of Bible and saints. "Bible of the poor" - taught faith through beauty.',
          'Catholic art principles: Must be reverent, doctrinally sound, and lead the viewer to God.'
        ],
        catechism: 'Sacred art helps elevate the mind to God.',
        scripture: 'Exodus 25:18-22, Psalm 96:6'
      },
      {
        id: 'pilgrimage',
        title: 'Pilgrimage',
        description: 'Sacred journeys to holy sites',
        story: 'Since the 4th century, Christians have traveled to holy places as pilgrims. Pilgrimage is a spiritual journey, a physical symbol of our journey to God. Pilgrims seek forgiveness, healing, or special blessings.',
        prayers: [
          'Holy Land: Israel/Palestine. Walk where Jesus walked. Church of Holy Sepulchre, Via Dolorosa, Bethlehem.',
          'Rome: Eternal City. Four major basilicas, tomb of Peter, catacombs. Jubilee years every 25 years.',
          'Santiago de Compostela: Spain. Tomb of St. James. Camino pilgrimage routes across Europe.',
          'Lourdes: France. Grotto where Mary appeared to St. Bernadette. Healing baths. Millions visit annually.',
          'Fatima: Portugal. Mary appeared to three children in 1917. Message of prayer and repentance.',
          'Guadalupe: Mexico. Mary\'s image on Juan Diego\'s tilma. Most visited Catholic shrine in the world.',
          'National shrines: Every country has sacred sites where Catholics gather for prayer and celebration.'
        ],
        catechism: 'Pilgrimage expresses the Church\'s belief that we are strangers and pilgrims on earth, journeying to heaven.',
        scripture: 'Psalm 84, Hebrews 11:13-16'
      },
      {
        id: 'blessings',
        title: 'Sacramentals and Blessings',
        description: 'Sacred signs and prayers',
        story: 'Sacramentals are sacred signs (objects, actions, prayers) that prepare us to receive grace and dispose us to cooperate with it. Unlike sacraments, they do not confer grace by their own power but through the Church\'s prayer.',
        prayers: [
          'Blessed objects: Rosaries, medals, scapulars, crucifixes, holy water, salt, candles, palms, ashes.',
          'Brown Scapular: Promise from Mary: "Whosoever dies wearing this shall not suffer eternal fire."',
          'Miraculous Medal: Medal based on Mary\'s appearance to St. Catherine Labouré. Many miracles reported.',
          'St. Benedict Medal: Powerful protection against evil. Includes Latin abbreviations for prayers.',
          'Holy Water: Reminds us of Baptism. Used for blessing ourselves, homes, and the sick.',
          'Blessed salt: Protection and preservation. Used in cooking and sprinkling.',
          'Palms: Blessed on Palm Sunday. Kept in homes as protection and reminder of Christ\'s victory.'
        ],
        catechism: 'Sacramentals are sacred signs that prepare us to receive and cooperate with grace.',
        scripture: 'Acts 19:11-12, Mark 6:13'
      },
      {
        id: 'fasting-abstinence',
        title: 'Fasting and Abstinence',
        description: 'Penitential practices',
        story: 'Jesus fasted for 40 days. The Church imitates Him, especially during Lent. Fasting (eating less) and abstinence (not eating meat) are forms of self-denial that help us grow in holiness.',
        prayers: [
          'Days of Fast: Ash Wednesday and Good Friday. Ages 18-59. One full meal, two small meals, no eating between meals.',
          'Days of Abstinence: All Fridays in Lent. Ages 14+. No meat (fish allowed). Also: Ash Wednesday, Good Friday.',
          'Fridays outside Lent: Abstinence from meat recommended; substitute another penance.',
          'Ember Days: Traditional quarterly days of fasting and prayer for God\'s blessings on the seasons.',
          'Easter Duty: Receive Communion and go to confession between First Sunday of Lent and Trinity Sunday.',
          'Eucharistic Fast: No food or drink (except water/medicine) for one hour before receiving Communion.'
        ],
        catechism: 'Penance prepares us for the celebration of the Paschal Mystery and helps us grow in self-mastery.',
        scripture: 'Matthew 6:16-18, Joel 2:12-13'
      },
      {
        id: 'gestures-prayers',
        title: 'Catholic Gestures and Postures',
        description: 'Bodily prayer expressions',
        story: 'Catholic worship involves the whole body - kneeling, standing, bowing, genuflecting. These physical actions express reverence and help us engage fully in prayer.',
        prayers: [
          'Sign of the Cross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen." Fundamental Catholic prayer.',
          'Genuflection: Bending right knee to the floor as sign of adoration toward the tabernacle. Made before entering pew.',
          'Bowing: Slight bow of head when name of Jesus is spoken; profound bow (from waist) at mention of Trinity, Mary, or saints.',
          'Kneeling: Posture of humility and adoration. During Eucharistic Prayer, after Communion, for private prayer.',
          'Standing: Posture of respect and attention. During Gospel reading, Creed, Our Father, final blessing.',
          'Sitting: Posture of listening and meditation. During readings before Gospel, homily, preparation of gifts.',
          'Striking breast: "Through my fault..." during Confiteor. Sign of repentance.',
          'Hands: Orans position (arms raised) by priest; folded hands by congregation; prayer hands joined at breast.'
        ],
        catechism: 'Bodily gestures express and strengthen our participation in liturgical prayer.',
        scripture: 'Psalm 95:6, Philippians 2:10-11'
      },
      {
        id: 'incense-candles',
        title: 'Incense and Candles',
        description: 'Sacred liturgical elements',
        story: 'Since ancient times, incense has been used in worship. Its rising smoke symbolizes prayers ascending to heaven. Candles represent Christ as light of the world.',
        prayers: [
          'Incense: Used at high Mass, funerals, Eucharistic adoration. Symbol of prayer rising to God (Psalm 141).',
          'Thurible: Censor that holds burning incense. Swung by thurifer (server) in reverent pattern.',
          'Votive candles: Candles lit by faithful in prayer. Continues prayer after we leave church.',
          'Paschal Candle: Large candle blessed at Easter Vigil. Symbol of Christ risen. Used at baptisms and funerals.',
          'Altar candles: At least two candles on altar during Mass. Six candles for solemn occasions.',
          'Sanctuary lamp: Candle indicating presence of Blessed Sacrament in tabernacle. Always burning.',
          'Baptismal candle: Given to newly baptized. "Keep the flame of faith alive in your heart."'
        ],
        catechism: 'Incense and candles are elements of liturgical worship that engage the senses and symbolize spiritual realities.',
        scripture: 'Psalm 141:2, Revelation 8:3-4, John 8:12'
      },
      {
        id: 'church-architecture',
        title: 'Church Architecture',
        description: 'Sacred space design',
        story: 'Catholic churches are designed as "houses of God" where heaven and earth meet. Traditional church architecture follows ancient patterns that teach the faith and draw us into worship.',
        prayers: [
          'Cruciform shape: Cross-shaped floor plan. Nave (body), transepts (arms), sanctuary (head).',
          'Orientation: Traditionally built with altar facing East (direction of rising sun, symbol of Christ).',
          'Nave: Main body of church. People gather here. Nave means "ship" - Church as ark of salvation.',
          'Sanctuary: Elevated area containing altar. Only for liturgical ministers. Symbol of heaven.',
          'Altar: Table of sacrifice. Contains relics of saints. Kissed by priest at start and end of Mass.',
          'Tabernacle: "Tent" where Eucharist is reserved. Should be prominent, solid, immovable. Red candle indicates presence.',
          'Ambry: Cabinet containing holy oils. Near baptistry or in sanctuary.',
          'Stations of Cross: 14 images on church walls depicting Christ\'s passion. Walked during Lent.',
          'Statues and icons: Reminders of saints and angels. "Cloud of witnesses" surrounding us.',
          'Stained glass windows: Teach Bible stories through beauty. "Poor man\'s Bible."'
        ],
        catechism: 'Church buildings are sacred spaces designed for the celebration of the liturgy and the glory of God.',
        scripture: '1 Kings 6-8 (Temple), Revelation 21 (Heavenly Jerusalem)'
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
    setSelectedItem({ ...item, categoryKey });
  };

  const handleBackToItems = () => {
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl">
        {selectedItem ? (
          // Detail View
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={handleBackToItems}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back</span>
                </button>
              </div>
              <div className="flex items-center gap-4">
                {selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-3xl">
                    {selectedItem.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold font-playfair">{selectedItem.title}</h2>
                  <p className="text-white/90 text-sm">{selectedItem.description}</p>
                </div>
              </div>
            </div>

            {/* Detail Content */}
            <div className="overflow-y-auto p-6 max-h-[80vh] space-y-6">
              {/* Story/Overview */}
              {selectedItem.story && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 font-geist">
                    <span>📖</span> Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-geist bg-purple-50 p-4 rounded-xl border border-purple-100">
                    {selectedItem.story}
                  </p>
                </div>
              )}

              {/* Novena */}
              {selectedItem.novena && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 font-geist">
                    <span>🙏</span> Novena
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-geist bg-rose-50 p-4 rounded-xl border border-rose-100">
                    {selectedItem.novena}
                  </p>
                </div>
              )}

              {/* Prayers */}
              {selectedItem.prayers && selectedItem.prayers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                    <span>🙏</span> Prayers
                  </h3>
                  <div className="space-y-3">
                    {selectedItem.prayers.map((prayer: string, index: number) => (
                      <div key={index} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <p className="text-gray-700 font-geist whitespace-pre-line">{prayer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Catechism */}
              {selectedItem.catechism && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 font-geist">
                    <span>📚</span> Catechism
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-geist bg-blue-50 p-4 rounded-xl border border-blue-100">
                    {selectedItem.catechism}
                  </p>
                </div>
              )}

              {/* Scripture References */}
              {selectedItem.scripture && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 font-geist">
                    <span>📜</span> Scripture
                  </h3>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-gray-700 font-geist whitespace-pre-line">{selectedItem.scripture}</p>
                    <a
                      href="https://www.biblegateway.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <span>📖</span>
                      <span>Open in Bible</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Key Verses */}
              {selectedItem.keyVerses && selectedItem.keyVerses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                    <span>✝️</span> Key Verses
                  </h3>
                  <div className="space-y-2">
                    {selectedItem.keyVerses.map((verse: string, index: number) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                        <p className="text-sm text-gray-700 font-crimson italic">{verse}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              {selectedItem.lessons && selectedItem.lessons.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                    <span>💡</span> Lessons
                  </h3>
                  <div className="space-y-2">
                    {selectedItem.lessons.map((lesson: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <p className="text-sm text-gray-700 pt-0.5 font-geist">{lesson}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Age-specific content */}
              {selectedItem.byAgeGroup && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
                    <span>👥</span> For Different Ages
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedItem.byAgeGroup).map(([age, content]: [string, any]) => (
                      <div key={age} className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 capitalize mb-2">{age}</h4>
                        <p className="text-sm text-gray-700 font-geist">{content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Main Menu View
          <>
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
        <div className="overflow-y-auto p-6 max-h-[80vh]">
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
                            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-xs font-semibold text-green-700 mb-2 font-geist">✨ Includes {item.prayers.length} {item.prayers.length === 1 ? 'prayer' : 'prayers'}:</p>
                              <p className="text-xs text-green-700 font-geist whitespace-pre-line">{item.prayers[0]}</p>
                              {item.prayers.length > 1 && (
                                <p className="text-xs text-green-600 italic mt-1">+ {item.prayers.length - 1} more {item.prayers.length - 1 === 1 ? 'prayer' : 'prayers'}</p>
                              )}
                            </div>
                          )}

                          {item.story && (
                            <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <p className="text-xs font-semibold text-purple-700 mb-1 font-geist">📖 Story:</p>
                              <p className="text-xs text-purple-700 font-geist line-clamp-3">{item.story}</p>
                            </div>
                          )}

                          {item.novena && (
                            <div className="mt-2 p-3 bg-rose-50 rounded-lg border border-rose-200">
                              <p className="text-xs font-semibold text-rose-700 mb-1 font-geist">🙏 Novena:</p>
                              <p className="text-xs text-rose-700 font-geist line-clamp-3">{item.novena}</p>
                            </div>
                          )}

                          {item.catechism && (
                            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-xs font-semibold text-blue-700 mb-1 font-geist">📚 Teaching:</p>
                              <p className="text-xs text-blue-700 font-geist line-clamp-3">{item.catechism}</p>
                            </div>
                          )}

                          {item.scripture && (
                            <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                              <p className="text-xs font-semibold text-amber-700 mb-1 font-geist">📜 Scripture:</p>
                              <p className="text-xs text-amber-800 font-geist">{item.scripture}</p>
                              <a
                                href="https://www.biblegateway.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-xs text-purple-600 hover:text-purple-800 font-medium"
                              >
                                Open in Bible →
                              </a>
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
          </>
        )}
      </div>
    </div>
  );
}
