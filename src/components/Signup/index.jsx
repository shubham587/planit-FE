import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    HStack,
    Link,
    useToast,
} from '@chakra-ui/react';
import Navbar from '../Navbar'; // Adjust the path based on your file structure
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { loginSuccess } from '../../redux-store/user';
import { useSelector } from 'react-redux';
import { Link as FLink } from 'react-router-dom';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const validateForm = () => {
        if (username.length < 5) {
            toast({
                title: 'Validation Error',
                description: 'Username must be at least 5 characters long.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast({
                title: 'Validation Error',
                description:
                    'Password must be at least 8 characters long, contain one special character, and one number.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Validation Error',
                description: 'Passwords do not match.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Add your signup logic here

            const validateSignup = async () => {
                const data = {
                    username,
                    email,
                    password,
                };
                // Assuming you have a signup API endpoint
                const response = await api.userSignup(data);
                console.log('response', response);
                if (response && response.data) {
                    // Assuming the response contains a token
                    dispatch(loginSuccess(response.data));
                    localStorage.setItem('token', response.data?.access_token);
                    toast({
                        title: 'Signup successful.',
                        description: 'Your account has been created.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate("/")
                } else {
                    toast({
                        title: 'Signup failed.',
                        description: 'An error occurred during signup.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
            

            validateSignup();
        }
    };

    return (
        <>
            <Navbar />
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bgGradient="linear(to-b, blue.50, green.50)"
                zIndex="-1"
            />
            <Box
                w="100%"
                h="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    bg="white"
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="lg"
                    p="8"
                    maxW="500px"
                    w="100%"
                >
                    <Heading mb="4" textAlign="center" color="blue.600">
                        Create an account
                    </Heading>
                    <Text mb="6" textAlign="center" color="blue.700">
                        Enter your details to create your account
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing="4">
                            <FormControl id="username" isRequired>
                                <FormLabel color="blue.700">Username</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    focusBorderColor="blue.400"
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel color="blue.700">Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    focusBorderColor="blue.400"
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel color="blue.700">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    focusBorderColor="blue.400"
                                />
                            </FormControl>
                            <FormControl id="confirmPassword" isRequired>
                                <FormLabel color="blue.700">Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    focusBorderColor="blue.400"
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="blue" width="full">
                                Sign Up
                            </Button>
                        </VStack>
                    </form>
                    <Text mt="6" textAlign="center" color="blue.700">
                        Already have an account?{' '}
                        <FLink color="blue.500" to="/login">
                            Sign in
                        </FLink>
                    </Text>
                </Box>
            </Box>
        </>
    );
};
export default Signup;
