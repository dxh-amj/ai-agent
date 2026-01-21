"use client";
import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";

import { Header, Sidebar } from "@/shared/base-layout/vertical";
import { AbilityClientProvider, Customizer, RouteGuard } from "@/shared/components";
import { useSelector } from "@/store/useRedux";

import type { AppState } from "@/store/store";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100%",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "calc(100% - 270px)",
  backgroundColor: "transparent",
}));

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <AbilityClientProvider>
      <MainWrapper
        className={customizer.activeMode === "dark" ? "darkbg mainwrapper" : "mainwrapper"}
      >
        <title>Modernize NextJs</title>
        {/* Sidebar */}
        <Sidebar />
        {/* Main Wrapper */}
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(customizer.isCollapse && {
              [theme.breakpoints.up("lg")]: {
                ml: `${customizer.MiniSidebarWidth}px`,
              },
            }),
          }}
        >
          {/* Header */}
          <Header />
          <Container
            sx={{
              pt: "30px",
              maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
              mx: customizer.isLayout === "boxed" ? "auto" : 0,
            }}
          >
            {/* PageContent */}

            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              <RouteGuard>{children}</RouteGuard>
            </Box>
            {/* End Page */}
          </Container>
          <Customizer />
        </PageWrapper>
      </MainWrapper>
    </AbilityClientProvider>
  );
};

export default RootLayout;
