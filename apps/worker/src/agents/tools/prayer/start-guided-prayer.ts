import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Simple ID generator
 */
function createId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Prayer configurations for different prayer types
 */
const PRAYER_CONFIGS = {
  rosary: {
    totalSteps: 5,
    mysteries: {
      joyful: [
        {
          name: 'The First Joyful Mystery: The Annunciation',
          scripture: 'Luke 1:26-38',
          reflection: 'The angel Gabriel announced to Mary that she would conceive and bear the Son of God. Mary said "yes" to God\'s plan, changing history forever.',
          fruit: 'Humility',
        },
        {
          name: 'The Second Joyful Mystery: The Visitation',
          scripture: 'Luke 1:39-56',
          reflection: 'Mary, pregnant with Jesus, visited her cousin Elizabeth. John the Baptist leaped in Elizabeth\'s womb at the presence of the Lord.',
          fruit: 'Love of neighbor',
        },
        {
          name: 'The Third Joyful Mystery: The Nativity',
          scripture: 'Luke 2:1-20',
          reflection: 'Jesus was born in a humble stable in Bethlehem. Angels announced the good news to shepherds who came to worship the newborn King.',
          fruit: 'Poverty of spirit',
        },
        {
          name: 'The Fourth Joyful Mystery: The Presentation',
          scripture: 'Luke 2:22-40',
          reflection: 'Mary and Joseph presented Jesus in the Temple. Simeon and Anna recognized Him as the Messiah and praised God.',
          fruit: 'Obedience',
        },
        {
          name: 'The Fifth Joyful Mystery: The Finding in the Temple',
          scripture: 'Luke 2:41-52',
          reflection: 'Jesus was found in the Temple discussing with the teachers, amazing them with His understanding. He returned to Nazareth and was obedient to Mary and Joseph.',
          fruit: 'Joy in finding Jesus',
        },
      ],
      sorrowful: [
        {
          name: 'The First Sorrowful Mystery: The Agony in the Garden',
          scripture: 'Matthew 26:36-46',
          reflection: 'Jesus prayed in the Garden of Gethsemane, experiencing great sorrow. "Not my will, but yours be done," He prayed to the Father.',
          fruit: 'Sorrow for sin',
        },
        {
          name: 'The Second Sorrowful Mystery: The Scourging at the Pillar',
          scripture: 'Matthew 27:26',
          reflection: 'Jesus was brutally scourged by Roman soldiers. His body was wounded for our sins, bearing pain with silence and courage.',
          fruit: 'Purity',
        },
        {
          name: 'The Third Sorrowful Mystery: The Crowning with Thorns',
          scripture: 'Matthew 27:27-31',
          reflection: 'Soldiers mocked Jesus, placing a crown of thorns on His head. He endured humiliation for love of us.',
          fruit: 'Moral courage',
        },
        {
          name: 'The Fourth Sorrowful Mystery: The Carrying of the Cross',
          scripture: 'Matthew 27:32',
          reflection: 'Jesus carried the heavy cross to Calvary. He fell under its weight but continued, showing us how to bear our own crosses.',
          fruit: 'Patience',
        },
        {
          name: 'The Fifth Sorrowful Mystery: The Crucifixion',
          scripture: 'Matthew 27:33-56',
          reflection: 'Jesus died on the cross, surrendering His spirit to the Father. "Father, forgive them," He prayed for those who crucified Him.',
          fruit: 'Self-denial',
        },
      ],
      glorious: [
        {
          name: 'The First Glorious Mystery: The Resurrection',
          scripture: 'Matthew 28:1-10',
          reflection: 'Jesus rose from the dead, conquering sin and death. The tomb was empty - He is alive forever!',
          fruit: 'Faith',
        },
        {
          name: 'The Second Glorious Mystery: The Ascension',
          scripture: 'Mark 16:19-20',
          reflection: 'Jesus ascended into heaven and sits at the right hand of the Father. He promised to be with us always, until the end of the age.',
          fruit: 'Hope',
        },
        {
          name: 'The Third Glorious Mystery: The Descent of the Holy Spirit',
          scripture: 'Acts 2:1-4',
          reflection: 'The Holy Spirit descended on the apostles at Pentecost. They were filled with courage to preach the Gospel to all nations.',
          fruit: 'Love of God',
        },
        {
          name: 'The Fourth Glorious Mystery: The Assumption',
          scripture: 'Revelation 12:1',
          reflection: 'Mary was taken body and soul into heavenly glory. She is with her Son forever, interceding for us.',
          fruit: 'Grace of a happy death',
        },
        {
          name: 'The Fifth Glorious Mystery: The Coronation of Mary',
          scripture: 'Revelation 12:1',
          reflection: 'Mary was crowned Queen of Heaven and Earth. All generations call her blessed, honoring her as the Mother of God.',
          fruit: 'Trust in Mary\'s intercession',
        },
      ],
      luminous: [
        {
          name: 'The First Luminous Mystery: The Baptism of Jesus',
          scripture: 'Matthew 3:13-17',
          reflection: 'Jesus was baptized by John in the Jordan River. The Father\'s voice declared, "This is my beloved Son," and the Holy Spirit descended like a dove.',
          fruit: 'Openness to the Holy Spirit',
        },
        {
          name: 'The Second Luminous Mystery: The Wedding at Cana',
          scripture: 'John 2:1-12',
          reflection: 'Jesus performed His first miracle at Mary\'s request, turning water into wine. Mary tells us, "Do whatever He tells you."',
          fruit: 'To Jesus through Mary',
        },
        {
          name: 'The Third Luminous Mystery: The Proclamation of the Kingdom',
          scripture: 'Mark 1:15',
          reflection: 'Jesus proclaimed the Kingdom of God, calling all to repentance and faith. He taught through parables and healed the sick.',
          fruit: 'Desire for holiness',
        },
        {
          name: 'The Fourth Luminous Mystery: The Transfiguration',
          scripture: 'Matthew 17:1-8',
          reflection: 'Jesus revealed His divine glory on Mount Tabor. His face shone like the sun and His clothes became dazzling white.',
          fruit: 'Spiritual communion',
        },
        {
          name: 'The Fifth Luminous Mystery: The Institution of the Eucharist',
          scripture: 'Matthew 26:26-29',
          reflection: 'At the Last Supper, Jesus gave us His Body and Blood in the Eucharist. "Do this in memory of me," He commanded.',
          fruit: 'Adoration',
        },
      ],
    },
  },
  examen: {
    totalSteps: 5,
    steps: [
      {
        name: 'Step 1: Become Aware of God\'s Presence',
        guidance: 'Quiet yourself and become aware that you are in God\'s loving presence. God has been with you throughout this day, even when you didn\'t realize it.',
        prompt: 'Take a moment to breathe deeply and acknowledge that God is here with you now. How does it feel to be in God\'s presence?',
      },
      {
        name: 'Step 2: Review Your Day with Gratitude',
        guidance: 'Look back on your day, from morning until now. Notice the gifts God has given you - both big and small.',
        prompt: 'What are you grateful for from today? What moments brought you joy, peace, or comfort? Thank God for these gifts.',
      },
      {
        name: 'Step 3: Pay Attention to Your Emotions',
        guidance: 'Notice your feelings as you reviewed your day. What moments brought you life? What moments drained you? Your emotions are signs of where God was present.',
        prompt: 'When did you feel most alive today? When did you feel drained, anxious, or sad? What might God be saying to you through these feelings?',
      },
      {
        name: 'Step 4: Ask for Forgiveness and Grace',
        guidance: 'Look at your sins and failures with honesty but without shame. Ask God for forgiveness and for the grace to grow.',
        prompt: 'Where did you fall short today? Where did you fail to love as God calls you to? Ask God\'s forgiveness and the grace to do better tomorrow.',
      },
      {
        name: 'Step 5: Look Toward Tomorrow',
        guidance: 'End with hope and trust in God\'s mercy. Commit to making one small change tomorrow.',
        prompt: 'What is one thing you can do tomorrow to respond more fully to God\'s love? Trust in God\'s grace and say, "Amen."',
      },
    ],
  },
  'guided-meditation': {
    totalSteps: 4,
    steps: [
      {
        name: 'Step 1: Prepare Your Heart',
        guidance: 'Find a comfortable position. Close your eyes or soften your gaze. Take a deep breath and exhale slowly.',
        prompt: 'As you breathe in, say silently, "Lord Jesus Christ, Son of God." As you breathe out, say, "Have mercy on me, a sinner." Repeat this slowly three times.',
      },
      {
        name: 'Step 2: Reflect on Scripture',
        guidance: 'Listen to God\'s word. Let it enter your mind and heart. Don\'t analyze - just receive.',
        prompt: 'Read the Scripture passage slowly. What word or phrase stands out to you? Repeat it gently and let it speak to your heart.',
      },
      {
        name: 'Step 3: Respond in Prayer',
        guidance: 'Speak to God from your heart. Share your thoughts, feelings, and desires.',
        prompt: 'What is God saying to you through this passage? How do you want to respond? Share your heart with God.',
      },
      {
        name: 'Step 4: Rest in God\'s Presence',
        guidance: 'Simply be with God. No words needed. Rest in His love.',
        prompt: 'Sit in silence for a few moments, enjoying God\'s presence. When you\'re ready, say "Amen" and gently return to your day.',
      },
    ],
  },
  'breath-prayer': {
    totalSteps: 3,
    steps: [
      {
        name: 'Step 1: Choose Your Prayer',
        guidance: 'A breath prayer is a short prayer repeated with your breath. Choose one that speaks to your heart.',
        prompt: 'Traditional options: "Lord Jesus Christ, have mercy on me" or "Maranatha - Come, Lord Jesus" or create your own short prayer.',
      },
      {
        name: 'Step 2: Sync with Breath',
        guidance: 'Silently pray the first half as you breathe in, the second half as you breathe out.',
        prompt: 'Inhale: "Lord Jesus Christ" - Exhale: "Have mercy on me." Find a rhythm that feels natural.',
      },
      {
        name: 'Step 3: Pray for 5-10 Minutes',
        guidance: 'Continue this breath prayer, letting it become part of you. When distractions come, gently return to the prayer.',
        prompt: 'Give yourself to this prayer completely. Let your whole being - body, mind, and spirit - pray these words.',
      },
    ],
  },
  'divine-office': {
    totalSteps: 4,
    steps: [
      {
        name: 'Step 1: Opening',
        guidance: 'Begin by making the Sign of the Cross. "God, come to my assistance. Lord, make haste to help me."',
        prompt: 'Glory to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and will be forever. Amen.',
      },
      {
        name: 'Step 2: Psalmody',
        guidance: 'Pray with the Psalms - the prayer book of Jesus. Let the words become your own prayer.',
        prompt: 'Pray the assigned psalm slowly. Pause between verses. Let the words speak to your current situation.',
      },
      {
        name: 'Step 3: Reading and Response',
        guidance: 'Listen to a short Scripture passage and respond with thanksgiving.',
        prompt: 'What is God saying to you in this reading? How will you respond? Offer a short prayer of thanksgiving.',
      },
      {
        name: 'Step 4: Concluding Prayer',
        guidance: 'End with the prayer of the day, committing yourself to God\'s care.',
        prompt: 'Pray the final prayer, then make the Sign of the Cross. "May the Lord bless us, protect us from all evil, and bring us to everlasting life. Amen."',
      },
    ],
  },
};

/**
 * Start Guided Prayer Tool
 * Creates a new prayer session with step-by-step guidance
 */
export const startGuidedPrayerTool = createTool({
  id: 'start-guided-prayer',
  description: 'Start a guided prayer session (rosary, examen, meditation). Creates a new prayer session with step-by-step guidance. Always use this when users want to pray structured prayers.',
  inputSchema: z.object({
    prayerType: z.enum(['rosary', 'examen', 'guided-meditation', 'breath-prayer', 'divine-office']).describe('Type of guided prayer'),
    mysteryType: z.enum(['joyful', 'sorrowful', 'glorious', 'luminous']).optional().describe('For rosary: which mysteries to pray'),
    meditationTopic: z.string().optional().describe('For meditation: scripture passage or theme'),
    resumeSessionId: z.string().optional().describe('Resume an existing prayer session'),
  }),
  execute: async ({ prayerType, mysteryType, meditationTopic, resumeSessionId }, context) => {
    const db = (context as any)?.db;
    const userId = (context as any)?.userId;

    if (!db || !userId) {
      return {
        error: 'Database or user context not available',
        prayerType,
      };
    }

    try {
      let sessionId = resumeSessionId;
      let currentStep = 1;
      let config = PRAYER_CONFIGS[prayerType];
      let stepData: any = { mysteryType, meditationTopic };

      // Resume existing session or create new one
      if (resumeSessionId) {
        const existingSession = await db
          .prepare('SELECT * FROM prayer_sessions WHERE id = ? AND user_id = ?')
          .bind(resumeSessionId, userId)
          .first();

        if (existingSession) {
          const session = existingSession as any;
          sessionId = session.id;
          currentStep = session.current_step;
          stepData = JSON.parse(session.step_data || '{}');
        } else {
          return {
            error: 'Prayer session not found',
            resumeSessionId,
          };
        }
      } else {
        // Create new prayer session
        sessionId = createId();

        await db
          .prepare(
            'INSERT INTO prayer_sessions (id, user_id, prayer_type, current_step, total_steps, step_data, started_at, last_activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
          )
          .bind(
            sessionId,
            userId,
            prayerType,
            currentStep,
            config.totalSteps,
            JSON.stringify(stepData),
            new Date().toISOString(),
            new Date().toISOString()
          )
          .run();
      }

      // Get current step instruction
      const instruction = getPrayerStepInstruction(prayerType, currentStep, stepData);

      return {
        sessionId,
        prayerType,
        currentStep,
        totalSteps: config.totalSteps,
        instruction,
        canContinue: currentStep < config.totalSteps,
        canEnd: true,
      };
    } catch (error) {
      console.error('Error starting guided prayer:', error);
      return {
        error: 'Failed to start guided prayer',
        message: (error as Error).message,
      };
    }
  },
});

/**
 * Get instruction for a specific prayer step
 */
function getPrayerStepInstruction(prayerType: string, step: number, stepData: any): string {
  switch (prayerType) {
    case 'rosary':
      const mysterySet = stepData.mysteryType || 'joyful';
      const mystery = PRAYER_CONFIGS.rosary.mysteries[mysterySet as keyof typeof PRAYER_CONFIGS.rosary.mysteries]?.[step - 1];

      if (!mystery) {
        return `Invalid mystery type or step. Please start again.`;
      }

      return `**${mystery.name}**

Scripture: ${mystery.scripture}

${mystery.reflection}

Fruit of this mystery: ${mystery.fruit}

Pray one Our Father, ten Hail Marys, and one Glory Be, meditating on this mystery.

When you're ready, let me know and we'll continue to the next decade.`;

    case 'examen':
    case 'guided-meditation':
    case 'breath-prayer':
    case 'divine-office': {
      const config = PRAYER_CONFIGS[prayerType as 'examen' | 'guided-meditation' | 'breath-prayer' | 'divine-office'];
      const stepInfo = config.steps?.[step - 1];
      if (!stepInfo) {
        return 'Invalid step. Please start again.';
      }
      return `**${stepInfo.name}**

${stepInfo.guidance}

${stepInfo.prompt}

Take your time with this step. When you're ready to continue, let me know.`;
    }

    default:
      return 'Prayer session started. Take a moment to prepare your heart...';
  }
}
