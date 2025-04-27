import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useToast,
    Flex,
    Heading,
    HStack,
} from '@chakra-ui/react';
import Navbar from '../Navbar';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';



const NewTrip = ({ onCancel, onCreate }) => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleCreate = () => {
        if (!tripName || !startDate || !endDate || !location) {
            toast({
                title: 'Error',
                description: 'Please fill in all required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            toast({
                title: 'Error',
                description: 'Start date must be earlier than end date.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newTrip = { "trip_name": tripName, "trip_start_date": startDate, "trip_end_date":endDate, "trip_budget":budget, "trip_location":location };
        console.log("newTrip", newTrip);

        const postTrip = async () => {
            const response = await api.postTrip(newTrip);
            console.log("response", response);
            if (response && response.data) {
                toast({
                    title: 'Trip created successfully.',
                    description: 'Your trip has been created.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/trips");
            } else {
                toast({
                    title: 'Error',
                    description: 'An error occurred while creating the trip.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        postTrip();
        // onCreate(newTrip);
    };

    return (
        <Box bgGradient="linear(to-b, blue.50, green.50)" minH="100vh">
            {/* Navbar */}
            <Navbar />

            {/* Centered Form */}
            <Flex justify="center" align="center" minH="calc(100vh - 64px)">
                <Box p={6} w={"80vh"} borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Create New Trip
                    </Text>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Trip Name</FormLabel>
                            <Input
                                placeholder="Enter trip name"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Location</FormLabel>
                            <Input
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </FormControl>
                        <HStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Start Date</FormLabel>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>End Date</FormLabel>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Budget (Optional)</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                            />
                        </FormControl>
                        <Stack direction="row" spacing={4} justify="flex-end">
                            <Button onClick={onCancel} colorScheme="gray">
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} colorScheme="blue">
                                Create Trip
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
};

export default NewTrip;