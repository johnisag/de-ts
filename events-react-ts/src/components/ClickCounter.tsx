import React from 'react';

// A simple click counter component
const ClickCounter: React.FC = () => {
    // State to keep track of the number of clicks
    const [count, setCount] = React.useState(0);  

    // Function to handle button click
    const handleClick = () => { 
        setCount(count + 1);
    };

    // Render the button and display the count
    return (
        <div>
        <button onClick={handleClick}>Click me</button>
        <p>Button clicked {count} times</p>
        </div>
    );
}

export default ClickCounter;