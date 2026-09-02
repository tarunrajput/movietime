import React, {
  Component as ReactComponent,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {ThemeContext, type Colors} from '@/lib/theme';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends ReactComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Hook point for a crash reporter; logged so failures are never silent.
    console.error('ErrorBoundary caught:', error, errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({hasError: false, error: null});
  };

  renderFallback = (colors: Colors): ReactNode => (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      <Text style={[styles.title, {color: colors.text}]}>
        Something went wrong
      </Text>
      <Text style={[styles.message, {color: colors.gray[600]}]}>
        {this.state.error?.message || 'An unexpected error'}
      </Text>
      <Pressable
        onPress={this.handleReset}
        style={[styles.button, {backgroundColor: colors.primary}]}>
        <Text style={[styles.buttonText, {color: colors.onPrimary}]}>
          Try Again
        </Text>
      </Pressable>
    </View>
  );

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      // Consumer instead of contextType: Metro's Babel config rejects
      // `declare context` class fields, and an uninitialized redeclaration
      // of the inherited `context` property is a tsc error.
      return (
        <ThemeContext.Consumer>
          {colors => this.renderFallback(colors)}
        </ThemeContext.Consumer>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
