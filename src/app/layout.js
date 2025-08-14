import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Inter } from "next/font/google";

import "./globals.css";

import theme from "@/theme";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import MixpanelTracker from "@/components/analytics/MixpanelTracker.js";

const inter = Inter({ display: "swap", subsets: ["latin"] });

export const metadata = {
    title: "Merchants Simulator",
    description: "Hoox Pay merchants simulator",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <MixpanelTracker />
                    <ThemeProvider theme={theme}>
                        <ErrorBoundary>{children}</ErrorBoundary>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
