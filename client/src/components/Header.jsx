import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f4ff",
        borderBottom: "1px solid #d0d7ff",
        paddingY: 3,
        paddingX: 4,
        mb: 4,
      }}
    >
      <Typography variant="h4" color="primary" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" mt={0.5}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
