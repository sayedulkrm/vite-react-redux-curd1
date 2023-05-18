import { Box, Highlight } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyItems={"center"}
            justifyContent={"center"}
            bg={"blackAlpha.500"}
            alignItems={"center"}
            w={"full"}
            h={"100"}
        >
            <Highlight
                query={"Sayedul Karim"}
                styles={{
                    px: "1",
                    py: "1",
                    rounded: "full",
                    bg: "red.200",
                }}
            >
                Made by Sayedul Karim
            </Highlight>
        </Box>
    );
};

export default Footer;
