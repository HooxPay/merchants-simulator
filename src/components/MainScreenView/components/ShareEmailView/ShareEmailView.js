import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";

import {
    StyledBottomSubtitle,
    StyledButtonsContainer,
    StyledContainer,
    StyledContentContainer,
    StyledDivider,
    StyledFooterContainer,
    StyledLink,
    StyledPolicyContainer,
    StyledSubtitle,
    StyledTitle,
} from "./ShareEmailView.styles";
import { validationSchema } from "./config";
import {
    Alert,
    Button,
    CircularProgress,
    Snackbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { steps } from "../../MainScreenView";
import CustomField from "./CustomField";
import { preparePayload } from "./utils";
import TrackedButton from "@/components/analytics/TrackedButton";
import { trackCustomEvent } from "@/lib/mixpanel";

const ShareEmailView = ({ setStep, emailData }) => {
    useEffect(() => {
        trackCustomEvent("Step Viewed", { Name: "Share email" });
    }, [trackCustomEvent]);
    const [isLoading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const formik = useFormik({
        initialValues: {
            name: "",
            merchant: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const payload = preparePayload(values, emailData);
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    body: payload,
                });
                if (response.status === 200) {
                    setStep(steps.thankYou);
                } else {
                    setShowErrorAlert(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error.message);
                setShowErrorAlert(false);
                setLoading(false);
            }
        },
    });
    const { handleSubmit } = formik;
    return (
        <StyledContainer>
            <FormikProvider value={formik}>
                <form onSubmit={handleSubmit}>
                    <StyledContentContainer>
                        <StyledTitle>
                            Hoox Embedded Offers are Free!
                        </StyledTitle>
                        <StyledSubtitle>
                            Share your email and get access to Hoox plugin/API
                            for free!
                        </StyledSubtitle>
                        <CustomField name={"name"} label={"full name"} />
                        <CustomField
                            name={"merchant"}
                            label={"brand/store name"}
                        />
                        <CustomField name={"email"} label={"work email"} />
                        <StyledPolicyContainer>
                            <StyledBottomSubtitle>
                                By submitting your email, you agree to our{" "}
                            </StyledBottomSubtitle>
                            <StyledLink
                                href={
                                    "https://www.hooxpay.com/merchant-simulator-and-icp-privacy-policy"
                                }
                            >
                                Privacy Policy
                            </StyledLink>
                        </StyledPolicyContainer>
                        <StyledFooterContainer>
                            <StyledDivider variant="horizontal" />
                            <StyledButtonsContainer>
                                <TrackedButton
                                    clickType="Back"
                                    onClick={() => setStep(steps.simulator)}
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        borderColor: "#C8C8C8",
                                        minWidth: 96,
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                >
                                    Back
                                </TrackedButton>
                                <TrackedButton
                                    clickType={"Share email button"}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    sx={{ width: 96 }}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.common.white,
                                            }}
                                            size="1.5rem"
                                        />
                                    ) : (
                                        "Send"
                                    )}
                                </TrackedButton>
                            </StyledButtonsContainer>
                        </StyledFooterContainer>
                    </StyledContentContainer>
                    <Snackbar
                        open={showErrorAlert && !isLoading}
                        onClose={() => {
                            setShowErrorAlert(false);
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: isDesktop ? "right" : "center",
                        }}
                    >
                        <Alert
                            severity="error"
                            onClose={() => {
                                setShowErrorAlert(false);
                            }}
                            action={
                                <Button
                                    onClick={() => handleSubmit()}
                                    color="inherit"
                                    size="small"
                                >
                                    RETRY
                                </Button>
                            }
                        >
                            Email failed to send
                        </Alert>
                    </Snackbar>
                </form>
            </FormikProvider>
        </StyledContainer>
    );
};

export default ShareEmailView;
