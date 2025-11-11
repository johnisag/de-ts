import Greetings  from './Greetings';
import { Welcome } from './Welcome';
import { UserCard } from './UserCard';  
import { useState } from 'react';
import { TimerPanel } from './TimerPanel';

export default function App() {
  const [title] = useState<string>('React TypeScript Example');

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: 24 }}>
      <h1>{title}</h1>
      <Greetings name="Function Component" />
      <Welcome name="Class Component" />
      <UserCard name="User Card Component - Function Component" />
      <TimerPanel label="Timer Panel - Class Component" />
    </main>
  );
}
