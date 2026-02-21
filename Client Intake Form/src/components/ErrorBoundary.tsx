
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                    <div className="bg-red-50 border border-red-200 rounded p-4 text-sm font-mono text-red-800 whitespace-pre-wrap">
                        {this.state.error?.toString()}
                    </div>
                    <p className="mt-4 text-gray-600">Check the console for more details.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
