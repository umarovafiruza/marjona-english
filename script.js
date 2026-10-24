/**
 * Speakline — Studio Edition (Speaking + Writing)
 * Vanilla JavaScript (No Frameworks, No Build Tools)
 */

/* ==========================================================================
   1. DATA STRUCTURE: 10 TOPICS (FOR BOTH SPEAKING & WRITING)
   ========================================================================== */

const DEFAULT_WPM = 115;
const MIN_WPM = 60;
const MAX_WPM = 200;

/**
 * 5 Real Recorded Open-Source Lofi Hip-Hop & Chillhop Tracks
 * Hosted on Internet Archive (Dusted Wax Kingdom Netlabel CC BY-NC-ND 3.0 / Jamendo)
 * with automatic fallback to OGG and Laut.fm Lofi stream.
 */
const LOFI_TRACKS = [
  {
    id: 1,
    name: "Bonjour — Centz",
    shortLabel: "1. Bonjour",
    urls: [
      "https://archive.org/download/DWK312/Centz_-_01_-_Bonjour.mp3",
      "https://archive.org/download/DWK312/Centz_-_01_-_Bonjour.ogg",
      "https://stream.laut.fm/lofi",
      "audio/lofi.mp3"
    ]
  },
  {
    id: 2,
    name: "London Underground — Centz",
    shortLabel: "2. London",
    urls: [
      "https://archive.org/download/DWK312/Centz_-_03_-_The_London_Underground.mp3",
      "https://archive.org/download/DWK312/Centz_-_03_-_The_London_Underground.ogg",
      "https://stream.laut.fm/lofi"
    ]
  },
  {
    id: 3,
    name: "Puddles — Centz",
    shortLabel: "3. Puddles",
    urls: [
      "https://archive.org/download/DWK312/Centz_-_09_-_Puddles.mp3",
      "https://archive.org/download/DWK312/Centz_-_09_-_Puddles.ogg",
      "https://stream.laut.fm/lofi"
    ]
  },
  {
    id: 4,
    name: "Memory Box — Centz",
    shortLabel: "4. Memory",
    urls: [
      "https://archive.org/download/DWK312/Centz_-_10_-_Memory_Box.mp3",
      "https://archive.org/download/DWK312/Centz_-_10_-_Memory_Box.ogg",
      "https://stream.laut.fm/lofi"
    ]
  },
  {
    id: 5,
    name: "Slow Hands — Centz",
    shortLabel: "5. Slow Hands",
    urls: [
      "https://archive.org/download/DWK312/Centz_-_11_-_Slow_Hands.mp3",
      "https://archive.org/download/DWK312/Centz_-_11_-_Slow_Hands.ogg",
      "https://stream.laut.fm/lofi"
    ]
  }
];

const TOPICS = [
  {
    id: 1,
    title: "Introducing Yourself",
    defaultLevel: "A1",
    levels: {
      A1: "Hello! My name is Sara. I am twenty-two years old, and I live in a small house with my family. I have one brother and one sister. Every morning, I wake up early and drink a cup of warm tea. I am a student, and I study English every day. I like reading short books and listening to soft music. On weekends, I walk in the park with my best friend. People say I am a kind and friendly person. I want to speak English well and meet new people.",
      A2: "Hello, my name is Sara, and I am happy to meet you today. I grew up in a small town, but now I live in the city for my studies. Living here is very interesting because there are many parks and cafes. During the week, I go to classes in the morning and study at the library in the afternoon. In my free time, I enjoy cooking simple food and watching movies in English. I practice speaking every day so I can talk easily with new friends.",
      B1: "Hello, my name is Sara, and I am glad to introduce myself today. Three years ago, I moved from a quiet village to a larger city to begin my work. At first, the busy streets felt strange to me, but now I really enjoy life here. On weekdays, I work with a friendly team at a local office near the center. In the evenings, I like learning foreign languages and taking long walks outside. Speaking English clearly helps me share my ideas with people from many countries."
    },
    questions: [
      "How would you describe your personality to someone you meet for the first time?",
      "Where did you grow up, and what is one special thing about your hometown?",
      "Why are you practicing English, and how do you plan to use it in your life?"
    ],
    targetWords: ["grow up", "free time", "curious", "practicing", "express"],
    writingPrompt: "Write a short introduction about yourself, your background, and what inspires you every day."
  },
  {
    id: 2,
    title: "Daily Routine",
    defaultLevel: "A1",
    levels: {
      A1: "Every day, I wake up at seven o'clock in the morning. First, I wash my face and brush my teeth. Then I go to the kitchen and eat breakfast with my family. I usually eat bread, butter, and one egg, and I drink hot coffee. At eight o'clock, I take the bus to school. I study until two o'clock in the afternoon. When I come home, I rest for one hour and do my homework. At night, we eat dinner together, and I go to bed at ten.",
      A2: "My day usually starts at six thirty when the sun comes up. I drink a glass of water first and then make a simple breakfast in the kitchen. After breakfast, I walk fifteen minutes to the bus stop and listen to calm music on the way. At work, I check my messages and finish my main tasks before lunch. In the afternoon, I take a short walk outside to get fresh air. In the evening, I cook dinner, read a book for twenty minutes, and sleep early.",
      B1: "Keeping a calm morning routine helps me feel ready for the whole day. I wake up at six thirty without looking at my phone right away. After a warm shower, I prepare black coffee and toast with eggs in a quiet kitchen. Walking twenty minutes to the train station gives me time to organize my plans for the day. When I return home in the evening, I prefer cooking a light meal and reading a chapter of a novel before going to sleep."
    },
    questions: [
      "What time do you usually wake up and what is the first thing you do in the morning?",
      "Which part of your daily routine helps you relax and feel at peace the most?",
      "What is one daily habit you would like to change or build in the future?"
    ],
    targetWords: ["wake up", "organize", "productive", "healthy habit", "unwind"],
    writingPrompt: "Describe your ideal daily routine from morning to night and explain why it keeps you balanced."
  },
  {
    id: 3,
    title: "Food and Restaurants",
    defaultLevel: "A1",
    levels: {
      A1: "I love good food, and my favorite meal of the day is dinner. At home, my mother and I cook together in our kitchen. We like making warm soup, rice, and fresh green salad. I also like fruit, especially sweet apples and bananas. On Saturday evening, my friends and I sometimes go to a small cafe near our street. I always order chicken pasta and a glass of lemon water. The food is delicious and not expensive. Eating with friends makes me very happy.",
      A2: "During the week, I usually cook my meals at home because it is healthy and cheap. I like buying fresh tomatoes, onions, and green herbs from the local market. My favorite dish to cook on Friday night is warm pasta with cheese and olive oil. On weekends, I enjoy going to a quiet restaurant with my friends. We sit near the window, talk about our week, and try new dishes together. A simple meal always tastes better when you share it with good friends.",
      B1: "Although I enjoy visiting small restaurants on weekends, I still prefer cooking most of my meals in my own kitchen. Preparing food at home allows me to choose fresh vegetables and healthy ingredients every day. When I go out with friends, we usually pick a quiet family place where we can talk comfortably for hours. I always try to order at least one dish that I have never tasted before. For me, the best part of any dinner is sharing stories around the table."
    },
    questions: [
      "What is your absolute favorite meal to eat, and do you prefer cooking it or eating out?",
      "Can you describe a memorable dinner you had with your family or close friends?",
      "Have you ever tried an unusual or foreign dish? How did it taste?"
    ],
    targetWords: ["favorite dish", "ingredients", "delicious", "atmosphere", "homemade"],
    writingPrompt: "Write about your favorite dish, how it is prepared, and why sharing food brings people together."
  },
  {
    id: 4,
    title: "Travel and Directions",
    defaultLevel: "A1",
    levels: {
      A1: "I like traveling to new cities by train in the summer. When I arrive at the station, I walk outside and look at the streets. I carry a small bag and a city map in my hand. Sometimes I do not know where the museum or the park is. Then I smile and ask a person on the street for help. People are very nice and show me the right way. I walk straight, turn left at the corner, and find the place easily.",
      A2: "Whenever I visit a new city, I prefer walking on foot instead of taking a bus or taxi. Walking slowly lets me see small shops, old buildings, and quiet parks. Sometimes I get lost when the streets are new and unfamiliar to me. When that happens, I politely ask a local person how to reach the main square or train station. Most people are happy to point the way. Walking around a new place is always an exciting adventure for me.",
      B1: "Exploring a new city on foot is my favorite way to travel and learn about local life. Walking through quiet neighborhoods helps me notice small bakeries and peaceful squares that tourists often miss. Even though I have a map on my phone, I still ask local people for directions when the streets cross in confusing ways. Most strangers are very kind and take a moment to explain the route clearly. Getting lost no longer makes me nervous because I always discover something interesting."
    },
    questions: [
      "Do you enjoy exploring a new city on foot, by bicycle, or using public transport?",
      "What do you do when you get lost in an unfamiliar place?",
      "Which city or country would you love to travel to next and why?"
    ],
    targetWords: ["explore", "unfamiliar", "breathtaking", "directions", "adventure"],
    writingPrompt: "Describe a travel destination you love or wish to visit, highlighting what makes it special."
  },
  {
    id: 5,
    title: "Work and Career",
    defaultLevel: "A2",
    levels: {
      A1: "I work at a small office in the center of town. My job starts at nine in the morning and finishes at five. I work with four nice people in my room. Every morning, we say hello and drink coffee together. I use a computer to write emails and help customers on the phone. At one o'clock, we go to a small kitchen and eat lunch together. My job is sometimes busy, but my team is always helpful and kind to me.",
      A2: "I have worked at a local company for two years, and I really like my team. Every morning, we have a short ten-minute meeting to talk about our plan for the day. My main job is answering client questions and preparing simple reports on my computer. When a task is difficult, my coworkers are always ready to help me. I want to improve my English speaking skills so I can talk with international clients confidently in the future.",
      B1: "Over the last few years, my idea of a good job has changed a lot. When I finished school, I thought a high salary was the only thing that mattered. Now I know that friendly coworkers, daily balance, and useful work are much more important for happiness. At my current workplace, we support each other whenever deadlines are close. Learning new skills and solving problems together gives me a real sense of pride at the end of every week."
    },
    questions: [
      "What kind of work or career gives you the greatest sense of purpose and pride?",
      "How do you handle difficult tasks and tight deadlines when working with others?",
      "What new skills would you like to develop to achieve your career dreams?"
    ],
    targetWords: ["career", "teamwork", "deadline", "opportunity", "achieve"],
    writingPrompt: "Write about your current or dream career and the most important qualities of a good team."
  },
  {
    id: 6,
    title: "Hobbies and Free Time",
    defaultLevel: "A2",
    levels: {
      A1: "In my free time, I like doing quiet and simple things. After school or work, I often listen to soft music in my room. On sunny days, I ride my bicycle in the green park near my home. I also like taking photos of flowers, trees, and clouds with my phone. On rainy evenings, I stay inside and draw pictures or watch a funny movie with my sister. Having free time helps me relax and feel happy every week.",
      A2: "Having a relaxing hobby is the best way to rest after a busy day. Last year, I started taking photos in the park on Saturday mornings. I do not have an expensive camera, so I just use a simple old camera and look for nice morning light. When it rains outside, I stay at home, drink hot tea, and listen to calm music by the window. Spending time on a quiet hobby makes my mind feel fresh and peaceful.",
      B1: "Spending time on a quiet hobby outside of work helps me rest my mind after a long day. A year ago, I bought a second-hand camera and began taking photographs on weekend mornings. I focus on simple scenes like rain on windows, morning sunlight, and quiet streets. Looking through the lens teaches me to slow down and notice small details around me. On rainy evenings indoors, I also enjoy playing acoustic guitar instead of looking at my phone screen."
    },
    questions: [
      "What is your favorite hobby to do on a quiet weekend or rainy evening?",
      "How does spending time on creative activities help you clear your mind?",
      "Is there a new hobby or creative skill you have always wanted to learn?"
    ],
    targetWords: ["hobby", "relaxing", "creativity", "passion", "peaceful"],
    writingPrompt: "Explain how you enjoy your free time and why having a relaxing hobby is essential for your well-being."
  },
  {
    id: 7,
    title: "Technology",
    defaultLevel: "A2",
    levels: {
      A1: "I use my phone and computer every day. My phone is small, but it helps me do many things. In the morning, it wakes me up at seven o'clock. During the day, I send text messages to my family and call my friends. In the evening, I watch short English videos on my computer to learn new words. However, I do not use my phone late at night. I put it on my desk at nine o'clock so I can sleep well.",
      A2: "Modern technology makes our daily life much easier and faster. With a smartphone in my pocket, I can talk to friends in other cities, check the bus time, and study English anywhere. I use a simple notebook app every day to write down my tasks and new words. Still, I try not to look at screens all evening. After eight o'clock, I turn off my phone notifications and spend quiet time talking with my family.",
      B1: "Modern technology makes everyday life much easier, even if the world sometimes feels too fast. With a small device in my pocket, I can speak to friends across the ocean, read daily news, and practice foreign languages anywhere. At the same time, I set clear limits so that screens do not take over my evenings. Turning off notifications after eight o'clock allows me to enjoy quiet conversations and get a good night of rest."
    },
    questions: [
      "Which device or mobile app do you find most helpful in your daily life?",
      "How do you maintain a healthy balance so screens and notifications do not distract you?",
      "In what ways has technology made learning English easier and more fun for you?"
    ],
    targetWords: ["technology", "device", "convenient", "distraction", "balance"],
    writingPrompt: "Discuss both the benefits and challenges of modern technology in your daily study and life."
  },
  {
    id: 8,
    title: "Health and Fitness",
    defaultLevel: "B1",
    levels: {
      A1: "I want to be healthy and strong every day. I do not go to a big gym, but I walk in the park every morning for thirty minutes. The fresh air feels very good. I also drink six glasses of water during the day and eat fresh fruit like apples and oranges. I try not to eat too much sugar or fast food. Every night, I go to bed early and sleep for eight hours so I wake up happy.",
      A2: "Staying healthy does not mean you have to spend hours in a gym every day. Small daily habits are much easier to keep for a long time. Three times a week, I go for a fast walk or a slow run in the park near my house. I also drink plenty of water and eat warm, regular meals at home. Since I started sleeping seven or eight hours each night, I have much more energy during the day.",
      B1: "Staying healthy does not require spending hours at an expensive gym every single day. For a long time, I tried strict exercise plans, but I always stopped after a few weeks. Everything became easier when I focused on small habits that fit naturally into my day. Now I take a brisk thirty-minute walk in the park three mornings a week and sleep at least seven hours each night. These simple habits give me steady energy all week."
    },
    questions: [
      "What simple physical exercises or morning walks keep your body energetic?",
      "How does getting enough sleep and drinking clean water change your mood during the day?",
      "What is one small healthy habit that has made a big difference in your health?"
    ],
    targetWords: ["healthy", "exercise", "energetic", "consistency", "well-being"],
    writingPrompt: "Write about small daily habits that help keep your body and mind healthy and active."
  },
  {
    id: 9,
    title: "Shopping",
    defaultLevel: "B1",
    levels: {
      A1: "On Saturday morning, I go shopping with my mother at the market near our house. First, we write a short list of things we need on paper. We buy fresh bread, milk, cheese, apples, and green vegetables. I carry the shopping bag for my mother. Sometimes I also go to a clothes shop to buy a warm shirt or new shoes. I always check the price first because I like saving my money for important things.",
      A2: "The way I buy clothes and daily items has changed a lot. In the past, I often bought cheap clothes just because they were on sale, and then I never wore them. Now I always make a shopping list before I go to the store. When I need a new jacket or a pair of shoes, I choose comfortable and simple things that last a long time. Buying fewer items helps me save money and keep my room tidy.",
      B1: "The way I shop for clothes and everyday items is very different from how I shopped five years ago. In the past, I often bought things on impulse just because they were on sale in a shop window. Most of those items stayed in the back of my closet. Today, I wait a few days before buying anything that is not on my list. Choosing comfortable pieces that last for years saves money and keeps my home simple."
    },
    questions: [
      "Do you prefer shopping for groceries at a local market or in a modern supermarket?",
      "How do you decide whether an item is worth buying or just a temporary desire?",
      "What was the most useful or durable item you have bought recently?"
    ],
    targetWords: ["shopping list", "comfortable", "quality", "saving money", "decision"],
    writingPrompt: "Describe your shopping habits and how planning ahead helps you avoid impulse purchases."
  },
  {
    id: 10,
    title: "Dreams and Goals",
    defaultLevel: "B1",
    levels: {
      A1: "I have simple dreams for my future. First, I want to speak English clearly and easily with people from other countries. Every day, I read aloud for ten minutes and learn five new words. Second, I want to travel to a beautiful city near the sea next summer. I also save a little money every month because I want to buy a new laptop for my studies. Step by step, I know my dreams will come true.",
      A2: "When I think about the next few years, I have two main goals. My first goal is to speak English smoothly so I can travel and work in new places without fear. My second goal is to rent a bright, quiet apartment with a small balcony and green plants. Big goals can take time, so I focus on doing a little bit of work every single day. Practicing today brings me closer to a better future.",
      B1: "When I think about the next five years, my biggest goal is to grow into a confident and independent person. First, I want to speak English naturally so I can travel and work in different countries comfortably. I am also saving part of my income each month to rent a bright apartment with a balcony and shelves full of books. Practicing a little bit every single day is the surest way to turn quiet hopes into reality."
    },
    questions: [
      "What is your biggest personal or professional goal for the next two years?",
      "How will speaking fluent English change your opportunities and friendships?",
      "What daily steps are you taking right now to bring your dreams into reality?"
    ],
    targetWords: ["dream", "goal", "confident", "step by step", "future"],
    writingPrompt: "Write about your main goals for the upcoming years and the steps you are taking to achieve them."
  }
];

const TOPIC_VOCABULARY = {
  1: {
    A1: [{ word: "introduce", uz: "tanishtirmoq" }, { word: "student", uz: "talaba, o'quvchi" }, { word: "warm tea", uz: "iliq choy" }, { word: "friendly", uz: "do'stona, samimiy" }, { word: "kind person", uz: "mehribon, oqko'ngil inson" }],
    A2: [{ word: "grew up", uz: "katta bo'lganman, ulg'ayganman" }, { word: "studies", uz: "o'qish, tahsil" }, { word: "library", uz: "kutubxona" }, { word: "enjoy", uz: "zavqlanmoq, yoqtirmoq" }, { word: "easily", uz: "osongina" }],
    B1: [{ word: "glad", uz: "xursand, mamnun" }, { word: "village", uz: "qishloq" }, { word: "strange", uz: "g'alati, notanish" }, { word: "local office", uz: "mahalliy idora" }, { word: "foreign languages", uz: "chet tillari" }]
  },
  2: {
    A1: [{ word: "wake up", uz: "uyg'onmoq" }, { word: "wash face", uz: "yuzni yuvmoq" }, { word: "brush teeth", uz: "tishlarni tozalash" }, { word: "usually", uz: "odatda" }, { word: "homework", uz: "uy vazifasi" }],
    A2: [{ word: "sun comes up", uz: "quyosh chiqadi" }, { word: "calm music", uz: "sokin musiqa" }, { word: "main tasks", uz: "asosiy vazifalar" }, { word: "fresh air", uz: "toza havo" }, { word: "simple", uz: "oddiy" }],
    B1: [{ word: "calm routine", uz: "osoyishta kun tartibi" }, { word: "right away", uz: "darhol" }, { word: "prepare", uz: "tayyorlamoq" }, { word: "organize plans", uz: "rejalarni tartibga solmoq" }, { word: "chapter", uz: "bob (kitob bobi)" }]
  },
  3: {
    A1: [{ word: "favorite meal", uz: "sevimli taom" }, { word: "delicious", uz: "juda mazali" }, { word: "not expensive", uz: "arzon" }, { word: "soup", uz: "sho'rva" }, { word: "order", uz: "buyurtma bermoq" }],
    A2: [{ word: "healthy", uz: "foydali, sog'lom" }, { word: "green herbs", uz: "yangi ko'katlar" }, { word: "local market", uz: "mahalliy bozor" }, { word: "olive oil", uz: "zaytun moyi" }, { word: "share", uz: "baham ko'rmoq" }],
    B1: [{ word: "prefer cooking", uz: "pishirishni afzal ko'rmoq" }, { word: "ingredients", uz: "masalliqlar" }, { word: "comfortably", uz: "qulay, bemalol" }, { word: "never tasted", uz: "tatib ko'rmagan" }, { word: "sharing stories", uz: "suhbatlashish" }]
  },
  4: {
    A1: [{ word: "traveling", uz: "sayohat qilish" }, { word: "carry a bag", uz: "sumka ko'tarmoq" }, { word: "city map", uz: "shahar xaritasi" }, { word: "turn left", uz: "chapga burilmoq" }, { word: "find easily", uz: "oson topmoq" }],
    A2: [{ word: "on foot", uz: "piyoda" }, { word: "unfamiliar", uz: "notanish, begona" }, { word: "politely ask", uz: "muloyim so'ramoq" }, { word: "main square", uz: "bosh maydon" }, { word: "exciting adventure", uz: "qiziqarli sarguzasht" }],
    B1: [{ word: "exploring", uz: "kashf etish" }, { word: "neighborhoods", uz: "mahallalar" }, { word: "bakeries", uz: "novvoyxonalar" }, { word: "confusing", uz: "chalkash" }, { word: "discover", uz: "topmoq, kashf etmoq" }]
  },
  5: {
    A1: [{ word: "office", uz: "idora, ofis" }, { word: "customers", uz: "mijozlar" }, { word: "sometimes", uz: "ba'zan" }, { word: "team", uz: "jamoa" }, { word: "helpful and kind", uz: "yordamsevar va mehribon" }],
    A2: [{ word: "meeting", uz: "yig'ilish, majlis" }, { word: "reports", uz: "hisobotlar" }, { word: "coworkers", uz: "hamkasblar" }, { word: "confidently", uz: "ishonch bilan" }, { word: "future", uz: "kelajak" }],
    B1: [{ word: "salary", uz: "maosh, oylik" }, { word: "daily balance", uz: "kunlik muvozanat" }, { word: "deadlines", uz: "topshirish muddati" }, { word: "support each other", uz: "bir-birini qo'llamoq" }, { word: "sense of pride", uz: "faxrlanish hissi" }]
  },
  6: {
    A1: [{ word: "quiet", uz: "tinch, sokin" }, { word: "clouds", uz: "bulutlar" }, { word: "funny movie", uz: "kulgili kino" }, { word: "relax", uz: "dam olmoq" }, { word: "sunny days", uz: "quyoshli kunlar" }],
    A2: [{ word: "relaxing hobby", uz: "orom beruvchi mashg'ulot" }, { word: "expensive", uz: "qimmatbaho" }, { word: "morning light", uz: "tonggi yorug'lik" }, { word: "fresh and peaceful", uz: "tetik va osoyishta" }, { word: "mind", uz: "zehn, aql" }],
    B1: [{ word: "second-hand", uz: "ishlatilgan" }, { word: "scenes", uz: "manzaralar" }, { word: "slow down", uz: "shoshilmaslik" }, { word: "notice details", uz: "tafsilotlarni payqamoq" }, { word: "acoustic guitar", uz: "akustik gitara" }]
  },
  7: {
    A1: [{ word: "small", uz: "kichik, ixcham" }, { word: "wakes me up", uz: "meni uyg'otadi" }, { word: "text messages", uz: "xabarlar" }, { word: "late at night", uz: "tunda kech" }, { word: "sleep well", uz: "yaxshi uxlamoq" }],
    A2: [{ word: "modern technology", uz: "zamonaviy texnologiya" }, { word: "pocket", uz: "cho'ntak" }, { word: "notebook app", uz: "yondaftar ilovasi" }, { word: "notifications", uz: "bildirishnomalar" }, { word: "spend time", uz: "vaqt o'tkazmoq" }],
    B1: [{ word: "small device", uz: "kichik qurilma" }, { word: "across the ocean", uz: "ummon ortidagi" }, { word: "clear limits", uz: "aniq me'yorlar" }, { word: "take over", uz: "egallab olmoq" }, { word: "rest", uz: "orom, hordiq" }]
  },
  8: {
    A1: [{ word: "healthy and strong", uz: "sog'lom va baquvvat" }, { word: "fresh air", uz: "toza havo" }, { word: "fast food", uz: "tez tayyor taom" }, { word: "glasses of water", uz: "stakan suv" }, { word: "early", uz: "vaqtli" }],
    A2: [{ word: "daily habits", uz: "kunlik odatlar" }, { word: "spend hours", uz: "soatlab vaqt sarflamoq" }, { word: "fast walk", uz: "tez yurish" }, { word: "regular meals", uz: "o'z vaqtida ovqatlanish" }, { word: "steady energy", uz: "bir maromdagi quvvat" }],
    B1: [{ word: "require", uz: "talab qilmoq" }, { word: "strict plans", uz: "qat'iy rejalar" }, { word: "fit naturally", uz: "tabiiy singib ketmoq" }, { word: "brisk walk", uz: "shaxdam qadamlar" }, { word: "focused", uz: "diqqatni qaratgan" }]
  },
  9: {
    A1: [{ word: "shopping list", uz: "xaridlar ro'yxati" }, { word: "clothes shop", uz: "kiyim do'koni" }, { word: "check the price", uz: "narxni bilish" }, { word: "saving money", uz: "pulni tejash" }, { word: "important things", uz: "muhim narsalar" }],
    A2: [{ word: "on sale", uz: "chegirmada" }, { word: "never wore", uz: "hech kiymagan" }, { word: "comfortable", uz: "qulay" }, { word: "last a long time", uz: "uzoq vaqtga yetadi" }, { word: "tidy room", uz: "ozoda xona" }],
    B1: [{ word: "on impulse", uz: "hisga berilib" }, { word: "shop window", uz: "do'kon vitrinasi" }, { word: "closet", uz: "kiyim javoni" }, { word: "pieces", uz: "kiyimlar" }, { word: "different from", uz: "farqli" }]
  },
  10: {
    A1: [{ word: "simple dreams", uz: "oddiy orzular" }, { word: "read aloud", uz: "ovoz chiqarib o'qimoq" }, { word: "near the sea", uz: "dengiz bo'yida" }, { word: "laptop", uz: "noutbuk" }, { word: "come true", uz: "amalga oshmoq" }],
    A2: [{ word: "speak smoothly", uz: "ravon gapirmoq" }, { word: "without fear", uz: "qo'rqmasdan" }, { word: "rent an apartment", uz: "uy ijaraga olmoq" }, { word: "balcony", uz: "balkon" }, { word: "step by step", uz: "qadamma-qadam" }],
    B1: [{ word: "independent person", uz: "mustaqil inson" }, { word: "saving income", uz: "daromaddan tejash" }, { word: "shelves full of books", uz: "kitob javonlari" }, { word: "surest way", uz: "eng to'g'ri yo'l" }, { word: "turn hopes into reality", uz: "umidlarni ro'yobga chiqarish" }]
  }
};

/* ==========================================================================
   2. STORAGE MODULE (LOCALSTORAGE WRAPPER)
   ========================================================================== */

const AVATARS = {
  sprout: {
    id: "sprout",
    name: "Sprout (Maysa)",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="54" r="38" fill="#4ADE80"/>
      <ellipse cx="28" cy="22" rx="10" ry="16" transform="rotate(-25 28 22)" fill="#84CC16"/>
      <ellipse cx="72" cy="22" rx="10" ry="16" transform="rotate(25 72 22)" fill="#84CC16"/>
      <path d="M50 14 C48 6, 52 6, 50 2" stroke="#65A30D" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="50" cy="58" rx="28" ry="24" fill="#FFFFFF"/>
      <circle cx="41" cy="54" r="3.5" fill="#152718"/>
      <circle cx="59" cy="54" r="3.5" fill="#152718"/>
      <circle cx="42" cy="53" r="1.2" fill="#FFFFFF"/>
      <circle cx="60" cy="53" r="1.2" fill="#FFFFFF"/>
      <ellipse cx="34" cy="62" rx="4.5" ry="3" fill="#FDA4AF"/>
      <ellipse cx="66" cy="62" rx="4.5" ry="3" fill="#FDA4AF"/>
      <path d="M46 63 Q50 68 54 63" stroke="#152718" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  owl: {
    id: "owl",
    name: "Wise Owl (Boyqush)",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="52" r="38" fill="#10B981"/>
      <path d="M22 28 Q30 18 38 32 Z" fill="#059669"/>
      <path d="M78 28 Q70 18 62 32 Z" fill="#059669"/>
      <circle cx="36" cy="48" r="14" fill="#FFFFFF"/>
      <circle cx="64" cy="48" r="14" fill="#FFFFFF"/>
      <circle cx="36" cy="48" r="7" fill="#0F172A"/>
      <circle cx="64" cy="48" r="7" fill="#0F172A"/>
      <circle cx="34" cy="45" r="2.5" fill="#FFFFFF"/>
      <circle cx="62" cy="45" r="2.5" fill="#FFFFFF"/>
      <polygon points="50,54 44,64 56,64" fill="#F59E0B"/>
      <ellipse cx="50" cy="74" rx="18" ry="12" fill="#D1FAE5"/>
      <path d="M44 72 Q50 76 56 72" stroke="#10B981" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  fox: {
    id: "fox",
    name: "Clever Fox (Tulki)",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,18 36,44 14,46" fill="#EA580C"/>
      <polygon points="22,24 33,42 18,44" fill="#FED7AA"/>
      <polygon points="80,18 64,44 86,46" fill="#EA580C"/>
      <polygon points="78,24 67,42 82,44" fill="#FED7AA"/>
      <circle cx="50" cy="54" r="36" fill="#F97316"/>
      <path d="M20 54 Q35 78 50 78 Q65 78 80 54 Q65 64 50 64 Q35 64 20 54 Z" fill="#FFFFFF"/>
      <circle cx="36" cy="50" r="4" fill="#1C1917"/>
      <circle cx="64" cy="50" r="4" fill="#1C1917"/>
      <circle cx="35" cy="48.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="63" cy="48.5" r="1.5" fill="#FFFFFF"/>
      <ellipse cx="50" cy="68" rx="4.5" ry="3.5" fill="#1C1917"/>
      <path d="M47 70 Q50 73 53 70" stroke="#1C1917" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  panda: {
    id: "panda",
    name: "Cozy Panda",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="28" r="12" fill="#1E293B"/>
      <circle cx="76" cy="28" r="12" fill="#1E293B"/>
      <circle cx="50" cy="54" r="38" fill="#F8FAFC"/>
      <circle cx="50" cy="54" r="38" stroke="#E2E8F0" stroke-width="2"/>
      <ellipse cx="35" cy="48" rx="9" ry="12" transform="rotate(-15 35 48)" fill="#1E293B"/>
      <ellipse cx="65" cy="48" rx="9" ry="12" transform="rotate(15 65 48)" fill="#1E293B"/>
      <circle cx="35" cy="47" r="3.5" fill="#FFFFFF"/>
      <circle cx="65" cy="47" r="3.5" fill="#FFFFFF"/>
      <circle cx="34" cy="46" r="1.2" fill="#1E293B"/>
      <circle cx="64" cy="46" r="1.2" fill="#1E293B"/>
      <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#1E293B"/>
      <path d="M46 66 Q50 70 54 66" stroke="#1E293B" stroke-width="2" stroke-linecap="round" fill="none"/>
      <ellipse cx="28" cy="60" rx="4" ry="2.5" fill="#FDA4AF"/>
      <ellipse cx="72" cy="60" rx="4" ry="2.5" fill="#FDA4AF"/>
    </svg>`
  },
  astro: {
    id: "astro",
    name: "Space Explorer",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="visorGrad_astro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="50%" stop-color="#6366F1"/>
          <stop offset="100%" stop-color="#1E1B4B"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="#E2E8F0"/>
      <circle cx="50" cy="50" r="38" stroke="#94A3B8" stroke-width="3"/>
      <rect x="8" y="44" width="8" height="14" rx="4" fill="#3B82F6"/>
      <rect x="84" y="44" width="8" height="14" rx="4" fill="#3B82F6"/>
      <rect x="22" y="28" width="56" height="42" rx="18" fill="url(#visorGrad_astro)"/>
      <ellipse cx="38" cy="38" rx="10" ry="4" transform="rotate(-20 38 38)" fill="rgba(255,255,255,0.7)"/>
      <circle cx="50" cy="80" r="3" fill="#F59E0B"/>
    </svg>`
  },
  champion: {
    id: "champion",
    name: "Crown Champion",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="54" r="38" fill="#FEF08A"/>
      <circle cx="50" cy="54" r="38" stroke="#F59E0B" stroke-width="3"/>
      <path d="M26 36 L34 22 L50 32 L66 22 L74 36 Z" fill="#F59E0B"/>
      <circle cx="34" cy="20" r="3" fill="#EF4444"/>
      <circle cx="50" cy="29" r="3.5" fill="#3B82F6"/>
      <circle cx="66" cy="20" r="3" fill="#EF4444"/>
      <circle cx="38" cy="52" r="4" fill="#78350F"/>
      <circle cx="62" cy="52" r="4" fill="#78350F"/>
      <circle cx="39" cy="50.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="63" cy="50.5" r="1.5" fill="#FFFFFF"/>
      <ellipse cx="30" cy="60" rx="4" ry="2.5" fill="#FCA5A5"/>
      <ellipse cx="70" cy="60" rx="4" ry="2.5" fill="#FCA5A5"/>
      <path d="M38 60 Q50 74 62 60" stroke="#78350F" stroke-width="3" stroke-linecap="round" fill="#DC2626"/>
      <path d="M42 62 Q50 67 58 62" fill="#FFFFFF"/>
    </svg>`
  }
};

const STORAGE_KEYS = {
  MODE: "speakline_active_mode",
  THEME: "speakline_theme",
  WPM: "speakline_wpm_speed",
  LEVEL: "speakline_selected_level",
  TRACK: "speakline_lofi_track",
  VOLUME: "speakline_last_volume",
  COMPLETED: "speakline_completed_topics",
  WRITING_PREFIX: "speakline_writing_",
  RECORDINGS: "speakline_voice_recordings",
  STREAK: "speakline_streak_days",
  XP: "speakline_total_xp",
  GEMS: "speakline_total_gems",
  VIEW_MODE: "speakline_view_mode",
  USER_NAME: "speakline_user_name",
  USER_AVATAR: "speakline_user_avatar",
  ONBOARDED: "speakline_has_onboarded"
};

const StorageManager = {
  getStreak() {
    try {
      const s = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK), 10);
      if (!isNaN(s) && s >= 0) return s;
    } catch (e) {}
    return 7;
  },

  incrementStreak() {
    try {
      const cur = this.getStreak();
      const next = cur + 1;
      localStorage.setItem(STORAGE_KEYS.STREAK, String(next));
      return next;
    } catch (e) {}
    return 8;
  },

  getXP() {
    try {
      const xp = parseInt(localStorage.getItem(STORAGE_KEYS.XP), 10);
      if (!isNaN(xp) && xp >= 0) return xp;
    } catch (e) {}
    return 320;
  },

  addXP(amount = 20) {
    try {
      const cur = this.getXP();
      const next = cur + amount;
      localStorage.setItem(STORAGE_KEYS.XP, String(next));
      return next;
    } catch (e) {}
    return 340;
  },

  getGems() {
    try {
      const g = parseInt(localStorage.getItem(STORAGE_KEYS.GEMS), 10);
      if (!isNaN(g) && g >= 0) return g;
    } catch (e) {}
    return 320;
  },

  getViewMode() {
    try {
      const vm = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
      if (vm === "path" || vm === "list") return vm;
    } catch (e) {}
    return "path";
  },

  setViewMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
    } catch (e) {}
  },
  getMode() {
    try {
      const mode = localStorage.getItem(STORAGE_KEYS.MODE);
      if (mode === "speaking" || mode === "writing") return mode;
    } catch (e) {}
    return "speaking";
  },

  setMode(mode) {
    try { localStorage.setItem(STORAGE_KEYS.MODE, mode); } catch (e) {}
  },

  getTheme() {
    try {
      const t = localStorage.getItem(STORAGE_KEYS.THEME);
      if (t === "light" || t === "dark") return t;
    } catch (e) {}
    return "dark";
  },

  setTheme(theme) {
    try { localStorage.setItem(STORAGE_KEYS.THEME, theme); } catch (e) {}
  },

  getWpm() {
    try {
      const parsed = parseInt(localStorage.getItem(STORAGE_KEYS.WPM), 10);
      if (!isNaN(parsed) && parsed >= MIN_WPM && parsed <= MAX_WPM) return parsed;
    } catch (e) {}
    return DEFAULT_WPM;
  },

  setWpm(wpm) {
    try { localStorage.setItem(STORAGE_KEYS.WPM, String(wpm)); } catch (e) {}
  },

  getLevel() {
    try {
      const l = localStorage.getItem(STORAGE_KEYS.LEVEL);
      if (l === "A1" || l === "A2" || l === "B1") return l;
    } catch (e) {}
    return null;
  },

  setLevel(level) {
    try { localStorage.setItem(STORAGE_KEYS.LEVEL, String(level)); } catch (e) {}
  },

  getTrackId() {
    try {
      const id = parseInt(localStorage.getItem(STORAGE_KEYS.TRACK), 10);
      if (id >= 1 && id <= 5) return id;
    } catch (e) {}
    return 1;
  },

  setTrackId(id) {
    try { localStorage.setItem(STORAGE_KEYS.TRACK, String(id)); } catch (e) {}
  },

  getVolume() {
    try {
      const v = parseInt(localStorage.getItem(STORAGE_KEYS.VOLUME), 10);
      if (!isNaN(v) && v >= 0 && v <= 100) return v;
    } catch (e) {}
    return 45;
  },

  setVolume(vol) {
    try { localStorage.setItem(STORAGE_KEYS.VOLUME, String(vol)); } catch (e) {}
  },

  getCompletedTopics() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      if (raw) return JSON.parse(raw) || {};
    } catch (e) {}
    return {};
  },

  markTopicCompleted(topicId, levelUsed, wpmUsed, elapsedSeconds) {
    try {
      const all = this.getCompletedTopics();
      all[topicId] = {
        completed: true,
        level: levelUsed,
        wpm: wpmUsed,
        lastTime: Math.round(elapsedSeconds),
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(all));
    } catch (e) {}
  },

  getTopicWriting(topicId) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WRITING_PREFIX + topicId);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  },

  saveTopicWriting(topicId, writingData) {
    try {
      localStorage.setItem(STORAGE_KEYS.WRITING_PREFIX + topicId, JSON.stringify(writingData));
    } catch (e) {}
  },

  clearTopicWriting(topicId) {
    try {
      localStorage.removeItem(STORAGE_KEYS.WRITING_PREFIX + topicId);
    } catch (e) {}
  },

  getRecordings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.RECORDINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  },

  saveRecording(rec) {
    try {
      let list = this.getRecordings();
      // FIFO: Maximum 3 audios saved in localStorage.
      // Prepend newest recording, delete oldest if > 3
      list.unshift(rec);
      if (list.length > 3) {
        list = list.slice(0, 3);
      }
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(list));
      return list;
    } catch (e) {
      console.warn("Storage quota warning when saving audio recording:", e);
      try {
        const single = [rec];
        localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(single));
        return single;
      } catch (e2) {}
    }
    return [];
  },

  deleteRecording(id) {
    try {
      let list = this.getRecordings().filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(list));
      return list;
    } catch (e) {}
    return [];
  },

  getUserName() {
    try {
      const name = localStorage.getItem(STORAGE_KEYS.USER_NAME);
      if (name && name.trim().length > 0) return name.trim();
    } catch (e) {}
    return "Champion";
  },

  setUserName(name) {
    try {
      const cleaned = (name || "").trim().slice(0, 24);
      localStorage.setItem(STORAGE_KEYS.USER_NAME, cleaned || "Champion");
    } catch (e) {}
  },

  getUserAvatar() {
    try {
      const av = localStorage.getItem(STORAGE_KEYS.USER_AVATAR);
      if (av && AVATARS[av]) return av;
    } catch (e) {}
    return "sprout";
  },

  setUserAvatar(avatarId) {
    try {
      if (AVATARS[avatarId]) {
        localStorage.setItem(STORAGE_KEYS.USER_AVATAR, avatarId);
      }
    } catch (e) {}
  },

  hasOnboarded() {
    try {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === "true";
    } catch (e) {}
    return false;
  },

  setOnboarded(val = true) {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, val ? "true" : "false");
    } catch (e) {}
  }
};

/* ==========================================================================
   3. APPLICATION STATE MODULE
   ========================================================================== */

const AppState = {
  mode: StorageManager.getMode(),
  theme: StorageManager.getTheme(),
  userName: StorageManager.getUserName(),
  userAvatar: StorageManager.getUserAvatar(),
  streak: StorageManager.getStreak(),
  xp: StorageManager.getXP(),
  gems: StorageManager.getGems(),
  viewMode: StorageManager.getViewMode(),
  currentScreen: "topics",
  selectedTopicId: 1,
  selectedLevel: "A1",
  wpm: StorageManager.getWpm(),
  selectedTrackId: StorageManager.getTrackId(),
  volume: StorageManager.getVolume(),
  isPaused: false,
  isInStartSequence: false,
  isScrolling: false,
  sessionToken: 0,
  elapsedSeconds: 0,
  customTeleprompterText: null, // used when reading own essay
  isWritingAmbientPlaying: false
};

function getTopicById(id) {
  return TOPICS.find((t) => t.id === Number(id)) || TOPICS[0];
}

function getTrackById(id) {
  return LOFI_TRACKS.find((t) => t.id === Number(id)) || LOFI_TRACKS[0];
}

function getActiveTopicText() {
  if (AppState.customTeleprompterText) {
    return AppState.customTeleprompterText;
  }
  const topic = getTopicById(AppState.selectedTopicId);
  return (topic.levels && topic.levels[AppState.selectedLevel]) || topic.levels.A1;
}

function countWords(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function formatSecondsAsTime(totalSeconds) {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return mins + ":" + (secs < 10 ? "0" + secs : secs);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatRecordingDate(timestamp) {
  try {
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${day}.${month} ${hours}:${mins}`;
  } catch (e) {
    return "";
  }
}

function splitTextIntoLines(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let index = 0;
  const total = words.length;

  while (index < total) {
    const remaining = total - index;
    if (remaining <= 7) {
      lines.push(words.slice(index, total));
      break;
    }
    if (remaining <= 14) {
      const half = Math.ceil(remaining / 2);
      lines.push(words.slice(index, index + half));
      index += half;
      continue;
    }

    let chunkLength = 5;
    for (let len = 5; len <= 6; len++) {
      const candidateWord = words[index + len - 1];
      if (candidateWord && /[.,;:!?]$/.test(candidateWord)) {
        chunkLength = len;
        break;
      }
    }
    lines.push(words.slice(index, index + chunkLength));
    index += chunkLength;
  }

  return lines.map((wordList) => ({
    text: wordList.join(" "),
    wordCount: wordList.length
  }));
}

/* ==========================================================================
   4. LIGHTWEIGHT 60FPS RAIN ANIMATION MODULE
   ========================================================================== */

const RainController = {
  canvas: null,
  ctx: null,
  drops: [],
  rafId: null,
  width: 0,
  height: 0,

  start() {
    this.stop();
    const canvas = document.getElementById("rain-canvas");
    if (!canvas) return;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.resize();
    this.createDrops();

    const render = () => {
      const shouldRun = AppState.currentScreen === "reading" || AppState.isWritingAmbientPlaying;
      if (!shouldRun) {
        this.stop();
        return;
      }
      this.drawFrame();
      this.rafId = requestAnimationFrame(render);
    };

    this.rafId = requestAnimationFrame(render);
  },

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  createDrops() {
    const count = Math.max(28, Math.min(55, Math.floor(this.width / 22)));
    this.drops = [];
    for (let i = 0; i < count; i++) {
      this.drops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        length: 14 + Math.random() * 14,
        speed: 4.0 + Math.random() * 3.5,
        drift: -0.4
      });
    }
  },

  drawFrame() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    const speedFactor = AppState.isPaused ? 0.3 : 1;

    const isLight = AppState.theme === "light";
    this.ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.12)" : "rgba(255, 255, 255, 0.14)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    for (let i = 0; i < this.drops.length; i++) {
      const d = this.drops[i];
      this.ctx.moveTo(d.x, d.y);
      this.ctx.lineTo(d.x + d.drift * 2, d.y + d.length);

      d.y += d.speed * speedFactor;
      d.x += d.drift * speedFactor;

      if (d.y > this.height + 20) {
        d.y = -d.length;
        d.x = Math.random() * this.width;
      }
      if (d.x < -10) {
        d.x = this.width + 5;
      }
    }

    this.ctx.stroke();
  },

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
};

/* ==========================================================================
   5. AUDIO CONTROLLER & INTRO VOICE (LOFI REMOVED AS REQUESTED)
   ========================================================================== */

const AudioController = {
  musicAudio: null,
  currentTrackId: null,
  fadeFrameId: null,

  cancelFade() {},

  getTargetMusicGain() {
    return 0;
  },

  loadAndPlayTrack() {
    return Promise.resolve(true);
  },

  previewTrackOnSetup() {},

  fadeInMusic() {
    return Promise.resolve(true);
  },

  syncMusicVolume() {},

  fadeOutMusic() {},

  stopMusicImmediate() {},

  playIntroVoice(token) {
    return new Promise((resolve) => {
      if (token !== AppState.sessionToken) {
        resolve();
        return;
      }

      // Check for local audio fallback first
      const localIntro = new Audio("audio/intro.mp3");
      let resolved = false;

      const finish = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };

      localIntro.onended = finish;
      localIntro.onerror = () => {
        // Fallback to SpeechSynthesis
        if ("speechSynthesis" in window) {
          try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Speak fast and clear");
            utterance.lang = "en-US";
            utterance.rate = 1.05;

            const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
            const englishVoice = voices.find((v) => v.lang && /^en(-|_|$)/i.test(v.lang));
            if (englishVoice) utterance.voice = englishVoice;

            utterance.onend = finish;
            utterance.onerror = finish;
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            finish();
          }
        } else {
          finish();
        }
      };

      const p = localIntro.play();
      if (p && typeof p.then === "function") {
        p.catch(() => localIntro.onerror());
      }

      setTimeout(finish, 1600);
    });
  }
};

function speakWord(text, onStart, onEnd) {
  if (!("speechSynthesis" in window)) {
    if (typeof onEnd === "function") onEnd();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const cleanWord = text.replace(/^[^\w']+|[^\w']+$/g, "").trim();
    if (!cleanWord) {
      if (typeof onEnd === "function") onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanWord);
    utterance.lang = "en-US";
    utterance.rate = 0.88;

    const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
    const englishVoice = voices.find((v) => v.lang && /^en(-|_|$)/i.test(v.lang));
    if (englishVoice) utterance.voice = englishVoice;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (typeof onEnd === "function") onEnd();
    };

    utterance.onstart = () => {
      if (typeof onStart === "function") onStart();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    setTimeout(finish, 2400);

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (typeof onEnd === "function") onEnd();
  }
}

/* ==========================================================================
   6. 60FPS TELEPROMPTER ENGINE WITH SOFT AMBIENT GLOW & LINE MAGNIFICATION
   ========================================================================== */

const TeleprompterController = {
  linesData: [],
  lineElements: [],
  lineMetrics: [],
  totalWords: 0,
  startScrollY: 0,
  totalScrollEndY: 0,
  totalScrollDistance: 0,
  pxPerWord: 12,
  viewportHeight: 0,
  currentScrollY: 0,
  currentVelocity: 0,
  lastFocusedIdx: -1,
  trackEl: null,
  rafId: null,
  lastFrameTime: 0,

  prepareText(passageText) {
    this.stopLoop();
    this.linesData = splitTextIntoLines(passageText);
    this.totalWords = this.linesData.reduce((acc, item) => acc + item.wordCount, 0);

    const track = document.getElementById("teleprompter-track");
    this.trackEl = track;
    track.innerHTML = "";
    this.lineElements = [];
    this.lastFocusedIdx = -1;

    const fragment = document.createDocumentFragment();
    this.linesData.forEach((lineObj, idx) => {
      const p = document.createElement("p");
      p.className = "teleprompter-line" + (idx === 0 ? " is-focused" : idx === 1 ? " is-near" : "");
      p.textContent = lineObj.text;
      fragment.appendChild(p);
      this.lineElements.push(p);
    });
    track.appendChild(fragment);

    this.measureLayout(true);
  },

  measureLayout(resetPosition = false) {
    const stage = document.getElementById("teleprompter-stage");
    if (!stage || this.lineElements.length === 0) return;

    let prevNormalizedProgress = 0;
    if (!resetPosition && this.totalScrollDistance > 0) {
      prevNormalizedProgress = Math.max(
        0,
        Math.min(1, (this.currentScrollY - this.startScrollY) / this.totalScrollDistance)
      );
    }

    this.viewportHeight = stage.clientHeight || window.innerHeight * 0.8;
    const rawCenters = [];
    const rawHeights = [];

    let fallbackTop = 0;
    for (let i = 0; i < this.lineElements.length; i++) {
      const el = this.lineElements[i];
      const height = el.offsetHeight > 10 ? el.offsetHeight : 54;
      const top = el.offsetTop > 0 || i === 0 ? el.offsetTop : fallbackTop;
      rawCenters.push(top + height / 2);
      rawHeights.push(height);
      fallbackTop = top + height;
    }

    this.lineMetrics = [];
    const count = this.lineElements.length;

    for (let i = 0; i < count; i++) {
      const startY = rawCenters[i];
      const endY =
        i < count - 1 ? rawCenters[i + 1] : rawCenters[i] + rawHeights[i] * 0.95;
      const distance = Math.max(16, endY - startY);

      this.lineMetrics.push({
        center: rawCenters[i],
        height: rawHeights[i],
        startY: startY,
        endY: endY,
        distance: distance,
        wordCount: this.linesData[i].wordCount
      });
    }

    this.startScrollY = this.lineMetrics[0].startY;
    this.totalScrollEndY = this.lineMetrics[count - 1].endY;
    this.totalScrollDistance = Math.max(100, this.totalScrollEndY - this.startScrollY);
    this.pxPerWord = this.totalScrollDistance / Math.max(1, this.totalWords);

    if (resetPosition) {
      this.currentScrollY = this.startScrollY;
      this.currentVelocity = this.getTargetVelocityPxPerSec();
    } else {
      this.currentScrollY =
        this.startScrollY + prevNormalizedProgress * this.totalScrollDistance;
    }

    this.lastFocusedIdx = -1;
    this.applyTransformAndFocus();
  },

  getTargetVelocityPxPerSec() {
    const wordsPerSecond = AppState.wpm / 60;
    return this.pxPerWord * wordsPerSecond;
  },

  applyTransformAndFocus() {
    if (!this.trackEl || this.lineMetrics.length === 0) return;

    const centerY = this.viewportHeight / 2;
    const translateY = centerY - this.currentScrollY;
    this.trackEl.style.transform = "translate3d(0, " + translateY.toFixed(2) + "px, 0)";

    let closestIdx = 0;
    let minDistance = Infinity;
    for (let i = 0; i < this.lineMetrics.length; i++) {
      const d = Math.abs(this.lineMetrics[i].center - this.currentScrollY);
      if (d < minDistance) {
        minDistance = d;
        closestIdx = i;
      }
    }

    if (closestIdx !== this.lastFocusedIdx) {
      this.lastFocusedIdx = closestIdx;
      for (let i = 0; i < this.lineElements.length; i++) {
        const el = this.lineElements[i];
        const lineDist = Math.abs(i - closestIdx);
        if (i === closestIdx) {
          el.className = "teleprompter-line is-focused";
        } else if (lineDist === 1) {
          el.className = "teleprompter-line is-near";
        } else {
          el.className = "teleprompter-line";
        }
      }
    }
  },

  startLoop(token) {
    this.stopLoop();
    this.measureLayout(false);
    AppState.isScrolling = true;
    this.currentVelocity = this.getTargetVelocityPxPerSec();
    this.lastFrameTime = performance.now();

    const tick = (now) => {
      if (token !== AppState.sessionToken || AppState.currentScreen !== "reading") return;

      const dt = Math.min(0.065, Math.max(0, (now - this.lastFrameTime) / 1000));
      this.lastFrameTime = now;

      if (!AppState.isPaused) {
        const targetVel = this.getTargetVelocityPxPerSec();
        this.currentVelocity += (targetVel - this.currentVelocity) * 0.25;
        this.currentScrollY += this.currentVelocity * dt;
        AppState.elapsedSeconds += dt;
        this.applyTransformAndFocus();

        if (this.currentScrollY >= this.totalScrollEndY) {
          this.stopLoop();
          AppState.isScrolling = false;
          UIController.completeReadingSession();
          return;
        }
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  },

  stopLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
};

/* ==========================================================================
   7. 30-SECOND SPEAKING QUESTIONS VOICE RECORDER (DICTAPHONE)
   ========================================================================== */

const VoiceRecorderController = {
  activeQuestionIndex: null,
  mediaRecorder: null,
  stream: null,
  chunks: [],
  timerInterval: null,
  remainingSeconds: 30,

  async startRecording(questionIndex) {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.stopRecording();
      if (this.activeQuestionIndex === questionIndex) return;
    }

    this.activeQuestionIndex = questionIndex;
    this.chunks = [];
    this.remainingSeconds = 30;

    const card = document.getElementById(`question-card-${questionIndex}`);
    const timerDisplay = document.getElementById(`q-timer-${questionIndex}`);
    const btn = document.getElementById(`q-btn-rec-${questionIndex}`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.stream = stream;

      const mr = new MediaRecorder(stream);
      this.mediaRecorder = mr;

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.chunks.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(this.chunks, { type: mr.mimeType || "audio/webm" });
        this.cleanup();

        if (card) card.classList.remove("is-recording");
        if (btn) {
          btn.classList.remove("is-recording");
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
            <span>Record Answer (30s)</span>
          `;
        }

        const audioUrl = URL.createObjectURL(blob);
        this.renderPlaybackUI(questionIndex, audioUrl);

        // Save audio to localStorage as base64 (Max 3 audios, FIFO oldest-replaced)
        try {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result;
            if (base64Data && typeof base64Data === "string") {
              const topic = getTopicById(AppState.selectedTopicId);
              const qText = (topic && topic.questions && topic.questions[questionIndex - 1]) || `Question 0${questionIndex}`;
              StorageManager.saveRecording({
                id: "rec_" + Date.now(),
                topicId: AppState.selectedTopicId,
                topicTitle: topic.title,
                questionIndex: questionIndex,
                questionText: qText,
                timestamp: Date.now(),
                audioData: base64Data
              });
              UIController.updateRecordingsBadge();
            }
          };
          reader.readAsDataURL(blob);
        } catch (err) {
          console.warn("Storage write error for audio recording:", err);
        }
      };

      mr.start();

      if (card) card.classList.add("is-recording");
      if (btn) {
        btn.classList.add("is-recording");
        btn.innerHTML = `<span class="rec-pulse-dot"></span><span>Stop Recording (0:30)</span>`;
      }

      this.timerInterval = setInterval(() => {
        this.remainingSeconds--;
        const timeStr = formatSecondsAsTime(this.remainingSeconds);
        if (timerDisplay) timerDisplay.textContent = timeStr;
        if (btn) btn.querySelector("span:last-child").textContent = `Stop Recording (${timeStr})`;

        if (this.remainingSeconds <= 0) {
          this.stopRecording();
        }
      }, 1000);
    } catch (err) {
      console.warn("Microphone access denied:", err);
      alert("Microphone access is required to record your 30s speaking answer.");
      this.cleanup();
    }
  },

  stopRecording() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      try { this.mediaRecorder.stop(); } catch (e) {}
    }
  },

  cleanup() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => track.stop());
      } catch (e) {}
      this.stream = null;
    }
    this.mediaRecorder = null;
  },

  renderPlaybackUI(questionIndex, audioUrl) {
    const container = document.getElementById(`q-playback-container-${questionIndex}`);
    if (!container) return;

    container.innerHTML = `
      <div class="question-audio-playback">
        <audio controls src="${audioUrl}" autoplay></audio>
        <button type="button" class="btn-rerecord" onclick="VoiceRecorderController.startRecording(${questionIndex})">Re-record</button>
      </div>
    `;
  }
};

/* ==========================================================================
   8. WRITING STUDIO CONTROLLER
   - Real-time 5 Target Words Detection & Green Checkmarks
   - Word Counter (Target: 50–100 Words)
   - Auto-Save to LocalStorage
   ========================================================================== */

const WritingController = {
  currentTopic: null,
  debounceTimer: null,

  initForTopic(topicId) {
    this.currentTopic = getTopicById(topicId);
    AppState.selectedTopicId = Number(topicId);

    document.getElementById("writing-topic-label").textContent = `Topic ${this.currentTopic.id < 10 ? "0" + this.currentTopic.id : this.currentTopic.id} · ${this.currentTopic.title}`;
    document.getElementById("writing-prompt-text").textContent = this.currentTopic.writingPrompt;

    this.renderTargetWordsBadges();

    const textarea = document.getElementById("writing-textarea");
    const saved = StorageManager.getTopicWriting(this.currentTopic.id);

    if (saved && saved.text) {
      textarea.value = saved.text;
      this.showAutoSaveStatus(true, "Loaded from memory ✔");
    } else {
      textarea.value = "";
      this.showAutoSaveStatus(false, "");
    }

    this.handleTextChange();
    this.updateAmbientSoundUI();
  },

  renderTargetWordsBadges() {
    const container = document.getElementById("target-words-badges");
    if (!container || !this.currentTopic) return;

    container.innerHTML = "";
    this.currentTopic.targetWords.forEach((word) => {
      const pill = document.createElement("span");
      pill.className = "target-word-pill";
      pill.setAttribute("data-target-word", word.toLowerCase());
      pill.innerHTML = `
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${word}</span>
      `;
      container.appendChild(pill);
    });
  },

  handleTextChange() {
    const textarea = document.getElementById("writing-textarea");
    if (!textarea || !this.currentTopic) return;

    const text = textarea.value;
    const words = countWords(text);

    // 1. Update Word Counter
    const numEl = document.getElementById("word-count-num");
    if (numEl) {
      numEl.textContent = `${words} / 80 words`;
      const isTarget = words >= 50 && words <= 100;
      numEl.classList.toggle("is-target-reached", isTarget);
    }

    // 2. Real-Time Target Words Detection
    const badges = document.querySelectorAll(".target-word-pill");
    let usedCount = 0;

    badges.forEach((pill) => {
      const targetWord = pill.getAttribute("data-target-word");
      // Case-insensitive regex with word boundary check
      const escaped = targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      const isUsed = regex.test(text);

      pill.classList.toggle("is-used", isUsed);
      if (isUsed) usedCount++;
    });

    const counterEl = document.getElementById("target-words-counter");
    if (counterEl) {
      counterEl.textContent = `${usedCount} / 5 used`;
      counterEl.classList.toggle("all-used", usedCount === 5);
    }

    // 3. Debounced Auto-Save
    clearTimeout(this.debounceTimer);
    this.showAutoSaveStatus(false, "Saving...");
    this.debounceTimer = setTimeout(() => {
      this.saveCurrentWriting();
    }, 800);
  },

  saveCurrentWriting() {
    const textarea = document.getElementById("writing-textarea");
    if (!textarea || !this.currentTopic) return;

    const text = textarea.value;
    const words = countWords(text);
    const badges = document.querySelectorAll(".target-word-pill.is-used");

    const data = {
      text: text,
      wordCount: words,
      targetWordsUsed: badges.length,
      updatedAt: Date.now()
    };

    StorageManager.saveTopicWriting(this.currentTopic.id, data);
    this.showAutoSaveStatus(true, "Saved to memory ✔");
  },

  showAutoSaveStatus(isSaved, text) {
    const el = document.getElementById("autosave-status");
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("is-saved", isSaved);
  },

  clearCurrentWriting() {
    if (!confirm("Are you sure you want to clear your writing for this topic?")) return;
    const textarea = document.getElementById("writing-textarea");
    if (textarea) textarea.value = "";
    if (this.currentTopic) StorageManager.clearTopicWriting(this.currentTopic.id);
    this.handleTextChange();
    this.showAutoSaveStatus(false, "Cleared");
  },

  practiceSpeakingWrittenText() {
    const textarea = document.getElementById("writing-textarea");
    const text = (textarea ? textarea.value : "").trim();

    if (!text || countWords(text) < 10) {
      alert("Please write at least 10 words before practicing in the teleprompter.");
      return;
    }

    AppState.customTeleprompterText = text;
    UIController.startReadingSession();
  },

  toggleAmbientSound() {
    AppState.isWritingAmbientPlaying = !AppState.isWritingAmbientPlaying;
    if (AppState.isWritingAmbientPlaying) {
      AudioController.loadAndPlayTrack(AppState.selectedTrackId, false);
      RainController.start();
    } else {
      AudioController.fadeOutMusic(1000);
      RainController.stop();
    }
    this.updateAmbientSoundUI();
  },

  updateAmbientSoundUI() {
    const btn = document.getElementById("btn-writing-ambient");
    if (btn) {
      btn.classList.toggle("is-playing", AppState.isWritingAmbientPlaying);
      btn.querySelector("span:last-child").textContent = AppState.isWritingAmbientPlaying
        ? "Rain & Lofi ON"
        : "Rain & Lofi OFF";
    }
  }
};

/* ==========================================================================
   9. UI & SCREEN NAVIGATION CONTROLLER
   ========================================================================== */

const UIController = {
  screenIds: {
    topics: "screen-topics",
    setup: "screen-setup",
    reading: "screen-reading",
    result: "screen-result",
    writing: "screen-writing"
  },

  init() {
    this.applyTheme(AppState.theme);
    this.applyMode(AppState.mode);
    this.applyViewMode(AppState.viewMode);
    this.applyUserProfile();
    this.updateGamifiedHeader();
    this.renderLearningPath();
    this.renderTopicsList();
    this.renderAvatarPickers();
    this.bindEvents();
    this.syncSetupControls();
    this.updateRecordingsBadge();

    // Check first-time onboarding
    if (!StorageManager.hasOnboarded()) {
      setTimeout(() => {
        this.openWelcomeModal();
      }, 450);
    }
  },

  updateGamifiedHeader() {
    document.querySelectorAll(".header-streak-val").forEach((el) => {
      el.textContent = String(AppState.streak);
    });
    document.querySelectorAll(".header-gems-val").forEach((el) => {
      el.textContent = String(AppState.gems);
    });
    document.querySelectorAll(".stat-streak-val").forEach((el) => {
      el.textContent = String(AppState.streak);
    });
    document.querySelectorAll(".stat-xp-val").forEach((el) => {
      el.textContent = String(AppState.xp);
    });

    const activeTopic = getTopicById(AppState.selectedTopicId || 1);
    const featuredName = document.getElementById("featured-topic-name");
    if (featuredName) featuredName.textContent = activeTopic.title;

    const completedMap = StorageManager.getCompletedTopics();
    const completedCount = Object.keys(completedMap).length;
    const pct = Math.min(100, Math.round((completedCount / TOPICS.length) * 100)) || 20;

    const fillBar = document.getElementById("featured-progress-fill");
    if (fillBar) fillBar.style.width = `${pct}%`;

    const pillBadge = document.getElementById("featured-progress-pill");
    if (pillBadge) pillBadge.textContent = `${pct}%`;
  },

  applyViewMode(mode) {
    AppState.viewMode = mode;
    StorageManager.setViewMode(mode);

    const pathView = document.getElementById("container-path-view");
    const listView = document.getElementById("container-list-view");
    const toggleBtn = document.getElementById("btn-toggle-view");

    if (mode === "list") {
      if (pathView) pathView.style.display = "none";
      if (listView) listView.style.display = "block";
      if (toggleBtn) toggleBtn.innerHTML = `<span>🗺️ Path</span>`;
    } else {
      if (pathView) pathView.style.display = "flex";
      if (listView) listView.style.display = "none";
      if (toggleBtn) toggleBtn.innerHTML = `<span>📋 List</span>`;
    }
  },

  toggleViewMode() {
    const next = AppState.viewMode === "path" ? "list" : "path";
    this.applyViewMode(next);
  },

  renderLearningPath() {
    const trackEl = document.getElementById("path-winding-track");
    if (!trackEl) return;
    trackEl.innerHTML = "";

    const completedMap = StorageManager.getCompletedTopics();
    const isSpeakingMode = AppState.mode === "speaking";

    const nodeIcons = [
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><path d="M12 10a6 6 0 0 0-6-6c-3 0-3 6-3 6a6 6 0 0 0 9 6"/><path d="M12 10a6 6 0 0 1 6-6c3 0 3 6 3 6a6 6 0 0 1-9 6"/><path d="M12 14v8"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="28" height="28"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
    ];

    const offsetClasses = [
      "offset-center",
      "offset-right",
      "offset-center",
      "offset-left",
      "offset-center",
      "offset-right",
      "offset-center",
      "offset-left",
      "offset-center",
      "offset-right"
    ];

    let foundFirstIncomplete = false;

    TOPICS.forEach((topic, idx) => {
      if (idx === 4) {
        const sep = document.createElement("div");
        sep.className = "unit-separator-row";
        sep.innerHTML = `
          <div class="unit-separator-line"></div>
          <span class="unit-separator-badge">Unit 2 · Real Life Situations</span>
          <div class="unit-separator-line"></div>
        `;
        trackEl.appendChild(sep);
      }

      const row = document.createElement("div");
      row.className = `path-node-row ${offsetClasses[idx] || "offset-center"}`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stepping-stone-btn";
      btn.setAttribute("title", `${topic.title}`);
      btn.setAttribute("aria-label", `${topic.title}`);

      const isCompleted = isSpeakingMode
        ? !!(completedMap[topic.id] && completedMap[topic.id].completed)
        : !!(StorageManager.getTopicWriting(topic.id) && StorageManager.getTopicWriting(topic.id).wordCount >= 50);

      const isBonus = idx === 2 || idx === 9;

      if (isCompleted) {
        btn.classList.add("is-completed-node");
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" width="28" height="28"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else if (!foundFirstIncomplete) {
        foundFirstIncomplete = true;
        btn.classList.add("is-active-node");
        btn.innerHTML = `
          <div class="start-tooltip-badge">Start</div>
          ${nodeIcons[idx] || nodeIcons[0]}
        `;
      } else {
        if (isBonus) {
          btn.classList.add("is-bonus-node");
        }
        btn.innerHTML = nodeIcons[idx] || nodeIcons[0];
      }

      btn.addEventListener("click", () => {
        if (AppState.mode === "speaking") {
          this.openSetupScreen(topic.id);
        } else {
          this.openWritingScreen(topic.id);
        }
      });

      row.appendChild(btn);
      trackEl.appendChild(row);
    });
  },

  updateRecordingsBadge() {
    const list = StorageManager.getRecordings();
    const count = list.length;
    document.querySelectorAll("#header-rec-count, .count-pill").forEach((el) => {
      el.textContent = `${count}/3`;
    });
  },

  openRecordingsModal() {
    const modal = document.getElementById("modal-recordings");
    if (!modal) return;
    this.renderRecordingsModalList();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  },

  closeRecordingsModal() {
    const modal = document.getElementById("modal-recordings");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  },

  renderRecordingsModalList() {
    const listEl = document.getElementById("modal-recordings-list");
    if (!listEl) return;
    const recs = StorageManager.getRecordings();

    if (recs.length === 0) {
      listEl.innerHTML = `<div class="empty-rec-state">Hozircha saqlangan audio yo'q.<br><small style="opacity:0.7">Savollarga javob berib, diktafon yordamida yozib oling (maksimal 3 ta).</small></div>`;
      return;
    }

    listEl.innerHTML = "";
    recs.forEach((rec) => {
      const item = document.createElement("div");
      item.className = "saved-rec-item";
      item.innerHTML = `
        <div class="saved-rec-left">
          <div class="saved-rec-title">${escapeHtml(rec.topicTitle || "Speaking Answer")} · Q0${rec.questionIndex || 1}</div>
          <div class="saved-rec-meta">${formatRecordingDate(rec.timestamp)}</div>
          <audio controls src="${rec.audioData}"></audio>
        </div>
        <button type="button" class="btn-delete-rec" title="O'chirish" aria-label="O'chirish">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      `;

      const delBtn = item.querySelector(".btn-delete-rec");
      delBtn.addEventListener("click", () => {
        StorageManager.deleteRecording(rec.id);
        this.renderRecordingsModalList();
        this.updateRecordingsBadge();
      });

      listEl.appendChild(item);
    });
  },

  applyMode(mode) {
    AppState.mode = mode;
    StorageManager.setMode(mode);

    document.querySelectorAll(".mode-tab-btn").forEach((btn) => {
      const isMatch = btn.getAttribute("data-mode") === mode;
      btn.classList.toggle("is-active", isMatch);
      btn.setAttribute("aria-selected", isMatch ? "true" : "false");
    });

    this.renderLearningPath();
    this.renderTopicsList();
    this.updateGamifiedHeader();
  },

  applyTheme(theme) {
    AppState.theme = theme;
    StorageManager.setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);

    const isLight = theme === "light";
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.setAttribute(
        "title",
        isLight ? "To'q ko'k fonga o'tish (Dark mode)" : "Oq fonga o'tish (Light mode)"
      );
    });

    const toggle = document.getElementById("settings-theme-toggle");
    if (toggle) toggle.checked = !isLight;
    const themeIcon = document.getElementById("settings-theme-icon");
    if (themeIcon) themeIcon.textContent = isLight ? "☀️" : "🌙";
  },

  toggleTheme() {
    const next = AppState.theme === "light" ? "dark" : "light";
    this.applyTheme(next);
  },

  applyUserProfile() {
    const heading = document.getElementById("brand-heading");
    if (heading) {
      heading.textContent = `Hey, ${AppState.userName}!`;
    }

    const display = document.getElementById("user-avatar-display");
    if (display) {
      const av = AVATARS[AppState.userAvatar] || AVATARS.sprout;
      display.innerHTML = av.svg;
    }
  },

  renderAvatarPickers() {
    const grids = [
      { id: "avatar-picker-grid", current: AppState.userAvatar },
      { id: "welcome-avatar-picker-grid", current: AppState.userAvatar }
    ];

    grids.forEach(({ id, current }) => {
      const container = document.getElementById(id);
      if (!container) return;
      container.innerHTML = "";

      Object.values(AVATARS).forEach((av) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `avatar-choice-btn ${av.id === current ? "is-selected" : ""}`;
        btn.setAttribute("data-avatar-id", av.id);
        btn.title = av.name;
        btn.innerHTML = av.svg;

        btn.addEventListener("click", () => {
          container.querySelectorAll(".avatar-choice-btn").forEach((b) => b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
        });

        container.appendChild(btn);
      });
    });
  },

  openSettingsModal() {
    const modal = document.getElementById("modal-settings");
    if (!modal) return;

    const input = document.getElementById("input-user-name");
    if (input) input.value = AppState.userName;

    const grid = document.getElementById("avatar-picker-grid");
    if (grid) {
      grid.querySelectorAll(".avatar-choice-btn").forEach((b) => {
        b.classList.toggle("is-selected", b.getAttribute("data-avatar-id") === AppState.userAvatar);
      });
    }

    const toggle = document.getElementById("settings-theme-toggle");
    if (toggle) toggle.checked = (AppState.theme === "dark");

    const themeIcon = document.getElementById("settings-theme-icon");
    if (themeIcon) themeIcon.textContent = (AppState.theme === "dark") ? "🌙" : "☀️";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  },

  closeSettingsModal() {
    const modal = document.getElementById("modal-settings");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  },

  saveSettings() {
    const input = document.getElementById("input-user-name");
    const nameVal = input ? input.value.trim() : "";
    const finalName = nameVal || "Champion";

    const selectedBtn = document.querySelector("#avatar-picker-grid .avatar-choice-btn.is-selected");
    const finalAvatar = selectedBtn ? selectedBtn.getAttribute("data-avatar-id") : AppState.userAvatar;

    StorageManager.setUserName(finalName);
    StorageManager.setUserAvatar(finalAvatar);
    AppState.userName = finalName;
    AppState.userAvatar = finalAvatar;

    this.applyUserProfile();
    this.closeSettingsModal();
  },

  openWelcomeModal() {
    const modal = document.getElementById("modal-welcome");
    if (!modal) return;

    const input = document.getElementById("input-welcome-name");
    if (input) input.value = (AppState.userName !== "Champion") ? AppState.userName : "";

    const grid = document.getElementById("welcome-avatar-picker-grid");
    if (grid) {
      grid.querySelectorAll(".avatar-choice-btn").forEach((b) => {
        b.classList.toggle("is-selected", b.getAttribute("data-avatar-id") === AppState.userAvatar);
      });
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
  },

  closeWelcomeModal() {
    const modal = document.getElementById("modal-welcome");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  },

  completeOnboarding() {
    const input = document.getElementById("input-welcome-name");
    const nameVal = input ? input.value.trim() : "";
    const finalName = nameVal || "Champion";

    const selectedBtn = document.querySelector("#welcome-avatar-picker-grid .avatar-choice-btn.is-selected");
    const finalAvatar = selectedBtn ? selectedBtn.getAttribute("data-avatar-id") : "sprout";

    StorageManager.setUserName(finalName);
    StorageManager.setUserAvatar(finalAvatar);
    StorageManager.setOnboarded(true);

    AppState.userName = finalName;
    AppState.userAvatar = finalAvatar;

    this.applyUserProfile();
    this.closeWelcomeModal();
  },

  switchScreen(targetScreen) {
    AppState.currentScreen = targetScreen;

    Object.entries(this.screenIds).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (key === targetScreen) {
        el.classList.add("is-visible");
        requestAnimationFrame(() => el.classList.add("is-active"));
      } else {
        el.classList.remove("is-active");
        el.classList.remove("is-visible");
      }
    });

    // Handle audio when leaving screens
    if (targetScreen !== "reading" && !AppState.isWritingAmbientPlaying) {
      AudioController.fadeOutMusic(800);
    }
  },

  renderTopicsList() {
    const listEl = document.getElementById("topic-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    const completedMap = StorageManager.getCompletedTopics();
    const isSpeakingMode = AppState.mode === "speaking";

    TOPICS.forEach((topic) => {
      const li = document.createElement("li");
      li.className = "topic-item";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topic-row-btn";
      btn.setAttribute("data-topic-id", String(topic.id));

      const left = document.createElement("div");
      left.className = "topic-left";

      const num = document.createElement("span");
      num.className = "topic-number-circle";
      num.textContent = topic.id < 10 ? "0" + topic.id : String(topic.id);

      const info = document.createElement("div");
      info.className = "topic-info";

      const title = document.createElement("span");
      title.className = "topic-name";
      title.textContent = topic.title;
      info.appendChild(title);

      if (isSpeakingMode) {
        const record = completedMap[topic.id];
        if (record && record.completed) {
          const status = document.createElement("span");
          status.className = "topic-status is-complete";
          status.innerHTML = `<span>✔ Read before · ${record.level} · ${record.wpm} wpm</span>`;
          info.appendChild(status);
        }
      } else {
        const writing = StorageManager.getTopicWriting(topic.id);
        const status = document.createElement("span");
        if (writing && writing.wordCount > 0) {
          const isTarget = writing.wordCount >= 50 && writing.wordCount <= 100;
          status.className = "topic-status " + (isTarget ? "is-complete" : "");
          status.innerHTML = `${isTarget ? "✔ " : ""}Saved · ${writing.wordCount} words · ${writing.targetWordsUsed || 0}/5 targets`;
        } else {
          status.className = "topic-status";
          status.textContent = "Not started yet";
        }
        info.appendChild(status);
      }

      left.appendChild(num);
      left.appendChild(info);

      let badge;
      if (isSpeakingMode) {
        badge = document.createElement("span");
        badge.className = "level-pill";
        badge.textContent = topic.defaultLevel + " · A1–B1";
      } else {
        const writing = StorageManager.getTopicWriting(topic.id);
        badge = document.createElement("span");
        const hasSaved = writing && writing.wordCount >= 50;
        badge.className = "writing-status-badge " + (hasSaved ? "has-saved" : "");
        badge.textContent = hasSaved ? "Completed ✔" : (writing ? "Draft" : "50–100 words");
      }

      btn.appendChild(left);
      btn.appendChild(badge);

      btn.addEventListener("click", () => {
        if (AppState.mode === "speaking") {
          this.openSetupScreen(topic.id);
        } else {
          this.openWritingScreen(topic.id);
        }
      });

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  },

  openSetupScreen(topicId) {
    AppState.customTeleprompterText = null;
    AppState.selectedTopicId = Number(topicId);
    const topic = getTopicById(AppState.selectedTopicId);
    const savedLevel = StorageManager.getLevel();
    AppState.selectedLevel = savedLevel || topic.defaultLevel || "A1";

    const numberStr = topic.id < 10 ? "0" + topic.id : String(topic.id);
    document.getElementById("setup-topic-number").textContent = "Topic " + numberStr;
    document.getElementById("setup-topic-title").textContent = topic.title;

    this.syncSetupControls();
    this.switchScreen("setup");
  },

  openWritingScreen(topicId) {
    WritingController.initForTopic(topicId);
    this.switchScreen("writing");
  },

  syncSetupControls() {
    const text = getActiveTopicText();
    const words = countWords(text);
    const estimatedSeconds = Math.round((words / AppState.wpm) * 60);
    const activeTrack = getTrackById(AppState.selectedTrackId);

    document.getElementById("setup-word-count").textContent = words + " words";
    document.getElementById("setup-estimated-time").textContent = formatSecondsAsTime(estimatedSeconds);
    document.getElementById("setup-pace-display").textContent = AppState.wpm + " wpm";
    document.getElementById("setup-level-label").textContent = "Level " + AppState.selectedLevel;
    document.getElementById("setup-track-name").textContent = activeTrack.name;

    const setupSpeedSlider = document.getElementById("setup-speed-slider");
    if (setupSpeedSlider) setupSpeedSlider.value = String(AppState.wpm);

    const readingSpeedSlider = document.getElementById("reading-speed-slider");
    if (readingSpeedSlider) readingSpeedSlider.value = String(AppState.wpm);

    const readingSpeedValue = document.getElementById("reading-pace-info");
    if (readingSpeedValue) readingSpeedValue.textContent = AppState.wpm + " wpm";

    const levelButtons = document.querySelectorAll("#setup-level-selector .level-btn");
    levelButtons.forEach((btn) => {
      const lvl = btn.getAttribute("data-level");
      const isSelected = lvl === AppState.selectedLevel;
      btn.classList.toggle("is-selected", isSelected);
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    const trackButtons = document.querySelectorAll("#lofi-track-selector .lofi-track-btn");
    trackButtons.forEach((btn) => {
      const id = Number(btn.getAttribute("data-track"));
      const isSelected = id === AppState.selectedTrackId;
      btn.classList.toggle("is-selected", isSelected);
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    const volSlider = document.getElementById("volume-slider");
    const volValue = document.getElementById("volume-value");
    if (volSlider) volSlider.value = String(AppState.volume);
    if (volValue) volValue.textContent = AppState.volume + "%";

    this.renderVocabulary();
  },

  renderVocabulary() {
    const listEl = document.getElementById("vocab-list");
    const tagEl = document.getElementById("vocab-level-tag");
    const passagePreviewEl = document.getElementById("interactive-passage-preview");

    if (tagEl) tagEl.textContent = `Level ${AppState.selectedLevel}`;

    const vocabData =
      (TOPIC_VOCABULARY[AppState.selectedTopicId] &&
        TOPIC_VOCABULARY[AppState.selectedTopicId][AppState.selectedLevel]) ||
      [];

    if (listEl) {
      listEl.innerHTML = "";
      vocabData.forEach((item) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "vocab-item";
        card.innerHTML = `
          <div class="vocab-item-text">
            <span class="vocab-word-en">${item.word}</span>
            <span class="vocab-word-uz">${item.uz}</span>
          </div>
          <div class="vocab-speaker-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </div>
        `;
        card.addEventListener("click", () => {
          card.classList.add("is-speaking");
          speakWord(item.word, null, () => card.classList.remove("is-speaking"));
        });
        listEl.appendChild(card);
      });
    }

    if (passagePreviewEl) {
      passagePreviewEl.innerHTML = "";
      const passageText = getActiveTopicText();
      const words = passageText.split(/\s+/).filter(Boolean);

      words.forEach((rawWord) => {
        const span = document.createElement("span");
        span.className = "interactive-word";
        span.textContent = rawWord + " ";
        span.setAttribute("role", "button");
        span.setAttribute("tabindex", "0");

        const cleanWord = rawWord.replace(/^[^\w']+|[^\w']+$/g, "").trim();
        if (cleanWord) {
          const speakThis = (e) => {
            if (e) e.stopPropagation();
            span.classList.add("is-speaking");
            speakWord(cleanWord, null, () => span.classList.remove("is-speaking"));
          };
          span.addEventListener("click", speakThis);
          span.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              speakThis();
            }
          });
        }
        passagePreviewEl.appendChild(span);
      });
    }
  },

  setWpm(newWpm) {
    const parsed = parseInt(newWpm, 10);
    if (isNaN(parsed)) return;
    const clamped = Math.max(MIN_WPM, Math.min(MAX_WPM, parsed));
    AppState.wpm = clamped;
    StorageManager.setWpm(clamped);
    this.syncSetupControls();
    if (AppState.currentScreen === "reading" && AppState.isPaused) {
      this.togglePause(false);
    }
  },

  setLevel(newLevel) {
    if (newLevel !== "A1" && newLevel !== "A2" && newLevel !== "B1") return;
    AppState.selectedLevel = newLevel;
    StorageManager.setLevel(newLevel);
    this.syncSetupControls();
  },

  setTrack(trackId, previewImmediately = true) {
    const parsed = parseInt(trackId, 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 5) return;
    AppState.selectedTrackId = parsed;
    StorageManager.setTrackId(parsed);
    this.syncSetupControls();
    if (previewImmediately) AudioController.previewTrackOnSetup(parsed);
  },

  setVolume(newVolume) {
    const clamped = Math.max(0, Math.min(100, Number(newVolume)));
    AppState.volume = clamped;
    StorageManager.setVolume(clamped);
    const volumeValue = document.getElementById("volume-value");
    if (volumeValue) volumeValue.textContent = clamped + "%";
    AudioController.syncMusicVolume();
  },

  async startReadingSession() {
    const token = ++AppState.sessionToken;
    AppState.isPaused = false;
    AppState.isInStartSequence = true;
    AppState.isScrolling = false;
    AppState.elapsedSeconds = 0;

    this.updatePauseUI();
    this.syncSetupControls();

    const passageText = getActiveTopicText();
    const overlay = document.getElementById("sequence-overlay");
    const promptEl = document.getElementById("sequence-prompt");
    const subEl = document.getElementById("sequence-sub");
    const countdownEl = document.getElementById("countdown-display");

    overlay.classList.remove("is-hidden");
    promptEl.textContent = "Speak fast and clear";
    subEl.textContent = "Get ready to read aloud";
    countdownEl.textContent = "";

    this.switchScreen("reading");

    await new Promise((r) => requestAnimationFrame(r));
    if (token !== AppState.sessionToken) return;

    RainController.start();
    TeleprompterController.prepareText(passageText);

    // Audio fade in and intro speech
    const musicFadePromise = AudioController.fadeInMusic(1800, token);
    await AudioController.playIntroVoice(token);
    if (token !== AppState.sessionToken) return;

    await musicFadePromise;
    if (token !== AppState.sessionToken) return;

    promptEl.textContent = "";
    subEl.textContent = "";

    for (const num of [3, 2, 1]) {
      if (token !== AppState.sessionToken) return;
      countdownEl.textContent = String(num);
      await new Promise((r) => setTimeout(r, 700));
    }

    if (token !== AppState.sessionToken) return;

    countdownEl.textContent = "";
    overlay.classList.add("is-hidden");
    AppState.isInStartSequence = false;

    TeleprompterController.measureLayout(true);
    TeleprompterController.startLoop(token);
  },

  togglePause(forcePause) {
    if (AppState.currentScreen !== "reading" || AppState.isInStartSequence) return;
    const nextPaused = typeof forcePause === "boolean" ? forcePause : !AppState.isPaused;
    if (nextPaused === AppState.isPaused) return;

    AppState.isPaused = nextPaused;
    if (!AppState.isPaused) {
      TeleprompterController.lastFrameTime = performance.now();
    }
    this.updatePauseUI();
    AudioController.syncMusicVolume();
  },

  updatePauseUI() {
    const pauseBtn = document.getElementById("btn-pause-resume");
    const banner = document.getElementById("paused-banner");
    if (pauseBtn) {
      pauseBtn.textContent = AppState.isPaused ? "Resume" : "Pause";
      pauseBtn.setAttribute("aria-pressed", AppState.isPaused ? "true" : "false");
    }
    if (banner) {
      banner.classList.toggle("is-shown", AppState.isPaused);
    }
  },

  exitReadingSession() {
    AppState.sessionToken++;
    AppState.isPaused = false;
    AppState.isInStartSequence = false;
    AppState.isScrolling = false;

    TeleprompterController.stopLoop();
    RainController.stop();
    AudioController.fadeOutMusic(1000);

    this.renderTopicsList();
    this.switchScreen("topics");
  },

  completeReadingSession() {
    AppState.sessionToken++;
    AppState.isPaused = false;
    AppState.isInStartSequence = false;
    AppState.isScrolling = false;

    RainController.stop();
    AudioController.fadeOutMusic(1800);

    const topic = getTopicById(AppState.selectedTopicId);
    const totalSeconds = Math.max(1, Math.round(AppState.elapsedSeconds));

    if (!AppState.customTeleprompterText) {
      StorageManager.markTopicCompleted(topic.id, AppState.selectedLevel, AppState.wpm, totalSeconds);
      AppState.xp = StorageManager.addXP(20);
      this.updateGamifiedHeader();
      this.renderLearningPath();
    }

    document.getElementById("result-topic-title").textContent = topic.title;
    document.getElementById("result-speed-used").textContent = (AppState.customTeleprompterText ? "Custom Essay" : AppState.selectedLevel) + " · " + AppState.wpm + " wpm";
    document.getElementById("result-total-time").textContent = formatSecondsAsTime(totalSeconds);

    this.renderSpeakingQuestions(topic);
    this.renderTopicsList();
    this.switchScreen("result");
  },

  renderSpeakingQuestions(topic) {
    const container = document.getElementById("speaking-questions-container");
    if (!container) return;

    container.innerHTML = "";
    topic.questions.forEach((qText, idx) => {
      const qIndex = idx + 1;
      const card = document.createElement("div");
      card.className = "question-card";
      card.id = `question-card-${qIndex}`;

      card.innerHTML = `
        <div class="question-header">
          <span class="question-number-badge">Question 0${qIndex}</span>
          <span class="question-timer" id="q-timer-${qIndex}">0:30</span>
        </div>
        <p class="question-text">${qText}</p>
        <div class="question-controls">
          <button type="button" class="btn-record-answer" id="q-btn-rec-${qIndex}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
            <span>Record Answer (30s)</span>
          </button>
          <div id="q-playback-container-${qIndex}"></div>
        </div>
      `;

      const btnRec = card.querySelector(`#q-btn-rec-${qIndex}`);
      btnRec.addEventListener("click", () => {
        if (VoiceRecorderController.activeQuestionIndex === qIndex && VoiceRecorderController.mediaRecorder && VoiceRecorderController.mediaRecorder.state === "recording") {
          VoiceRecorderController.stopRecording();
        } else {
          VoiceRecorderController.startRecording(qIndex);
        }
      });

      container.appendChild(card);
    });
  },

  bindEvents() {
    // Mode switcher buttons
    document.querySelectorAll(".mode-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.applyMode(btn.getAttribute("data-mode"));
      });
    });

    // Theme toggles
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleTheme();
      });
    });

    // Back button on Setup
    const btnBack = document.getElementById("btn-setup-back");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        AudioController.stopMusicImmediate();
        this.renderTopicsList();
        this.switchScreen("topics");
      });
    }

    // Setup level buttons
    const levelBtns = document.querySelectorAll("#setup-level-selector .level-btn");
    levelBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setLevel(btn.getAttribute("data-level"));
      });
    });

    // Speed slider on setup
    const setupSpeedSlider = document.getElementById("setup-speed-slider");
    if (setupSpeedSlider) {
      setupSpeedSlider.addEventListener("input", (e) => {
        this.setWpm(e.target.value);
      });
    }

    // Live speed slider on reading bar
    const readingSpeedSlider = document.getElementById("reading-speed-slider");
    if (readingSpeedSlider) {
      readingSpeedSlider.addEventListener("input", (e) => {
        e.stopPropagation();
        this.setWpm(e.target.value);
      });
      readingSpeedSlider.addEventListener("click", (e) => e.stopPropagation());
    }

    // Track buttons
    const trackBtns = document.querySelectorAll("#lofi-track-selector .lofi-track-btn");
    trackBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setTrack(btn.getAttribute("data-track"), true);
      });
    });

    // Volume slider
    const volumeSlider = document.getElementById("volume-slider");
    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        this.setVolume(Number(e.target.value));
      });
    }

    // Start reading button
    const btnStart = document.getElementById("btn-start-reading");
    if (btnStart) {
      btnStart.addEventListener("click", () => {
        this.startReadingSession();
      });
    }

    // Teleprompter tap to pause
    const stage = document.getElementById("teleprompter-stage");
    if (stage) {
      stage.addEventListener("click", () => this.togglePause());
    }

    // Pause/Resume button
    const btnPause = document.getElementById("btn-pause-resume");
    if (btnPause) {
      btnPause.addEventListener("click", (e) => {
        e.stopPropagation();
        this.togglePause();
      });
    }

    // Exit reading
    const btnExit = document.getElementById("btn-exit-reading");
    if (btnExit) {
      btnExit.addEventListener("click", (e) => {
        e.stopPropagation();
        this.exitReadingSession();
      });
    }

    // Result actions
    const btnReadAgain = document.getElementById("btn-read-again");
    if (btnReadAgain) {
      btnReadAgain.addEventListener("click", () => {
        this.startReadingSession();
      });
    }

    const btnJumpWrite = document.getElementById("btn-jump-write");
    if (btnJumpWrite) {
      btnJumpWrite.addEventListener("click", () => {
        this.openWritingScreen(AppState.selectedTopicId);
      });
    }

    const btnNextTopic = document.getElementById("btn-next-topic");
    if (btnNextTopic) {
      btnNextTopic.addEventListener("click", () => {
        const nextId = AppState.selectedTopicId >= TOPICS.length ? 1 : AppState.selectedTopicId + 1;
        this.openSetupScreen(nextId);
      });
    }

    const btnAllTopics = document.getElementById("btn-all-topics");
    if (btnAllTopics) {
      btnAllTopics.addEventListener("click", () => {
        this.renderTopicsList();
        this.switchScreen("topics");
      });
    }

    // Writing Screen events
    const btnBackWriting = document.getElementById("btn-writing-back");
    if (btnBackWriting) {
      btnBackWriting.addEventListener("click", () => {
        if (AppState.isWritingAmbientPlaying) {
          WritingController.toggleAmbientSound();
        }
        this.renderTopicsList();
        this.switchScreen("topics");
      });
    }

    const btnAmbient = document.getElementById("btn-writing-ambient");
    if (btnAmbient) {
      btnAmbient.addEventListener("click", () => {
        WritingController.toggleAmbientSound();
      });
    }

    const writingTextarea = document.getElementById("writing-textarea");
    if (writingTextarea) {
      writingTextarea.addEventListener("input", () => {
        WritingController.handleTextChange();
      });
    }

    const btnSaveWriting = document.getElementById("btn-save-writing");
    if (btnSaveWriting) {
      btnSaveWriting.addEventListener("click", () => {
        WritingController.saveCurrentWriting();
      });
    }

    const btnClearWriting = document.getElementById("btn-clear-writing");
    if (btnClearWriting) {
      btnClearWriting.addEventListener("click", () => {
        WritingController.clearCurrentWriting();
      });
    }

    const btnSpeakWritten = document.getElementById("btn-speak-written-text");
    if (btnSpeakWritten) {
      btnSpeakWritten.addEventListener("click", () => {
        WritingController.practiceSpeakingWrittenText();
      });
    }

    // View Mode Toggle (Path vs List)
    const btnToggleView = document.getElementById("btn-toggle-view");
    if (btnToggleView) {
      btnToggleView.addEventListener("click", () => {
        this.toggleViewMode();
      });
    }

    // Hero Continue Learning Button
    const btnHeroContinue = document.getElementById("btn-hero-continue");
    if (btnHeroContinue) {
      btnHeroContinue.addEventListener("click", () => {
        if (AppState.mode === "speaking") {
          this.openSetupScreen(AppState.selectedTopicId || 1);
        } else {
          this.openWritingScreen(AppState.selectedTopicId || 1);
        }
      });
    }

    // Floating Bottom Dock Navigation
    const dockPath = document.getElementById("dock-btn-path");
    if (dockPath) {
      dockPath.addEventListener("click", () => {
        this.renderLearningPath();
        this.renderTopicsList();
        this.switchScreen("topics");
        this.applyViewMode("path");
      });
    }

    const dockSpeaking = document.getElementById("dock-btn-speaking");
    if (dockSpeaking) {
      dockSpeaking.addEventListener("click", () => {
        this.applyMode("speaking");
        this.openSetupScreen(AppState.selectedTopicId || 1);
      });
    }

    const dockWriting = document.getElementById("dock-btn-writing");
    if (dockWriting) {
      dockWriting.addEventListener("click", () => {
        this.applyMode("writing");
        this.openWritingScreen(AppState.selectedTopicId || 1);
      });
    }

    const dockRec = document.getElementById("dock-btn-recordings");
    if (dockRec) {
      dockRec.addEventListener("click", () => {
        this.openRecordingsModal();
      });
    }

    const dockTheme = document.getElementById("dock-btn-theme");
    if (dockTheme) {
      dockTheme.addEventListener("click", () => {
        this.toggleTheme();
      });
    }

    // Recordings Modal Trigger & Close Events
    const btnOpenRec = document.getElementById("btn-open-recordings");
    if (btnOpenRec) {
      btnOpenRec.addEventListener("click", () => {
        this.openRecordingsModal();
      });
    }

    const btnCloseModal = document.getElementById("btn-close-modal");
    if (btnCloseModal) {
      btnCloseModal.addEventListener("click", () => {
        this.closeRecordingsModal();
      });
    }

    const modalBackdrop = document.getElementById("modal-recordings");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) {
          this.closeRecordingsModal();
        }
      });
    }

    // Settings & Profile Modal Events
    const headerMenuBtn = document.getElementById("header-menu-btn");
    if (headerMenuBtn) {
      headerMenuBtn.addEventListener("click", () => {
        this.openSettingsModal();
      });
    }

    const userAvatarBtn = document.getElementById("user-avatar-btn");
    if (userAvatarBtn) {
      userAvatarBtn.addEventListener("click", () => {
        this.openSettingsModal();
      });
      userAvatarBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openSettingsModal();
        }
      });
    }

    const btnCloseSettings = document.getElementById("btn-close-settings-modal");
    if (btnCloseSettings) {
      btnCloseSettings.addEventListener("click", () => {
        this.closeSettingsModal();
      });
    }

    const btnCancelSettings = document.getElementById("btn-cancel-settings");
    if (btnCancelSettings) {
      btnCancelSettings.addEventListener("click", () => {
        this.closeSettingsModal();
      });
    }

    const btnSaveSettings = document.getElementById("btn-save-settings");
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener("click", () => {
        this.saveSettings();
      });
    }

    const settingsThemeToggle = document.getElementById("settings-theme-toggle");
    if (settingsThemeToggle) {
      settingsThemeToggle.addEventListener("change", (e) => {
        const next = e.target.checked ? "dark" : "light";
        this.applyTheme(next);
      });
    }

    const modalSettingsBackdrop = document.getElementById("modal-settings");
    if (modalSettingsBackdrop) {
      modalSettingsBackdrop.addEventListener("click", (e) => {
        if (e.target === modalSettingsBackdrop) {
          this.closeSettingsModal();
        }
      });
    }

    // Welcome Onboarding Events
    const btnStartOnboarding = document.getElementById("btn-start-onboarding");
    if (btnStartOnboarding) {
      btnStartOnboarding.addEventListener("click", () => {
        this.completeOnboarding();
      });
    }

    const modalWelcomeBackdrop = document.getElementById("modal-welcome");
    if (modalWelcomeBackdrop) {
      modalWelcomeBackdrop.addEventListener("click", (e) => {
        if (e.target === modalWelcomeBackdrop) {
          this.completeOnboarding();
        }
      });
    }

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (AppState.currentScreen === "reading") {
        if (e.code === "Space") {
          e.preventDefault();
          this.togglePause();
        } else if (e.code === "ArrowUp") {
          e.preventDefault();
          this.setWpm(AppState.wpm + 10);
        } else if (e.code === "ArrowDown") {
          e.preventDefault();
          this.setWpm(AppState.wpm - 10);
        } else if (e.code === "Escape") {
          e.preventDefault();
          this.exitReadingSession();
        }
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && AppState.currentScreen === "reading") {
        this.togglePause(true);
      }
    });

    window.addEventListener("resize", () => {
      if (AppState.currentScreen === "reading") {
        RainController.resize();
        TeleprompterController.measureLayout(false);
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  UIController.init();
});
