type UserCardProps = {
    name: string;
};

export function UserCard({ name }: UserCardProps) {
    return <h2>User: {name}</h2>
}