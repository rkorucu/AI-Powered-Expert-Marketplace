import { Expert, Session, SessionStatus } from './types';

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'e1',
    name: 'Dr. Sarah Chen',
    title: 'Senior Data Scientist',
    avatar: 'https://picsum.photos/100/100?random=1',
    hourlyRate: 150,
    skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'],
    rating: 4.9,
    reviewCount: 124,
    bio: 'Ex-Google specific data scientist helping students and professionals master ML concepts. I specialize in practical applications and career mentorship.',
    tags: ['Tech', 'Coding', 'Career']
  },
  {
    id: 'e2',
    name: 'Marcus Thorne',
    title: 'Elite Fitness Coach',
    avatar: 'https://picsum.photos/100/100?random=2',
    hourlyRate: 85,
    skills: ['HIIT', 'Nutrition Planning', 'Strength Training', 'Recovery'],
    rating: 4.8,
    reviewCount: 89,
    bio: 'Certified NASM trainer with 10 years of experience. I build custom plans that fit your busy lifestyle, focusing on sustainable results.',
    tags: ['Health', 'Fitness', 'Lifestyle']
  },
  {
    id: 'e3',
    name: 'Elena Rodriguez',
    title: 'Business Strategy Consultant',
    avatar: 'https://picsum.photos/100/100?random=3',
    hourlyRate: 200,
    skills: ['Startup Strategy', 'Fundraising', 'Go-to-Market', 'Pitch Deck'],
    rating: 5.0,
    reviewCount: 45,
    bio: 'I help early-stage founders refine their pitch and strategy. Successfully helped clients raise over $10M in seed funding.',
    tags: ['Business', 'Startup', 'Finance']
  },
  {
    id: 'e4',
    name: 'James Wilson',
    title: 'Calculus & Physics Tutor',
    avatar: 'https://picsum.photos/100/100?random=4',
    hourlyRate: 60,
    skills: ['Calculus', 'Physics', 'SAT Math', 'Algebra'],
    rating: 4.7,
    reviewCount: 210,
    bio: 'Patient and clear explanations for complex math and physics problems. Great for high school and college students.',
    tags: ['Education', 'Math', 'Science']
  },
  {
    id: 'e5',
    name: 'Yuki Tanaka',
    title: 'Digital Marketing Specialist',
    avatar: 'https://picsum.photos/100/100?random=5',
    hourlyRate: 110,
    skills: ['SEO', 'Google Ads', 'Content Strategy', 'Social Media'],
    rating: 4.9,
    reviewCount: 76,
    bio: 'Data-driven marketer helping brands grow their online presence. Expert in SEO and paid acquisition.',
    tags: ['Marketing', 'Business', 'Growth']
  }
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    expertId: 'e1',
    expertName: 'Dr. Sarah Chen',
    clientId: 'c1',
    clientName: 'You',
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    durationMinutes: 60,
    status: SessionStatus.SCHEDULED,
    topic: 'Machine Learning Basics',
    price: 150
  },
  {
    id: 's2',
    expertId: 'e2',
    expertName: 'Marcus Thorne',
    clientId: 'c1',
    clientName: 'You',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    durationMinutes: 45,
    status: SessionStatus.COMPLETED,
    topic: 'Weekly Check-in & Form Review',
    notes: 'Focus on keeping the back straight during deadlifts. Increase protein intake.',
    price: 85
  }
];

export const MOCK_TRANSCRIPT = `
Expert: Hi there! Ready to get started with our session on React performance?
Client: Yes, I'm really struggling with unnecessary re-renders.
Expert: Okay, first let's look at your useEffect dependencies. I see you're passing a new object every render.
Client: Oh, I didn't notice that. Should I use useMemo?
Expert: Exactly. Wrap that config object in useMemo. Also, for the callback, use useCallback so the child component doesn't re-render.
Client: That makes sense. What about the heavy calculation in the list?
Expert: For that, definitely use useMemo. And make sure your list items have stable keys, not just indices.
Client: Got it. I'll implement those changes. Any other tips?
Expert: Yes, verify you aren't defining components inside other components. That kills performance.
Client: Thanks! This is super helpful.
`;