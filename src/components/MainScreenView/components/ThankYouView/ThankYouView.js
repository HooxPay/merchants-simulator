"use client";
import Logo from "@/components/Logo";
import {
    StyledBackground,
    StyledBackgroundColor,
    StyledMobileContainer,
    StyledSubtitle,
    StyledSubtitle2,
    StyledTextContainer,
    StyledTitle,
} from "./ThankYouView.styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { trackCustomEvent } from "@/lib/mixpanel";
import { useEffect } from "react";

const ThankYouBody = () => {
    return (
        <StyledTextContainer>
            <StyledTitle>Thank You for Hooxing With Us!</StyledTitle>
            <StyledSubtitle>
                Check your inbox for a snapshot of how we can uplift your sales,
                and follow the steps to go live with Hoox!
            </StyledSubtitle>
            <StyledSubtitle2>
                Join +30,000 merchants and grow your business with embedded
                offers{" "}
            </StyledSubtitle2>
        </StyledTextContainer>
    );
};

const ThankYouView = () => {
    const theme = useTheme();
    useEffect(() => {
        trackCustomEvent("Step Viewed", { Name: "Thank you" });
    }, [trackCustomEvent]);
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <StyledBackgroundColor container>
            {isDesktop ? (
                <StyledBackground>
                    <ThankYouBody />
                </StyledBackground>
            ) : (
                <Box>
                    <StyledMobileContainer>
                        <Logo width={105} height={36} />
                        <ThankYouBody />
                    </StyledMobileContainer>
                    <StyledBackground />
                </Box>
            )}
        </StyledBackgroundColor>
    );
};

export default ThankYouView;
