export interface Habit {
  id: string;
  name: string;
  category: 'training' | 'meditation' | 'diet' | 'reading' | 'other';
  completed: boolean;
  progress: number;
  streak: number;
}

export interface Arc {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  days: Day[];
  mindset?: string; // Mindset philosophy for this arc
  goals?: string[]; // Goals to achieve in this arc
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string;
  habits: Habit[];
  totalXp: number;
}

export const arcsData: Arc[] = [
  {
    id: 'arc-1',
    name: 'AWAKENING ARC',
    imageUrl: require('@/assets/actimages/act1.png'),
    description: 'Begin your journey of self-discovery and inner awakening.',
    mindset: 'Embrace the unknown',
    goals: [
      'Complete daily meditation practice',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-15',
        habits: [
          {
            id: 'habit-1',
            name: 'Morning Reading',
            category: 'reading',
            completed: true,
            progress: 1,
            streak: 3,
          },
          {
            id: 'habit-2',
            name: 'Meditation',
            category: 'meditation',
            completed: true,
            progress: 1,
            streak: 5,
          },
        ],
        totalXp: 150,
      },
    ],
  },
  {
    id: 'arc-2',
    name: 'SHADOW ARC',
    imageUrl: require('@/assets/actimages/act2.png'),
    description: 'Confront your inner demons.',
    mindset: 'Knowledge is the weapon that cuts through illusion.',
    goals: [
      'Read one challenging book per week',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-20',
        habits: [
          {
            id: 'habit-1',
            name: 'Shadow Journaling',
            category: 'reading',
            completed: false,
            progress: 0.3,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Deep Meditation',
            category: 'meditation',
            completed: false,
            progress: 0.5,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-3',
    name: 'DISCIPLINE ARC',
    imageUrl: require('@/assets/actimages/act3.png'),
    description: 'Forge unbreakable habits through consistent daily practice.',
    mindset: 'True power comes from consistent action.',
    goals: [
      'Establish a morning routine and follow it for 21 days',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-25',
        habits: [
          {
            id: 'habit-1',
            name: 'Cold Shower',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Morning Workout',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-4',
    name: 'KNOWLEDGE ARC',
    imageUrl: require('@/assets/actimages/act4.png'),
    description: 'Expand your mind through dedicated learning and study.',
    mindset: 'Knowledge is the weapon that cuts through illusion.',
    goals: [
      'Read one challenging book per week',
    ],
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-01-30',
        habits: [
          {
            id: 'habit-1',
            name: 'Deep Reading',
            category: 'reading',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Knowledge Synthesis',
            category: 'reading',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-5',
    name: 'STRENGTH ARC',
    imageUrl: require('@/assets/actimages/act5.png'),
    description: 'Build physical ',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-02-05',
        habits: [
          {
            id: 'habit-1',
            name: 'Strength Training',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Mental Fortitude',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-6',
    name: 'CLARITY ARC',
    imageUrl: require('@/assets/actimages/act1.png'),
    description: 'Clear your mind',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-02-10',
        habits: [
          {
            id: 'habit-1',
            name: 'Mindfulness Meditation',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Digital Detox',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-7',
    name: 'VITALITY ARC',
    imageUrl: require('@/assets/actimages/act2.png'),
    description: 'Optimize your physical health and energy through nutrition and movement.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-02-15',
        habits: [
          {
            id: 'habit-1',
            name: 'Nutrient-Dense Meals',
            category: 'diet',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Movement Practice',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-8',
    name: 'WISDOM ARC',
    imageUrl: require('@/assets/actimages/act3.png'),
    description: 'Develop deep understanding through contemplation and reflection.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-02-20',
        habits: [
          {
            id: 'habit-1',
            name: 'Philosophical Reading',
            category: 'reading',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Reflective Journaling',
            category: 'reading',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-9',
    name: 'MASTERY ARC',
    imageUrl: require('@/assets/actimages/act4.png'),
    description: 'Develop expertise through deliberate practice and focused attention.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-02-25',
        habits: [
          {
            id: 'habit-1',
            name: 'Skill Practice',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Technique Refinement',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-10',
    name: 'RESILIENCE ARC',
    imageUrl: require('@/assets/actimages/act5.png'),
    description: 'Build mental toughness and emotional resilience through challenges.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-01',
        habits: [
          {
            id: 'habit-1',
            name: 'Stress Exposure',
            category: 'training',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Recovery Practice',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-11',
    name: 'FOCUS ARC',
    imageUrl: require('@/assets/actimages/act1.png'),
    description: 'Sharpen your attention and eliminate distractions.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-05',
        habits: [
          {
            id: 'habit-1',
            name: 'Deep Work Session',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Distraction Elimination',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-12',
    name: 'CREATION ARC',
    imageUrl: require('@/assets/actimages/act2.png'),
    description: 'Unlock your creative potential through consistent practice.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-10',
        habits: [
          {
            id: 'habit-1',
            name: 'Creative Practice',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Idea Generation',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-13',
    name: 'PRESENCE ARC',
    imageUrl: require('@/assets/actimages/act3.png'),
    description: 'Cultivate deep awareness and presence in each moment.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-15',
        habits: [
          {
            id: 'habit-1',
            name: 'Mindful Awareness',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Sensory Immersion',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-14',
    name: 'TRANSCENDENCE ARC',
    imageUrl: require('@/assets/actimages/act4.png'),
    description: 'Move beyond limitations and expand your consciousness.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-20',
        habits: [
          {
            id: 'habit-1',
            name: 'Transcendental Meditation',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Consciousness Expansion',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
  {
    id: 'arc-15',
    name: 'REBIRTH ARC',
    imageUrl: require('@/assets/actimages/act5.png'),
    description: 'Complete your transformation and emerge renewed.',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-03-25',
        habits: [
          {
            id: 'habit-1',
            name: 'Integration Practice',
            category: 'meditation',
            completed: false,
            progress: 0,
            streak: 0,
          },
          {
            id: 'habit-2',
            name: 'Future Visioning',
            category: 'other',
            completed: false,
            progress: 0,
            streak: 0,
          },
        ],
        totalXp: 0,
      },
    ],
  },
];