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
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import store from '../../redux-store/store';
import { useDispatch } from 'react-redux';
import {loginSuccess } from "../../redux-store/user"
import { Link as FLink} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here

        const validateLogin = async () => {
            const data = {
                email, password
            }
            const response = await api.userLogin(data)
            console.log("response", response)
            if(response && response.data){
                dispatch(loginSuccess(response.data))
                localStorage.setItem("token", response.data.access_token)
                toast({
                    title: 'Login successful.',
                    description: 'You have successfully logged in.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/")
            }else{
                toast({
                    title: 'Login failed.',
                    description: 'Invalid email or password.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }

        validateLogin()

        
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
                    maxW="450px"
                    w="100%"
                >
                    <Heading mb="4" textAlign="center" color="blue.600">
                        Welcome back
                    </Heading>
                    <Text mb="6" textAlign="center" color="blue.700">
                        Enter your email to sign in to your account
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing="4">
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
                                <HStack justifyContent="space-between">
                                    <FormLabel color="blue.700">Password</FormLabel>
                                    <Link onClick={() => {
                                        // Handle forgot password logic here
                                        toast({
                                            title: 'Feature not implemented.',
                                            description: 'This feature is not implemented yet.',
                                            status: 'info',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    }} color="blue.500" fontSize="sm" href="#">
                                        Forget Password?
                                    </Link>
                                </HStack>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    focusBorderColor="blue.400"
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="blue" width="full">
                                Login
                            </Button>
                        </VStack>
                    </form>
                    <Text mt="6" textAlign="center" color="blue.700">
                        Don't have an account?{' '}
                        <FLink color="blue.500" to="/signup">
                            Sign up
                        </FLink>
                    </Text>
                </Box>
            </Box>
        </>
    );
};
export default Login;
