import React from "react";

interface TimerPanelProps {
    label: string;
}

interface TimerPanelState {
    count: number;
}

export class TimerPanel extends React.Component<TimerPanelProps, TimerPanelState> {
    // To hold the interval ID for clearing it later
    private intervalId?: number;

    // Constructor to initialize state
    constructor(props: TimerPanelProps) {
        super(props);
        this.state = { count: 0 };
    }

    // Lifecycle method to start the timer
    componentDidMount(): void {
        this.intervalId = window.setInterval(() => {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
        }, 1000);
    };

    // Lifecycle method to clear the timer
    componentWillUnmount(): void {
        if (this.intervalId) {
            // Clear the interval to prevent memory leaks
            clearInterval(this.intervalId);
        }
    }

    render() {
        return (
            <div>
                <h4>{this.props.label}</h4>
                <p>Timer: {this.state.count} seconds</p>
            </div>
        );
    }
}