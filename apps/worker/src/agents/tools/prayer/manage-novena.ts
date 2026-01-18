import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Simple ID generator
 */
function createId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Novena prayers for different types of novenas
 */
const NOVENA_PRAYERS = {
  'holy-spirit': [
    {
      day: 1,
      title: 'Come, Holy Spirit',
      prayer: `Holy Spirit, Lord of Light,
Come to us with your divine fire.
Enlighten our minds and hearts,
Fill us with your wisdom and love.
Guide our steps today and always.
Amen.`,
      reflection: 'The Holy Spirit is the breath of God, the source of all life and wisdom. Open your heart to receive the Spirit\'s gifts.',
    },
    {
      day: 2,
      title: 'Gift of Wisdom',
      prayer: `Holy Spirit, grant us the gift of Wisdom.
Help us to see the world through God's eyes,
To value what is truly important,
And to seek God's will in all things.
Amen.`,
      reflection: 'Wisdom helps us understand God\'s plan for our lives and the true meaning of our existence.',
    },
    {
      day: 3,
      title: 'Gift of Understanding',
      prayer: `Holy Spirit, grant us the gift of Understanding.
Open our minds to grasp the truths of faith,
Help us to see beyond appearances,
And to recognize God's presence in our lives.
Amen.`,
      reflection: 'Understanding allows us to penetrate the meaning of revealed truths and see how they apply to our lives.',
    },
    {
      day: 4,
      title: 'Gift of Counsel',
      prayer: `Holy Spirit, grant us the gift of Counsel.
Guide us in difficult decisions,
Help us to discern what is right,
And to follow God's path faithfully.
Amen.`,
      reflection: 'Counsel enables us to judge the best course of action in specific situations, guided by God\'s wisdom.',
    },
    {
      day: 5,
      title: 'Gift of Fortitude',
      prayer: `Holy Spirit, grant us the gift of Fortitude.
Give us courage to do what is right,
Strength to overcome temptation,
And perseverance in faith.
Amen.`,
      reflection: 'Fortitude gives us the strength to overcome difficulties and remain faithful to God\'s will.',
    },
    {
      day: 6,
      title: 'Gift of Knowledge',
      prayer: `Holy Spirit, grant us the gift of Knowledge.
Help us to know God more deeply,
To understand creation as His gift,
And to use all things for His glory.
Amen.`,
      reflection: 'Knowledge helps us see the created world as a reflection of God\'s goodness and love.',
    },
    {
      day: 7,
      title: 'Gift of Piety',
      prayer: `Holy Spirit, grant us the gift of Piety.
Fill our hearts with love for God,
Make us reverent and devout,
And draw us to prayer and worship.
Amen.`,
      reflection: 'Piety is a filial love for God that sees Him as our loving Father and treats Him with reverence.',
    },
    {
      day: 8,
      title: 'Gift of Fear of the Lord',
      prayer: `Holy Spirit, grant us the gift of Holy Fear.
Fill us with awe and reverence,
Help us to avoid sin,
And to respect God's holy name.
Amen.`,
      reflection: 'Fear of the Lord is not terror, but profound reverence and awe before God\'s majesty.',
    },
    {
      day: 9,
      title: 'Release the Holy Spirit',
      prayer: `Come, Holy Spirit, fill the hearts of your faithful
And kindle in them the fire of your love.
Send forth your Spirit, and they shall be created,
And you shall renew the face of the earth.
Amen.`,
      reflection: 'The Holy Spirit desires to transform you and work through you to renew the world.',
    },
  ],
  'sacred-heart': [
    {
      day: 1,
      title: 'Love of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Burning with love for us,
Set our hearts on fire with your love.
May we love you as you love us.
Amen.`,
      reflection: 'The Sacred Heart of Jesus symbolizes His infinite love for all humanity, poured out in sacrifice.',
    },
    {
      day: 2,
      title: 'Mercy of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Ocean of mercy for sinners,
Pour out your mercy upon us.
Forgive our sins and heal our hearts.
Amen.`,
      reflection: 'Jesus\' heart is always open to forgive and welcome back those who turn to Him.',
    },
    {
      day: 3,
      title: 'Peace of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Source of all true peace,
Give us the peace that only you can give.
Calm our fears and anxieties.
Amen.`,
      reflection: 'In Jesus\' heart, we find the peace that the world cannot give - the peace of knowing we are loved.',
    },
    {
      day: 4,
      title: 'Strength of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Our refuge and strength,
Be with us in our struggles.
Give us courage to carry our crosses.
Amen.`,
      reflection: 'When we are weak, the Sacred Heart gives us the strength to persevere and trust.',
    },
    {
      day: 5,
      title: 'Grace of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Fountain of all grace,
Pour out your blessings upon us.
Transform us by your love.
Amen.`,
      reflection: 'From the Sacred Heart flows every grace and blessing we need for our spiritual journey.',
    },
    {
      day: 6,
      title: 'Unity with the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Unite our hearts with yours,
That we may think and love as you do.
Make our hearts like yours.
Amen.`,
      reflection: 'Jesus desires to transform our hearts to be like His - full of love, mercy, and compassion.',
    },
    {
      day: 7,
      title: 'Consolation of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Comfort of the sorrowful,
Console us in our trials.
Let us find rest in your heart.
Amen.`,
      reflection: 'In times of sorrow, the Sacred Heart is our refuge, where we find comfort and understanding.',
    },
    {
      day: 8,
      title: 'Healing of the Sacred Heart',
      prayer: `Most Sacred Heart of Jesus,
Healer of wounds and broken hearts,
Heal the wounds in our hearts.
Make us whole in your love.
Amen.`,
      reflection: 'Jesus\' heart was pierced for us, and through His wounds, we are healed.',
    },
    {
      day: 9,
      title: 'Total Consecration',
      prayer: `Most Sacred Heart of Jesus,
We consecrate ourselves entirely to you.
Our hearts, our lives, our all -
We give them to you forever.
Amen.`,
      reflection: 'The final day is a total surrender to the Sacred Heart, giving everything to Jesus.',
    },
  ],
  'st-jude': [
    {
      day: 1,
      title: 'Hope in Despair',
      prayer: `St. Jude, patron of hopeless cases,
Pray for us in our moments of despair.
Help us to trust in God's providence,
Even when all seems lost.
Amen.`,
      reflection: 'St. Jude reminds us that with God, there is always hope, even in seemingly impossible situations.',
    },
    {
      day: 2,
      title: 'Faith in Difficulties',
      prayer: `St. Jude, faithful apostle,
Intercede for us in our difficulties.
Strengthen our faith when tested,
And help us persevere.
Amen.`,
      reflection: 'St. Jude remained faithful even when facing persecution and martyrdom.',
    },
    {
      day: 3,
      title: 'Courage in Trials',
      prayer: `St. Jude, martyr for Christ,
Give us courage in our trials.
Help us stand firm in faith,
No matter the cost.
Amen.`,
      reflection: 'True courage comes from trusting in God\'s strength, not our own.',
    },
    {
      day: 4,
      title: 'Patience in Waiting',
      prayer: `St. Jude, patient in suffering,
Teach us patience in our waiting.
Help us trust God's timing,
And wait with hope.
Amen.`,
      reflection: 'Waiting is not passive - it\'s an active trust that God is at work.',
    },
    {
      day: 5,
      title: 'Trust in Providence',
      prayer: `St. Jude, trusting servant,
Help us trust God's providence.
He provides for all our needs,
Even in unexpected ways.
Amen.`,
      reflection: 'God\'s providence often works in ways we don\'t expect, but always for our good.',
    },
    {
      day: 6,
      title: 'Perseverance in Prayer',
      prayer: `St. Jude, man of prayer,
Teach us to persevere in prayer.
Never give up on praying,
For God hears every prayer.
Amen.`,
      reflection: 'Persistent prayer is an expression of faith and trust in God\'s goodness.',
    },
    {
      day: 7,
      title: 'Hope Against Hope',
      prayer: `St. Jude, patron of the impossible,
Give us hope against all hope.
When the world says no,
God says yes.
Amen.`,
      reflection: 'With God, all things are possible. Our hope is in Him alone.',
    },
    {
      day: 8,
      title: 'Gratitude for Miracles',
      prayer: `St. Jude, worker of miracles,
We thank you for your intercession.
All good gifts come from God,
And you bring them to us.
Amen.`,
      reflection: 'Every answered prayer is a reason for gratitude and deeper faith.',
    },
    {
      day: 9,
      title: 'Final Petition',
      prayer: `Glorious St. Jude,
Through the power of Christ,
Hear our petition.
[Mention your intention]
We promise to spread devotion to you.
Amen.`,
      reflection: 'On the final day, present your specific intention to St. Jude with confidence.',
    },
  ],
  'st-joseph': [
    {
      day: 1,
      title: 'Model of Fatherhood',
      prayer: `St. Joseph, foster father of Jesus,
Teach us to love as you loved.
Protect and provide for our families,
As you did for the Holy Family.
Amen.`,
      reflection: 'St. Joseph shows us what true fatherhood looks like - protective, providing, and loving.',
    },
    {
      day: 2,
      title: 'Model of Work',
      prayer: `St. Joseph, hardworking carpenter,
Bless our work and efforts.
Help us work for God's glory,
And find dignity in all labor.
Amen.`,
      reflection: 'St. Joseph\'s work was holy because it was offered to God and served the Holy Family.',
    },
    {
      day: 3,
      title: 'Model of Silence',
      prayer: `St. Joseph, silent and humble,
Teach us the value of silence.
In quiet contemplation,
We hear God's voice more clearly.
Amen.`,
      reflection: 'St. Joseph\'s silence was filled with listening, observing, and trusting God.',
    },
    {
      day: 4,
      title: 'Model of Trust',
      prayer: `St. Joseph, trusting servant,
You trusted God's mysterious plan.
Help us trust when we don't understand,
And follow where God leads.
Amen.`,
      reflection: 'St. Joseph trusted God even when things didn\'t make sense - taking Mary as wife, fleeing to Egypt.',
    },
    {
      day: 5,
      title: 'Model of Purity',
      prayer: `St. Joseph, chaste and pure,
Purify our hearts and minds.
Help us love with respect,
And honor all persons.
Amen.`,
      reflection: 'St. Joseph\'s purity was not just about chastity but about wholeness of heart.',
    },
    {
      day: 6,
      title: 'Model of Obedience',
      prayer: `St. Joseph, obedient to God,
You followed every command.
Help us obey God's will,
Even when it's difficult.
Amen.`,
      reflection: 'St. Joseph\'s immediate obedience saved the Holy Family time and again.',
    },
    {
      day: 7,
      title: 'Model of Protection',
      prayer: `St. Joseph, protector of the Holy Family,
Protect our families too.
Keep us safe from all harm,
And guide us to heaven.
Amen.`,
      reflection: 'St. Joseph protected Jesus and Mary from Herod\'s wrath and provided for their needs.',
    },
    {
      day: 8,
      title: 'Model of Patience',
      prayer: `St. Joseph, patient in waiting,
You waited for God's timing.
Help us be patient,
And trust in God's plan.
Amen.`,
      reflection: 'Waiting for the birth of Jesus, fleeing to Egypt, searching for the lost Jesus - all required patience.',
    },
    {
      day: 9,
      title: 'Model of Holiness',
      prayer: `St. Joseph, model of holiness,
You lived an ordinary life extraordinarily.
Help us find God in the ordinary,
And grow in holiness daily.
Amen.`,
      reflection: 'St. Joseph\'s holiness was found in the everyday - in work, in family life, in faithful service.',
    },
  ],
};

/**
 * Manage Novena Tool
 * Start, continue, or complete a 9-day novena prayer journey
 */
export const manageNovenaTool = createTool({
  id: 'manage-novena',
  description: 'Start, continue, or complete a 9-day novena prayer journey. Track progress and provide daily prayers for the novena.',
  inputSchema: z.object({
    action: z.enum(['start', 'continue', 'list', 'abandon']).describe('Action to perform on the novena'),
    novenaType: z.enum(['holy-spirit', 'sacred-heart', 'st-jude', 'st-joseph']).optional().describe('Type of novena'),
    intention: z.string().optional().describe('Prayer intention for the novena'),
    novenaId: z.string().optional().describe('ID of existing novena (for continue, abandon)'),
  }),
  execute: async ({ action, novenaType, intention, novenaId }, context) => {
    const db = (context as any)?.db;
    const userId = (context as any)?.userId;

    if (!db || !userId) {
      return {
        error: 'Database or user context not available',
      };
    }

    try {
      if (action === 'start') {
        if (!novenaType) {
          return {
            error: 'novenaType is required to start a novena',
            availableTypes: ['holy-spirit', 'sacred-heart', 'st-jude', 'st-joseph'],
          };
        }

        const journeyId = createId();
        const today = new Date().toISOString().split('T')[0];

        await db
          .prepare(
            'INSERT INTO novena_journeys (id, user_id, novena_type, intention, day_number, started_at, current_day_date) VALUES (?, ?, ?, ?, ?, ?, ?)'
          )
          .bind(
            journeyId,
            userId,
            novenaType,
            intention ?? null,
            1,
            new Date().toISOString(),
            today
          )
          .run();

        const day1Prayer = NOVENA_PRAYERS[novenaType as keyof typeof NOVENA_PRAYERS]?.[0];

        return {
          journeyId,
          novenaType,
          dayNumber: 1,
          intention,
          prayer: day1Prayer?.prayer || 'Day 1 prayer',
          reflection: day1Prayer?.reflection || '',
          message: `Novena started! This is day 1 of your 9-day prayer journey${intention ? ` for the intention: "${intention}"` : ''}.`,
          daysRemaining: 8,
        };
      }

      if (action === 'continue') {
        if (!novenaId) {
          // List active novenas
          const activeNovenas = await db
            .prepare('SELECT * FROM novena_journeys WHERE user_id = ? AND completed_at IS NULL')
            .bind(userId)
            .all();

          const novenas = (activeNovenas?.results || []).map((row: any) => ({
            id: row.id,
            novenaType: row.novena_type,
            intention: row.intention,
            dayNumber: row.day_number,
            daysRemaining: 9 - row.day_number,
            startedAt: row.started_at,
          }));

          return {
            message: 'Select a novena to continue:',
            activeNovenas: novenas,
          };
        }

        const journey = await db
          .prepare('SELECT * FROM novena_journeys WHERE id = ? AND user_id = ?')
          .bind(novenaId, userId)
          .first();

        if (!journey) {
          return {
            error: 'Novena not found',
            novenaId,
          };
        }

        const j = journey as any;
        if (j.day_number >= 9) {
          // Complete the novena
          await db
            .prepare('UPDATE novena_journeys SET completed_at = ? WHERE id = ?')
            .bind(new Date().toISOString(), novenaId)
            .run();

          return {
            message: 'This novena is complete! May God grant your intention.',
            completedPrayer: 'Lord, we thank you for this novena journey. We trust that you have heard our prayers and will answer according to your perfect will. May your will be done. Amen.',
            nextSteps: 'Consider starting another novena or exploring other prayers.',
          };
        }

        // Check if enough time has passed (at least 12 hours since last day)
        const lastDay = new Date(j.current_day_date);
        const now = new Date();
        const hoursSinceLastDay = (now.getTime() - lastDay.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastDay < 12) {
          const hoursToWait = Math.ceil(12 - hoursSinceLastDay);
          return {
            message: `Please wait ${hoursToWait} more hours before continuing to the next day.`,
            currentDay: j.day_number,
            canContinue: false,
          };
        }

        // Move to next day
        const nextDay = j.day_number + 1;
        const today = new Date().toISOString().split('T')[0];

        await db
          .prepare('UPDATE novena_journeys SET day_number = ?, current_day_date = ? WHERE id = ?')
          .bind(nextDay, today, novenaId)
          .run();

        const dayPrayer = NOVENA_PRAYERS[j.novena_type as keyof typeof NOVENA_PRAYERS]?.[nextDay - 1];

        return {
          novenaId,
          novenaType: j.novena_type,
          intention: j.intention,
          dayNumber: nextDay,
          prayer: dayPrayer?.prayer || `Day ${nextDay} prayer`,
          reflection: dayPrayer?.reflection || '',
          message: `Day ${nextDay} of your ${j.novena_type.replace('-', ' ')} novena.`,
          daysRemaining: 9 - nextDay,
        };
      }

      if (action === 'list') {
        const allNovenas = await db
          .prepare('SELECT * FROM novena_journeys WHERE user_id = ? ORDER BY started_at DESC')
          .bind(userId)
          .all();

        const novenas = (allNovenas?.results || []).map((row: any) => ({
          id: row.id,
          novenaType: row.novena_type,
          intention: row.intention,
          dayNumber: row.day_number,
          completedAt: row.completed_at,
          startedAt: row.started_at,
          isActive: !row.completed_at,
        }));

        return {
          novenas,
          activeCount: novenas.filter((n: any) => n.isActive).length,
          completedCount: novenas.filter((n: any) => !n.isActive).length,
        };
      }

      if (action === 'abandon') {
        if (!novenaId) {
          return {
            error: 'novenaId is required to abandon a novena',
          };
        }

        await db.prepare('DELETE FROM novena_journeys WHERE id = ?').bind(novenaId).run();

        return {
          message: 'Novena abandoned. You can start a new one anytime.',
          novenaId,
        };
      }

      return {
        error: 'Invalid action',
        validActions: ['start', 'continue', 'list', 'abandon'],
      };
    } catch (error) {
      console.error('Error managing novena:', error);
      return {
        error: 'Failed to manage novena',
        message: (error as Error).message,
      };
    }
  },
});
