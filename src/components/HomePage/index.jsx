import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
    HStack,
    VStack,
    Icon,
} from "@chakra-ui/react";
import { FaPlaneDeparture, FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function HomePage() {

    const user = useSelector((state) => state.user);

    return (
        <Box>

            {/* Navbar */}
            {/* <Navbar /> */}

            {/* Hero Section */}
            <Box
                textAlign="center"
                py={20}
                px={6}
                bgGradient="linear(to-b, blue.50, green.50)"
            >
                <Heading fontSize={{ base: "3xl", md: "4xl" }}>
                    Plan trips together,{" "}
                    <Text as="span" color="blue.500">
                        effortlessly
                    </Text>
                </Heading>
                <Text mt={4} maxW="600px" mx="auto" color="gray.600">
                    JourneyShare makes it easy to plan trips with friends. Create itineraries,
                    vote on activities, and make your travel dreams a reality.
                </Text>
                <Stack mt={8} direction={{ base: "column", sm: "row" }} spacing={4} justify="center">
                    <Link to="/trips">
                        <Button colorScheme="blue">Get Started</Button>
                    </Link>
                    {!localStorage.getItem("token") && <Button variant="outline" colorScheme="blue">
                        Sign In
                    </Button>}
                </Stack>
            </Box>

            {/* How It Works */}
            <Box py={16} bg="white">
                <Container maxW="6xl">
                    <Heading textAlign="center" size="lg" mb={12}>
                        How It Works
                    </Heading>
                    <Flex direction={{ base: "column", md: "row" }} justify="space-around" gap={10}>
                        <VStack spacing={4} textAlign="center">
                            <Icon as={FaPlaneDeparture} w={12} h={12} color="blue.400" />
                            <Text fontWeight="bold">Create Your Trip</Text>
                            <Text color="gray.500" maxW="250px">
                                Start by creating a trip with dates, budget, and destination.
                                Get a unique trip code to share.
                            </Text>
                        </VStack>
                        <VStack spacing={4} textAlign="center">
                            <Icon as={FaUserFriends} w={12} h={12} color="orange.400" />
                            <Text fontWeight="bold">Invite Friends</Text>
                            <Text color="gray.500" maxW="250px">
                                Share your trip code or send email invites to friends so
                                they can collaborate on planning.
                            </Text>
                        </VStack>
                        <VStack spacing={4} textAlign="center">
                            <Icon as={FaMapMarkedAlt} w={12} h={12} color="green.400" />
                            <Text fontWeight="bold">Plan Together</Text>
                            <Text color="gray.500" maxW="250px">
                                Add activities, vote on preferences, and track your budget
                                to create the perfect itinerary.
                            </Text>
                        </VStack>
                    </Flex>
                </Container>
            </Box>

            {/* Call To Action */}
            <Box py={16} bg="blue.50" textAlign="center">
                <Heading size="md" mb={4}>
                    Ready to plan your next adventure?
                </Heading>
                <Text mb={8} color="gray.600">
                    Join JourneyShare today and start creating memorable trips with friends and family.
                </Text>
                {!localStorage.getItem("token") && <Link to="/signup">
                    <Button colorScheme="blue" size="lg" mr={4}>
                        Sign Up
                    </Button>
                </Link>}
            </Box>
        </Box>
    );
}

export default HomePage
