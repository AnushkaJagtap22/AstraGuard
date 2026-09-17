import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ASTRA GUARD RUNTIME EXCEPTION:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#08090b',
          color: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyIn: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          <div style={{
            background: '#121721',
            border: '1px solid #1E2638',
            borderRadius: '1rem',
            padding: '2.5rem',
            maxWidth: '28rem',
            width: '100%'
          }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00E5FF', marginBottom: '1rem' }}>
              ASTRAGUARD
            </h1>
            <p style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              Something went wrong.
            </p>
            {this.state.error && (
              <pre style={{
                background: '#0B0F17',
                border: '1px solid #2A354A',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                color: '#FF6B6B',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '1.5rem'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#00E5FF',
                color: '#0B0F17',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
