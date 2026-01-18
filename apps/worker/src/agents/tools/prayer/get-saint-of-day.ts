import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Saint database with curated content for each day
 * In production, integrate with Catholic API or expand this database
 */
const SAINTS_DB: Record<string, {
  name: string;
  feast: string;
  story: string;
  patronage: string;
  prayer: string;
}> = {
  '01-01': {
    name: 'Mary, Mother of God',
    feast: 'Solemnity of Mary, Mother of God',
    story: 'On this day, we celebrate Mary\'s divine motherhood. The Church honors her as "Theotokos" - God-bearer. This feast commemorates her role in the mystery of salvation and her special place in God\'s plan.',
    patronage: 'All mothers, unborn children',
    prayer: 'O God, who through the fruitful virginity of Blessed Mary bestowed on the human race the grace of eternal salvation, grant, we pray, that we may experience the intercession of her, through whom we were found worthy to receive the author of life, our Lord Jesus Christ, your Son. Who lives and reigns with you in the unity of the Holy Spirit, one God, for ever and ever. Amen.',
  },
  '01-03': {
    name: 'Saint Basil the Great',
    feast: 'Memorial of St. Basil the Great',
    story: 'St. Basil was a bishop, theologian, and monastic founder. He defended the Catholic faith against the Arian heresy and established hospitals and charitable institutions. He is known for his wisdom and care for the poor.',
    patronage: 'Hospital administrators, reformers',
    prayer: 'St. Basil, you dedicated your life to serving the poor and defending the true faith. Pray for us that we may have courage to stand for truth and compassion for those in need. Amen.',
  },
  '01-26': {
    name: 'Saints Timothy and Titus',
    feast: 'Memorial of Ss. Timothy and Titus',
    story: 'Timothy and Titus were close companions of St. Paul. Timothy became the first bishop of Ephesus, and Titus served as bishop of Crete. They are models of faithful discipleship and pastoral leadership.',
    patronage: 'Stomach disorders (Timothy), Crete (Titus)',
    prayer: 'Lord, you called Timothy and Titus to be companions of St. Paul and to serve your Church as bishops. Help us to answer your call in our own lives with faithfulness and courage. Amen.',
  },
  '01-31': {
    name: 'Saint John Bosco',
    feast: 'Memorial of St. John Bosco',
    story: 'St. John Bosco dedicated his life to educating and caring for poor and abandoned youth. He founded the Salesians to continue this work. He is known for his gentle approach and love for young people.',
    patronage: 'Youth, apprentices, editors',
    prayer: 'St. John Bosco, father and teacher of the young, pray for us that we may have your same love for young people and dedication to their formation. Help us to guide others with patience and joy. Amen.',
  },
  '02-02': {
    name: 'The Presentation of the Lord',
    feast: 'Feast of the Presentation of the Lord',
    story: 'This feast commemorates Mary and Joseph presenting Jesus in the Temple, where Simeon and Anna recognized him as the Messiah. It celebrates Christ as the Light of the World.',
    patronage: 'Candles, those who are blind',
    prayer: 'Almighty ever-living God, we humbly pray that, just as your Only Begotten Son was presented in the Temple, we may be presented to you with purified souls. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, one God, for ever and ever. Amen.',
  },
  '02-03': {
    name: 'Saint Blaise',
    feast: 'Memorial of St. Blaise',
    story: 'St. Blaise was a bishop and martyr known for healing. Tradition holds that he saved a boy choking on a fish bone, leading to the blessing of throats on his feast day.',
    patronage: 'Throat illnesses, animals, wool workers',
    prayer: 'St. Blaise, bishop and martyr, pray for us that we may be healed from all illness and that our voices may always proclaim the glory of God. Amen.',
  },
  '02-14': {
    name: 'Saints Cyril and Methodius',
    feast: 'Memorial of Ss. Cyril and Methodius',
    story: 'These brothers were missionaries to the Slavic peoples. They created the Glagolitic alphabet and translated the Scriptures into Slavonic, making them patrons of ecumenism and those who work for Christian unity.',
    patronage: 'Europe, ecumenism, missionaries',
    prayer: 'Sts. Cyril and Methodius, you brought the Gospel to new lands and created new ways to share God\'s word. Pray for all missionaries and for the unity of all Christians. Amen.',
  },
  '02-22': {
    name: 'The Chair of Saint Peter',
    feast: 'Feast of the Chair of St. Peter',
    story: 'This feast celebrates the unity of the Church founded on St. Peter, the first Pope. It honors Peter\'s authority and the apostolic succession that continues in the Pope today.',
    patronage: 'The Papacy, the Vatican',
    prayer: 'Lord, you built your Church on the faith of Peter. Grant that we may be united in faith with Peter\'s successor and remain faithful to the teachings you have entrusted to your Church. Amen.',
  },
  '03-19': {
    name: 'Saint Joseph',
    feast: 'Solemnity of St. Joseph',
    story: 'St. Joseph was the foster father of Jesus and the husband of Mary. He is a model of fatherhood, work, and trusting in God\'s will. He protected Mary and Jesus in Egypt and Nazareth.',
    patronage: 'Fathers, workers, the dying, immigrants',
    prayer: 'St. Joseph, guardian of Jesus and chaste husband of Mary, you passed your life in loving fulfillment of duty. Help us to be faithful to our vocation and to trust in God\'s providence. Amen.',
  },
  '03-24': {
    name: 'Saint Oscar Romero',
    feast: 'Memorial of St. Oscar Romero',
    story: 'St. Oscar Romero was Archbishop of San Salvador who spoke out for the poor and oppressed. He was martyred while celebrating Mass in 1980. He is a witness to the Church\'s preferential option for the poor.',
    patronage: 'El Salvador, justice, human rights',
    prayer: 'St. Oscar Romero, you gave your life defending the poor and speaking truth to power. Pray for us that we may have your courage to work for justice and peace in our world. Amen.',
  },
  '03-25': {
    name: 'The Annunciation of the Lord',
    feast: 'Solemnity of the Annunciation',
    story: 'The angel Gabriel announced to Mary that she would conceive and bear the Son of God. Mary\'s "yes" changed history forever, showing us how to respond to God\'s call with faith and trust.',
    patronage: 'The unborn, pregnancies',
    prayer: 'The Angel of the Lord declared unto Mary, and she conceived by the Holy Spirit. Hail Mary... Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
  },
  '04-02': {
    name: 'Saint Francis of Paola',
    feast: 'Memorial of St. Francis of Paola',
    story: 'St. Francis of Paola was a hermit and founder of the Minim Friars. He was known for his holiness, miracles, and commitment to penance. He advised kings and popes while living a simple life.',
    patronage: 'Sailors, travelers',
    prayer: 'St. Francis of Paola, you showed that holiness comes through humility and simplicity. Pray for us that we may grow in these virtues and trust completely in God\'s providence. Amen.',
  },
  '04-23': {
    name: 'Saint George',
    feast: 'Memorial of St. George',
    story: 'St. George was a soldier-martyr who courageously confessed Christ even under torture. The story of St. George and the dragon symbolizes the victory of faith over evil.',
    patronage: 'Soldiers, England, Boy Scouts',
    prayer: 'St. George, brave martyr, you remained faithful to Christ even to death. Pray for us that we may have your courage in facing the dragons of sin and temptation in our lives. Amen.',
  },
  '05-01': {
    name: 'Saint Joseph the Worker',
    feast: 'Feast of St. Joseph the Worker',
    story: 'This feast celebrates St. Joseph\'s dignity as a carpenter and worker. It honors the value of human labor and the holiness of ordinary work done for God\'s glory.',
    patronage: 'Workers, craftsmen, laborers',
    prayer: 'St. Joseph, you worked with your hands to provide for the Holy Family. Help us to see our work as a way to serve God and our neighbors, and to find dignity in all honest labor. Amen.',
  },
  '06-13': {
    name: 'Saint Anthony of Padua',
    feast: 'Memorial of St. Anthony of Padua',
    story: 'St. Anthony was a Franciscan preacher and miracle worker. He is known as the "wonder-worker" and is invoked to find lost items. He was a brilliant theologian and eloquent preacher.',
    patronage: 'Lost items, poor people, travelers',
    prayer: 'St. Anthony, you found all things in Christ and helped others find their way to Him. Pray for us that we may find what we truly seek - God\'s love and grace. Amen.',
  },
  '06-24': {
    name: 'The Nativity of Saint John the Baptist',
    feast: 'Solemnity of the Nativity of St. John the Baptist',
    story: 'John the Baptist was the forerunner of Christ, born to prepare the way for the Messiah. He preached repentance and baptized Jesus in the Jordan River.',
    patronage: 'Baptism, converts, road workers',
    prayer: 'St. John the Baptist, you pointed the way to Christ with your life and words. Help us to prepare the way for Jesus in our own hearts and in the hearts of others. Amen.',
  },
  '06-29': {
    name: 'Saints Peter and Paul',
    feast: 'Solemnity of Ss. Peter and Paul',
    story: 'Peter, the first Pope, and Paul, the Apostle to the Gentiles, both martyred in Rome, are the great pillars of the Church. Peter founded the Church in Rome, and Paul spread the Gospel to the world.',
    patronage: 'Rome, the Papacy',
    prayer: 'Lord, you gave us Peter and Paul as pillars of your Church. Through their intercession, may we be strengthened in faith and united in love. Amen.',
  },
  '07-01': {
    name: 'Saint Junípero Serra',
    feast: 'Memorial of St. Junípero Serra',
    story: 'St. Junípero Serra was a Franciscan missionary who founded many missions in California. He traveled extensively to bring the Gospel to indigenous peoples.',
    patronage: 'California, vocations',
    prayer: 'St. Junípero Serra, you dedicated your life to sharing the Gospel with new peoples. Pray for missionaries and for the success of evangelization efforts. Amen.',
  },
  '07-22': {
    name: 'Saint Mary Magdalene',
    feast: 'Memorial of St. Mary Magdalene',
    story: 'St. Mary Magdalene was the first witness to the Resurrection. She was a devoted follower of Jesus, from whom he cast out seven demons. She is called "Apostle to the Apostles."',
    patronage: 'Penitent sinners, women, pharmacists',
    prayer: 'St. Mary Magdalene, you witnessed the risen Christ and announced the resurrection to the apostles. Help us to be witnesses to Christ\'s resurrection in our world today. Amen.',
  },
  '07-25': {
    name: 'Saint James the Apostle',
    feast: 'Memorial of St. James',
    story: 'St. James was one of the twelve apostles and, with Peter and John, witnessed the Transfiguration. He was the first apostle martyred, and is patron of Spain.',
    patronage: 'Spain, pilgrims, laborers',
    prayer: 'St. James, apostle and martyr, you left everything to follow Jesus. Help us to respond generously to Christ\'s call and to be faithful witnesses to the Gospel. Amen.',
  },
  '07-26': {
    name: 'Saints Joachim and Anne',
    feast: 'Memorial of Ss. Joachim and Anne',
    story: 'Joachim and Anne are the parents of the Blessed Virgin Mary. They are honored as models of faithful parents who raised their daughter in devotion to God.',
    patronage: 'Grandparents, parents, married couples',
    prayer: 'Sts. Joachim and Anne, you raised Mary in faith and love. Pray for all parents and grandparents that they may nurture their children in the faith. Amen.',
  },
  '08-06': {
    name: 'The Transfiguration of the Lord',
    feast: 'Feast of the Transfiguration',
    story: 'Jesus revealed His divine glory to Peter, James, and John on Mount Tabor. This event gave the apostles a glimpse of Christ\'s divine nature to strengthen them for the coming passion.',
    patronage: 'Mountains, those seeking clarity',
    prayer: 'Lord Jesus Christ, who revealed your glory on the mountain, grant that we may always seek your light and be transformed by your presence. Amen.',
  },
  '08-08': {
    name: 'Saint Dominic',
    feast: 'Memorial of St. Dominic',
    story: 'St. Dominic founded the Order of Preachers (Dominicans) to combat heresy through preaching and education. He was known for his holiness, preaching, and devotion to the Rosary.',
    patronage: 'Astronomers, the Dominican Order',
    prayer: 'St. Dominic, you preached the truth with love and wisdom. Pray for us that we may be faithful witnesses to the Gospel and seekers of God\'s truth. Amen.',
  },
  '08-11': {
    name: 'Saint Clare of Assisi',
    feast: 'Memorial of St. Clare of Assisi',
    story: 'St. Clare was a follower of St. Francis who founded the Poor Clares. She lived a life of radical poverty and prayer, and once saved her convent from attack by holding up the Blessed Sacrament.',
    patronage: 'Television, eye diseases, laundry',
    prayer: 'St. Clare, you embraced poverty and contemplation with joy. Help us to find God in simplicity and to be people of prayer in a busy world. Amen.',
  },
  '08-15': {
    name: 'The Assumption of the Blessed Virgin Mary',
    feast: 'Solemnity of the Assumption',
    story: 'The Blessed Virgin Mary was taken body and soul into heavenly glory at the end of her earthly life. This feast celebrates her complete redemption and the hope of our own resurrection.',
    patronage: 'The dying, France, gardeners',
    prayer: 'Almighty God, you raised the Virgin Mary to the glory of heaven. Grant that we may always be united with her on earth and share in her glory in heaven. Amen.',
  },
  '08-24': {
    name: 'Saint Bartholomew',
    feast: 'Memorial of St. Bartholomew (Nathanael)',
    story: 'St. Bartholomew (Nathanael) was one of the twelve apostles known for his honesty and simplicity. Jesus said of him, "Here is a true Israelite in whom there is no deceit."',
    patronage: 'Armenia, plasterers, butchers',
    prayer: 'St. Bartholomew, apostle of Christ, you preached the Gospel even to martyrdom. Help us to be honest followers of Jesus and to share the faith with courage. Amen.',
  },
  '08-28': {
    name: 'Saint Augustine',
    feast: 'Memorial of St. Augustine',
    story: 'St. Augustine was a great bishop, theologian, and Doctor of the Church. After a sinful youth, his conversion is a model of God\'s mercy. His writings continue to guide the Church.',
    patronage: 'Theologians, printers, brewers',
    prayer: 'St. Augustine, your heart was restless until it rested in God. Pray for us that we may find true peace and happiness in Christ alone. Amen.',
  },
  '09-14': {
    name: 'The Exaltation of the Holy Cross',
    feast: 'Feast of the Exaltation of the Holy Cross',
    story: 'This feast celebrates the finding of the True Cross by St. Helena and its recovery from the Persians. It honors the cross as the instrument of our salvation.',
    patronage: 'The cross, those struggling',
    prayer: 'We adore you, O Christ, and we bless you, because by your holy cross you have redeemed the world. May we never be ashamed of the cross but glory in it as our path to life. Amen.',
  },
  '09-21': {
    name: 'Saint Matthew',
    feast: 'Memorial of St. Matthew',
    story: 'St. Matthew was a tax collector who became an apostle and evangelist. He wrote the first Gospel and preached in Judea and Ethiopia before being martyred.',
    patronage: 'Accountants, bankers, tax collectors',
    prayer: 'St. Matthew, you left everything to follow Jesus. Help us to respond to Christ\'s call and to use our talents in God\'s service. Amen.',
  },
  '09-29': {
    name: 'Saints Michael, Gabriel, and Raphael',
    feast: 'Feast of the Archangels',
    story: 'Michael (who is like God) defends us, Gabriel (God\'s strength) announces God\'s plans, and Raphael (God heals) brings healing. These archangels serve God and protect humanity.',
    patronage: 'Grocers, soldiers, doctors, travelers',
    prayer: 'St. Michael, defend us in battle. St. Gabriel, announce God\'s will to us. St. Raphael, heal our wounds. All holy angels, pray for us. Amen.',
  },
  '10-04': {
    name: 'Saint Francis of Assisi',
    feast: 'Memorial of St. Francis of Assisi',
    story: 'St. Francis abandoned wealth to live in radical poverty and preach the Gospel. He founded the Franciscans and is known for his love of all creation.',
    patronage: 'Animals, environment, merchants',
    prayer: 'St. Francis, you found joy in simplicity and saw God in all creation. Help us to be good stewards of the earth and to find happiness in humble service. Amen.',
  },
  '10-18': {
    name: 'Saint Luke',
    feast: 'Memorial of St. Luke',
    story: 'St. Luke was a physician and evangelist who wrote the third Gospel and Acts. He emphasizes Jesus\' compassion for the poor, women, and outcasts.',
    patronage: 'Doctors, artists, butchers',
    prayer: 'St. Luke, you recorded Christ\'s healing love. Pray for all who care for the sick and that we may bring Christ\'s compassion to others. Amen.',
  },
  '10-28': {
    name: 'Saints Simon and Jude',
    feast: 'Memorial of Ss. Simon and Jude',
    story: 'Simon the Zealot and Jude (Thaddeus) were apostles who preached the Gospel and were martyred. Jude is invoked for lost causes (not to be confused with Judas Iscariot).',
    patronage: 'Lost causes, desperate situations',
    prayer: 'Ss. Simon and Jude, you were faithful apostles even to martyrdom. Pray for us in our desperate moments and help us trust in God\'s providence. Amen.',
  },
  '11-01': {
    name: 'All Saints',
    feast: 'Solemnity of All Saints',
    story: 'This day honors all the saints, known and unknown, who now enjoy the beatific vision in heaven. It celebrates our communion with the whole company of heaven.',
    patronage: 'All saints',
    prayer: 'All you holy saints of God, pray for us. May we one day join you in praising God forever in heaven. Amen.',
  },
  '11-02': {
    name: 'All Souls',
    feast: 'Commemoration of All the Faithful Departed',
    story: 'On this day, we pray for all the faithful departed who are being purified in Purgatory. It reminds us of our duty to pray for the dead and our hope in the resurrection.',
    patronage: 'The holy souls in Purgatory',
    prayer: 'Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace. Amen.',
  },
  '11-09': {
    name: 'The Dedication of the Lateran Basilica',
    feast: 'Feast of the Dedication of the Lateran Basilica',
    story: 'This feast honors the dedication of the cathedral of Rome, the Pope\'s cathedral as Bishop of Rome. It celebrates the unity of the Church and the importance of sacred worship spaces.',
    patronage: 'The Church, churches',
    prayer: 'Lord, you dwell in your Church and make it your holy temple. Help us to reverence your house of worship and to be living stones in your spiritual temple. Amen.',
  },
  '11-21': {
    name: 'The Presentation of the Blessed Virgin Mary',
    feast: 'Memorial of the Presentation of Mary',
    story: 'Mary was presented in the Temple by her parents, Joachim and Anne. This feast celebrates Mary\'s total dedication to God from her earliest years.',
    patronage: 'Children, women religious',
    prayer: 'Blessed Mother, you were dedicated to God from your childhood. Pray for us that we may consecrate our lives to God\'s service from our earliest days. Amen.',
  },
  '11-30': {
    name: 'Saint Andrew',
    feast: 'Feast of St. Andrew',
    story: 'St. Andrew was the first apostle called by Jesus and the brother of Peter. He preached in Greece and was crucified on an X-shaped cross, now called St. Andrew\'s Cross.',
    patronage: 'Scotland, Greece, fishermen',
    prayer: 'St. Andrew, you brought your brother Peter to Christ. Help us to be instruments of evangelization and to invite others to follow Jesus. Amen.',
  },
  '12-08': {
    name: 'The Immaculate Conception',
    feast: 'Solemnity of the Immaculate Conception',
    story: 'Mary was conceived without original sin from the first moment of her existence. This privilege prepared her to become the Mother of God.',
    patronage: 'The United States, unborn children',
    prayer: 'O God, who by the Immaculate Conception of the Blessed Virgin prepared a worthy dwelling for your Son, grant that we may be preserved from all sin. Amen.',
  },
  '12-12': {
    name: 'Our Lady of Guadalupe',
    feast: 'Feast of Our Lady of Guadalupe',
    story: 'Our Lady appeared to St. Juan Diego in 1531 in Mexico, leaving her image on his tilma. This appearance led to millions of conversions and is a symbol of Mary\'s maternal care for all peoples.',
    patronage: 'The Americas, Mexico, unborn children',
    prayer: 'Our Lady of Guadalupe, Mother of the Americas, pray for us that we may cherish all life and bring Christ to our continent. Amen.',
  },
  '12-25': {
    name: 'The Nativity of the Lord',
    feast: 'Solemnity of Christmas',
    story: 'Jesus Christ, the Son of God, was born of the Virgin Mary in Bethlehem. The Word became flesh to save us from sin and bring us into God\'s family.',
    patronage: 'All humanity',
    prayer: 'God of love, you sent your Son to be one with us in our humanity. May we celebrate his birth with joy and share his love with the world. Amen.',
  },
};

/**
 * Get Saint of the Day Tool
 * Returns saint information for a given date
 */
export const getSaintOfDayTool = createTool({
  id: 'get-saint-of-day',
  description: 'Fetch the Catholic saint of the day with their story, patronage, and related prayers',
  inputSchema: z.object({
    date: z.string().optional().describe('Date in YYYY-MM-DD format (optional, defaults to today)'),
  }),
  execute: async ({ date }) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const monthDay = targetDate.substring(5); // MM-DD format

    const saint = SAINTS_DB[monthDay];

    if (saint) {
      return {
        date: targetDate,
        ...saint,
        found: true,
      };
    }

    // Fallback for dates without saints in our database
    return {
      date: targetDate,
      name: 'Commemoration of the Saints',
      feast: 'Daily Memorial',
      story: 'Today we honor the countless saints who have gone before us, marked with the sign of faith. Their lives of virtue and devotion inspire us to holiness.',
      patronage: 'All the saints',
      prayer: 'All you holy saints of God, pray for us. May we follow your example of faith, hope, and love, and join you one day in the glory of God\'s kingdom. Amen.',
      found: true,
    };
  },
});
