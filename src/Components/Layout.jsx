import {styled} from "@nextui-org/react";
const Box = styled("div", {
    boxSizing: "border-box",
});

export const Layout = ({ children }) => (
    <Box css={{maxW: "100%"}} dir="rtl">
        {children}
    </Box>
);