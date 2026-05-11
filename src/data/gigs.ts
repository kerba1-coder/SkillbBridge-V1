export interface Gig {
  id: number;
  title: string;
  org: string;
  type: string;
  price: string;
  desc: string;
  image: string;
  category: string;
  skills: string[];
  duration: string;
}

export const ALL_GIGS: Gig[] = [
  { 
    id: 1,
    title: 'Marketing Presentation Design', 
    org: 'Community Hub',
    type: 'Pro Bono', 
    price: '0', 
    category: 'Marketing',
    skills: ['PowerPoint', 'Design', 'Storytelling'],
    duration: '1 week',
    desc: 'Help a local community center organize their slide deck for a volunteer recruitment meeting.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop'
  },
  { 
    id: 2,
    title: 'Social Media Post Creation', 
    org: 'Art Collective',
    type: 'Pro Bono', 
    price: '0', 
    category: 'Marketing',
    skills: ['Social Media', 'Content Creation', 'Canva'],
    duration: '1 week',
    desc: 'Create a set of 5 Instagram posts for a local art gallery to promote their upcoming student showcase.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&h=300&fit=crop'
  },
  { 
    id: 3,
    title: 'Frontend Component Task', 
    org: 'Open Source Project',
    type: 'Pro Bono', 
    price: '0', 
    category: 'Engineering',
    skills: ['HTML', 'CSS', 'JavaScript'],
    duration: '2 weeks',
    desc: 'Help update the styling of a landing page for an open-source library used by students.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop'
  },
  { 
    id: 6, // Marketing specific for strategic page
    title: 'Brand Moodboard Assistant',
    org: 'Startup Incubator',
    type: 'Pro Bono',
    price: '0',
    duration: '1 week',
    category: 'Marketing',
    skills: ['Visual Research', 'Pinterest', 'Branding'],
    desc: 'Assemble a collection of visual references and color palettes for a new sustainable fashion project.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop'
  },
  { 
    id: 7, // Process Improvement
    title: 'Club Recruitment Workflow',
    org: 'Campus Org',
    type: 'Pro Bono',
    price: '0',
    duration: '1 week',
    category: 'Process Improvement',
    skills: ['Process Mapping', 'Organization', 'Trello'],
    desc: 'Review how a campus club signs up new members and create a simple 3-step digital process.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
  },
  { 
    id: 8, // Process Improvement
    title: 'Digital Archive Cleanup',
    org: 'Historical Society',
    type: 'Pro Bono',
    price: '0',
    duration: '2 weeks',
    category: 'Process Improvement',
    skills: ['Data Management', 'Attention to Detail'],
    desc: 'Help organize a digital folder of 50+ scan files into a consistent naming convention for a local museum.',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&h=300&fit=crop'
  },
  { 
    id: 9, // Communication
    title: 'Meeting Notes Summary',
    org: 'Neighborhood Council',
    type: 'Pro Bono',
    price: '0',
    duration: '3 days',
    category: 'Communication',
    skills: ['Writing', 'Synthesis', 'Note Taking'],
    desc: 'Attend a 1-hour community meeting and turn the rough notes into a clear 1-page summary for the residents.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop'
  },
  { 
    id: 10, // Communication
    title: 'Email Template Drafter',
    org: 'Food Bank',
    type: 'Pro Bono',
    price: '0',
    duration: '1 week',
    category: 'Communication',
    skills: ['Copywriting', 'Customer Service'],
    desc: 'Write three polite email templates for a local food pantry to use when thanking donors and volunteers.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?w=500&h=300&fit=crop'
  },
  { 
    id: 5,
    title: 'Product Strategy Sync', 
    org: 'TechCorp',
    type: 'Strategic', 
    price: '2500', 
    category: 'Strategy',
    skills: ['Market Research', 'Competitive Analysis', 'Product Roadmap'],
    duration: '4 weeks',
    desc: 'Evaluate market entry points for a new vertical in the renewable energy sector.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
  },
  {
    id: 11,
    title: 'Marketing-Communications: Intro to Selling with A.I.',
    org: 'Simulacra Labs',
    type: 'High Priority',
    price: '1800',
    category: 'Marketing',
    skills: ['A.I. Training', 'Presentation Design', 'Sales Enablement'],
    duration: '3 weeks',
    desc: 'Develop a team training on how to improve Sales skills using A.I., focusing on closing techniques, communication strategies, and A.I.-driven workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&h=600&fit=crop'
  }
];
