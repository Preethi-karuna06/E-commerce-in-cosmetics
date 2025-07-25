import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Grid,
  Collapse,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Navbar from './navbar';
import Footer from './footer';

// Styled components
const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://th.bing.com/th/id/OIP.soGhHa0jyYsq0Z8Sz-r7qwHaDL?w=325&h=149&c=7&r=0&o=5&dpr=1.5&pid=1.7') no-repeat center center/cover`,
  height: 300,
  color: '#825423',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  paddingTop: '64px',
  marginTop: 0
}));

const CategoryButton = styled(Button)(({ theme, active }) => ({
  background: active ? '#b37c42' : '#eee',
  color: active ? 'white' : 'black',
  borderRadius: '20px',
  padding: '10px 20px',
  margin: '5px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: active ? '#936419' : '#fffaf3',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }
}));

const FaqItem = styled(Paper)(({ theme }) => ({
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    background: '#fffaf3',
    boxShadow: theme.shadows[3],
  }
}));

const AskQuestionCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto 60px auto',
  padding: theme.spacing(3),
  backgroundColor: '#fffaf3',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  overflow: 'visible'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d4a373',
    },
    '&:hover fieldset': {
      borderColor: '#b37c42',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#936419',
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#b37c42',
  color: 'white',
  padding: '10px 24px',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#936419',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  '&.Mui-disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  }
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: theme.spacing(1),
}));

// FAQ data
const faqData = {
  about: [
    { question: "How do I update my billing information?", answer: "You can update your billing information from the account settings page." },
    { question: "How do I update my profile information?", answer: "Go to your profile settings and edit your personal details." },
    { question: "Can I buy multiple products in a single order?", answer: "Sure you can! Just add all the products you wish to buy on to your shopping bag and then click on the \"checkout\" button." },
    { question: "What is the range of locations to which Thoori Cosmetics ships their products?", answer: "Thoori cosmetics ships throughout India!" },
    { question: "Does Thoori cosmetics have any physical stores?", answer: "Yes, Thoori Cosmetic has its physical stores!" }
  ],
  service: [
    { question: "How can I track my return status?", answer: "Once we have received your returned order, we'll take the necessary action and we'll update you through email" },
    { question: "Can I upgrade my service plan?", answer: "Yes, you can upgrade your plan from the subscription settings in your account." },
    { question: "Do you offer refunds?", answer: "Refunds are available within 30 days of purchase for eligible cases." },
    { question: "What do I do in cases of failed delivery?", answer: "In case of any concern with delivery of your order, you can contact us on support@thoori.com.com / call us on 1800-202-4849." },
    { question: "Can I return part of my order?", answer: "Yes. A return can be created at an item level. You can initiate a return/replacement/refund for any individual item by following the process mentioned under" },
    { question: "Why is my order not showing?", answer: "You can track all your orders from the 'Order History' option under 'My Account'. If your most recent order is not showing after successful payment, please do not worry and contact us on support@lakmeindia.com / call us on 1800-202-4849" }
  ],
  support: [
    { question: "How can I contact customer support?", answer: "Look for a 'Contact Us' or 'Help' button on our website to get support." },
    { question: "What is the response time for support?", answer: "We typically respond within 24 hours on business days." },
    { question: "Can I chat with customer support?", answer: "Yes, live chat is available during our support hours." },
    { question: "Are there any cancellation charges?", answer: "There are no separate cancellation charges" }
  ]
};

const steps = [
  { label: 'Email', icon: <EmailIcon /> },
  { label: 'Question', icon: <QuestionAnswerIcon /> },
  { label: 'Submit', icon: <CheckCircleIcon /> }
];

const InteractiveFAQ = () => {
  const [activeCategory, setActiveCategory] = useState('about');
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpandedItems({});
  };

  const handleFaqItemClick = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setUserQuestion(event.target.value);
    if (event.target.value.trim() !== '') {
      setQuestionError(false);
    }
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailError(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(($$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate email
      if (!validateEmail(userEmail)) {
        setEmailError(true);
        return;
      }
      setEmailError(false);
    } else if (activeStep === 1) {
      // Validate question
      if (userQuestion.trim() === '') {
        setQuestionError(true);
        return;
      }
      setQuestionError(false);
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send this data to your backend
    console.log('Question submitted:', { question: userQuestion, email: userEmail });
    setSnackbarOpen(true);
    
    // Reset form after submission
    setTimeout(() => {
      setUserQuestion('');
      setUserEmail('');
      setActiveStep(0);
    }, 2000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const filteredFaqData = searchQuery 
    ? Object.values(faqData).flat().filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory];

  return (
    <>
    <Navbar/>
    <Box sx={{ bgcolor: '#fcfbfa', mt: '-64px' }}> {/* Changed this line */}
      {/* Header */}
      <HeaderBox>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#654321' }}>
          FAQ
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          width: 300, 
          bgcolor: 'white' 
        }}>
          <TextField
            fullWidth
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#b37c42', ml: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ pl: 1 }}
          />
        </Box>
      </HeaderBox>

      {/* Trusted by customers */}
      <Typography variant="h4" sx={{ my: 3, color: '#a67c52', textAlign: 'center' }}>
        Trusted by 1000+ Customers
      </Typography>

      {/* Category Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
        <CategoryButton 
          active={activeCategory === 'about' ? 1 : 0}
          onClick={() => handleCategoryChange('about')}
        >
          About us
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'service' ? 1 : 0}
          onClick={() => handleCategoryChange('service')}
        >
          Returns and Refund
        </CategoryButton>
        <CategoryButton 
          active={activeCategory === 'support' ? 1 : 0}
          onClick={() => handleCategoryChange('support')}
        >
          Support
        </CategoryButton>
      </Box>

      {/* FAQ Items */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        {filteredFaqData.map((item, index) => (
          <FaqItem key={index} elevation={1} onClick={() => handleFaqItemClick(index)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {item.question}
              </Typography>
              {expandedItems[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
              <Typography variant="body2" sx={{ mt: 2, color: '#333' }}>
                {item.answer}
              </Typography>
            </Collapse>
          </FaqItem>
        ))}

        {/* Ask a Question Section */}
        <AskQuestionCard elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#654321', fontWeight: 'bold', textAlign: 'center' }}>
              Didn't Find Your Answer?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              Submit your question and we'll get back to you within 24 hours.
            </Typography>
            
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={() => (
                    <Box sx={{ 
                      color: activeStep >= index ? '#b37c42' : '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {step.icon}
                    </Box>
                  )}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <StepContent>
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Enter Your Email
                  </Typography>
                  <StyledTextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    value={userEmail}
                    onChange={handleEmailChange}
                    placeholder="example@email.com"
                    type="email"
                    error={emailError}
                    helperText={emailError ? "Please enter a valid email address" : ""}
                    required
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ActionButton
                      onClick={handleNext}
                      endIcon={<NavigateNextIcon />}
                    >
                      Next
                    </ActionButton>
                  </Box>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Enter Your Question
                  </Typography>
                  <StyledTextField
                    fullWidth
                    label="Your Question"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={userQuestion}
                    onChange={handleQuestionChange}
                    placeholder="Type your question here..."
                    error={questionError}
                    helperText={questionError ? "Please enter your question" : ""}
                    required
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleBack} sx={{ color: '#b37c42' }}>
                      Back
                    </Button>
                    <ActionButton
                      onClick={handleNext}
                      endIcon={<NavigateNextIcon />}
                    >
                      Next
                    </ActionButton>
                  </Box>
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Review and Submit
                  </Typography>
                  <Box sx={{ mb: 2, p: 2, bgcolor: 'white', borderRadius: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Email:</strong> {userEmail}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Question:</strong> {userQuestion}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleBack} sx={{ color: '#b37c42' }}>
                      Back
                    </Button>
                    <ActionButton
                      onClick={handleSubmit}
                      endIcon={<SendIcon />}
                    >
                      Submit Question
                    </ActionButton>
                  </Box>
                </Box>
              )}
            </StepContent>
          </CardContent>
        </AskQuestionCard>
      </Container>

      {/* Snackbar for submission confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your question has been submitted successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
    </>
  );
};

export default InteractiveFAQ;
