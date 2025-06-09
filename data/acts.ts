export interface Act {
  id: number;
  title: string;
  description: string;
  image: string;
  isBranchingPoint: boolean;
}

export interface Branch {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export const acts: Act[] = [
  {
    id: 1,
    title: 'The Beginning',
    description: 'Your journey starts here. The first steps into a new world.',
    image: 'act1',
    isBranchingPoint: false,
  },
  {
    id: 2,
    title: 'First Challenge',
    description: 'Face your first obstacle and learn the basics of survival.',
    image: 'act2',
    isBranchingPoint: false,
  },
  {
    id: 3,
    title: 'Crossroads',
    description: 'A pivotal moment where you must choose your initial path.',
    image: 'act3',
    isBranchingPoint: true,
  },
  {
    id: 4,
    title: 'New Horizons',
    description: 'Explore the consequences of your first major decision.',
    image: 'act4',
    isBranchingPoint: false,
  },
  {
    id: 5,
    title: 'Hidden Truths',
    description: 'Discover secrets that were kept from you all along.',
    image: 'act5',
    isBranchingPoint: false,
  },
  {
    id: 6,
    title: 'The Revelation',
    description: 'Another crucial choice awaits as new paths are revealed.',
    image: 'act6',
    isBranchingPoint: true,
  },
  {
    id: 7,
    title: 'Rising Tension',
    description: 'The stakes increase as you continue on your chosen path.',
    image: 'act7',
    isBranchingPoint: false,
  },
  {
    id: 8,
    title: 'Unexpected Ally',
    description: 'A surprising friendship forms in the midst of adversity.',
    image: 'act8',
    isBranchingPoint: false,
  },
  {
    id: 9,
    title: 'Point of No Return',
    description: 'Your final major decision that will determine your fate.',
    image: 'act9',
    isBranchingPoint: true,
  },
  {
    id: 10,
    title: 'The Descent',
    description: 'Journey into the unknown depths of your chosen destiny.',
    image: 'act10',
    isBranchingPoint: false,
  },
  {
    id: 11,
    title: 'Darkest Hour',
    description: 'Face your greatest challenge yet with everything at stake.',
    image: 'act11',
    isBranchingPoint: false,
  },
  {
    id: 12,
    title: 'Final Choice',
    description: 'One last decision that will shape the outcome of your story.',
    image: 'act12',
    isBranchingPoint: true,
  },
  {
    id: 13,
    title: 'The Climax',
    description: 'The culmination of all your choices and actions.',
    image: 'act13',
    isBranchingPoint: false,
  },
  {
    id: 14,
    title: 'Resolution',
    description: 'Witness the consequences of your journey unfold.',
    image: 'act14',
    isBranchingPoint: false,
  },
  {
    id: 15,
    title: 'Epilogue',
    description: 'The final chapter of your story and a glimpse of what lies beyond.',
    image: 'act15',
    isBranchingPoint: true,
  },
];

export const branches: Record<number, Branch[]> = {
  3: [
    {
      id: 'warrior',
      title: 'Warrior\'s Path',
      description: 'Choose strength and combat prowess as your primary skills.',
      image: 'branch_warrior',
      color: '#FF5252',
    },
    {
      id: 'mage',
      title: 'Mage\'s Journey',
      description: 'Master the arcane arts and magical abilities.',
      image: 'branch_mage',
      color: '#448AFF',
    },
    {
      id: 'rogue',
      title: 'Shadow\'s Way',
      description: 'Embrace stealth, cunning, and deception to achieve your goals.',
      image: 'branch_rogue',
      color: '#7C4DFF',
    },
  ],
  6: [
    {
      id: 'light',
      title: 'Path of Light',
      description: 'Follow a righteous path, helping others and fighting for justice.',
      image: 'branch_light',
      color: '#FFD740',
    },
    {
      id: 'balance',
      title: 'Path of Balance',
      description: 'Walk the line between light and dark, making pragmatic choices.',
      image: 'branch_balance',
      color: '#64FFDA',
    },
    {
      id: 'shadow',
      title: 'Path of Shadow',
      description: 'Embrace darker powers and make difficult moral compromises.',
      image: 'branch_shadow',
      color: '#212121',
    },
  ],
  9: [
    {
      id: 'leader',
      title: 'The Leader',
      description: 'Take command and guide others through the coming trials.',
      image: 'branch_leader',
      color: '#FFC107',
    },
    {
      id: 'lone_wolf',
      title: 'The Lone Wolf',
      description: 'Rely on yourself and forge your own path without attachments.',
      image: 'branch_lone_wolf',
      color: '#607D8B',
    },
    {
      id: 'guardian',
      title: 'The Guardian',
      description: 'Dedicate yourself to protecting those who cannot protect themselves.',
      image: 'branch_guardian',
      color: '#4CAF50',
    },
  ],
  12: [
    {
      id: 'sacrifice',
      title: 'The Sacrifice',
      description: 'Give up something precious to save what matters most.',
      image: 'branch_sacrifice',
      color: '#E91E63',
    },
    {
      id: 'redemption',
      title: 'The Redemption',
      description: 'Seek forgiveness and make amends for past mistakes.',
      image: 'branch_redemption',
      color: '#00BCD4',
    },
    {
      id: 'transcendence',
      title: 'The Transcendence',
      description: 'Rise above mortal concerns to achieve something greater.',
      image: 'branch_transcendence',
      color: '#9C27B0',
    },
  ],
  15: [
    {
      id: 'new_beginning',
      title: 'New Beginning',
      description: 'Start a fresh chapter with the wisdom you\'ve gained.',
      image: 'branch_new_beginning',
      color: '#8BC34A',
    },
    {
      id: 'legacy',
      title: 'Lasting Legacy',
      description: 'Leave behind something meaningful for future generations.',
      image: 'branch_legacy',
      color: '#FF9800',
    },
    {
      id: 'ascension',
      title: 'The Ascension',
      description: 'Transcend your current existence and reach a higher plane.',
      image: 'branch_ascension',
      color: '#FFFFFF',
    },
  ],
};
