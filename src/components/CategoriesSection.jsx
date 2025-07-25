import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Add this import

const CategoriesSection = ({ categories }) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
        Browse Categories
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={category.id}>
             <Link to={category.link} style={{ textDecoration: "none" }}></Link>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                rotate: 5,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 2,
                  overflow: "visible",
                  background: "transparent",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <Box
                  sx={{
                    width: { xs: 120, sm: 140, md: 160 },
                    height: { xs: 120, sm: 140, md: 160 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    mb: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    border: "5px solid white"
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                
                <CardContent sx={{ p: 1, textAlign: "center" }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold"
                    sx={{ 
                      textTransform: "uppercase",
                      letterSpacing: 1
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesSection;

