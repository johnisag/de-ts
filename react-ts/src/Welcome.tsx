import React from 'react';

type WelcomeProps = {
  name: string;
};

// Class Component
export class Welcome extends React.Component<WelcomeProps> {
  render() {
    return <h3>Welcome, {this.props.name}!</h3>;
  }
}