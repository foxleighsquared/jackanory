import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error: Error): void {
    console.error(error);
  }

  public render(): ReactNode {
    return this.props.children;
  }
}

export default ErrorBoundary;
