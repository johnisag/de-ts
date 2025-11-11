type GreetingsProps = {
  name: string;
};

// Function Component
export default function Greetings({ name }: GreetingsProps) {
  return <h1>Hello, {name}!</h1>;
}