import React, { use, useState } from 'react';
import {
    Box,
    Text,
    Button,
    Flex,
    Stack,
    Badge,
    AvatarGroup,
    Avatar,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { tr } from 'framer-motion/client';
import api from '../../services/api';
import { useEffect } from 'react';
import TripCard from '../TripCard';
const MyTrips = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tripCode, setTripCode] = useState('');
    const [tripDetails, setTripDetails] = useState({});
    const [tripList, setTripList] = useState([]);
    const [reload, setReload] = useState(false);

    const toast = useToast();

    const handleEnterTripCode = () => {
        console.log('Entered Trip Code:', tripCode);
        // Here you can handle the trip code submission
        const addUserToTrip = async () => {
            const response = await api.addUserToTrip({"trip_code": tripCode});
            console.log("response", response);
            if (response && response.data) {
                // Handle the response data
                // setTripDetails(response.data?.data);
                setReload(!reload);
                toast({
                    title: 'Success',
                    description: 'You have successfully joined the trip.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else if(response.status === 400){
                // Handle error
                console.error("Trip code is invalid");
                toast({
                    title: 'Error',
                    description: 'User already a participant of this Trip.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

            }else if(response.status === 404){
                // Handle error
                console.error("Trip code is invalid");
                toast({
                    title: 'Error',
                    description: 'Trip code is invalid.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            else {
                // Handle error
                console.error("Error fetching trip details");
            }
        }
        addUserToTrip();
        onClose();
    };

    useEffect(() => {
        const getAllTrips = async () => {
            const response = await api.getAllTrip();
            console.log("response", response);
            if (response && response.data) {
                // Handle the response data
                setTripList(response.data?.data);

            } else {
                // Handle error
                console.error("Error fetching trips");
            }
        }
        getAllTrips()
    
    }, [reload]);
    console.log("tripList", tripList)
    return (
        <>
            {/* Navbar */}
            <Box bg="gray.50" minH="100vh" p={8}>
                {/* Header */}
                <Flex justify="space-between" align="center" mb={8}>
                    <Text fontSize="2xl" fontWeight="bold">My Trips</Text>
                    <Flex gap={4}>
                        <Link to="/newtrip">
                            <Button colorScheme="blue">Create New Trip</Button>
                        </Link>
                        <Button colorScheme="teal" onClick={onOpen}>Enter Trip Code</Button>
                    </Flex>
                </Flex>

                {/* Trip Card */}
                <TripCard trips={tripList} />
                {/* <Box
                    bg="white"
                    p={6}
                    rounded="md"
                    shadow="md"
                    maxW="400px"
                >
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="lg" fontWeight="bold">Mountain Getaway</Text>
                        <Badge colorScheme="blue" fontSize="0.8em">Upcoming</Badge>
                    </Flex>

                    <Text fontSize="sm" color="gray.500" mb={4}>May 10 - 15, 2025</Text>

                    <Flex align="center" mb={4}>
                        <AvatarGroup size="sm" max={3}>
                            <Avatar name="Person 1" src="https://bit.ly/ryan-florence" />
                            <Avatar name="Person 2" src="https://bit.ly/prosper-baba" />
                            <Avatar name="Person 3" src="https://bit.ly/code-beast" />
                        </AvatarGroup>
                        <Text fontSize="sm" ml={2}>3 people</Text>
                    </Flex>

                    <Stack direction="row" spacing={4} fontSize="sm" mb={6}>
                        <Text fontWeight="bold">3 activities planned</Text>
                        <Text>Budget: <b>$1200</b></Text>
                    </Stack>

                    <Link to="/tripdetails">
                        <Button colorScheme="orange" w="full">
                            View Details
                        </Button>
                    </Link>
                </Box> */}
            </Box>

            {/* Enter Trip Code Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Trip Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Enter your trip code"
                            value={tripCode}
                            onChange={(e) => setTripCode(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleEnterTripCode}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MyTrips;
