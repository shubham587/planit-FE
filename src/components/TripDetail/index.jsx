import React from 'react';
import {
    Box, Flex, Text, Button, Stack, Badge, Divider,
    Avatar, AvatarGroup, Progress, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel,
    useToast, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel,
    FormErrorMessage, FormHelperText, useBreakpointValue,
    useMediaQuery,
    HStack,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { FaThumbsUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import ActivityCard from '../ActivityCard';

const TripPage = () => {
    const { id } = useParams();
    const [tripData, setTripData] = useState(null);
    const [reload, setReload] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [trip_id, setTripId] = useState(id);
    const [budgetData, setBudgetData] = useState({});
    const [activityList, setActivityList] = useState([]);
    const [activity, setActivity] = useState({
        title: '',
        date_time: '',
        category: '',
        estimated_cost: '',
        notes: '',
        votes: 0,
    });
    const toast = useToast();
    // console.log(id, "id")
    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const response = await api.getTripById(id);
                setTripData(response.data?.data);
            } catch (error) {
                console.error('Error fetching trip data:', error);
            }
        };

        fetchTripData();
    }, [reload, id]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await api.getActitvityById(id);
                console.log("response", response)
                setActivityList(response.data?.data)
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        const fetchBudgetData = async () => {
            try {
                const response = await api.remainingBudget({ "trip_code": id });
                console.log("response", response)
                setBudgetData(response.data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };
        fetchBudgetData();

        fetchActivityData();
    }, [reload, id]);
    console.log("activityList", activityList)


    if (!tripData) {
        return <Text>Loading...</Text>;
    }

    const {
        trip_name,
        trip_start_date,
        trip_end_date,
        trip_budget,
        trip_code,
        trip_created_by,
        trip_participants,
        trip_location,
    } = tripData;



    const handleAddActivity = () => {
        const selectedDate = new Date(activity.date_time);
        const startDate = new Date(trip_start_date);
        const endDate = new Date(trip_end_date);


        console.log('Activity added:', activity);
        const addActivity = async () => {
            const response = await api.addActivity({
                trip_code,
                "activity_name": activity.title,
                "activity_date": activity.date_time,
                "activity_category": activity.category,
                "activity_estimated_cost": activity.estimated_cost,
                "activity_notes": activity.notes,
            });
            console.log("response", response);
            if (response && response.data) {
                // Handle the response data
                // setTripData(response.data?.data);
                toast({
                    title: 'Activity added successfully.',
                    description: 'Your activity has been added.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setActivity({
                    title: '',
                    date_time: '',
                    category: '',
                    estimated_cost: '',
                    notes: '',
                    votes: 0,
                });
                setReload(!reload);
            } else {
                // Handle error
                console.error("Error adding activity");
                toast({
                    title: 'Error',
                    description: 'An error occurred while adding the activity.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
        addActivity();
        setIsActivityModalOpen(false);
    }

    return (
        <Box bg="gray.50" minH="100vh" p={8}>
            <Flex justify="space-between" align="flex-start" gap={6} flexDirection={{ base: 'column', md: 'row' }}>
                {/* Left Side */}
                <Box flex={2}>
                    <Flex justify="space-between" align="center" mb={8}>
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold">{trip_name}</Text>
                            <Flex fontSize="sm" color="gray.500" mt={1} gap={4}>
                                <Text>📅 {new Date(trip_start_date).toLocaleDateString()} - {new Date(trip_end_date).toLocaleDateString()}</Text>
                                <Text>💲 Budget: ${trip_budget}</Text>
                            </Flex>
                        </Box>
                        <Flex gap={4}>
                            <Button onClick={() => {
                                navigator.clipboard.writeText(trip_code);
                                toast({
                                    title: 'Copied to clipboard',
                                    description: 'Trip code has been copied to your clipboard.',
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }}>Invite Friends</Button>
                            <Button colorScheme="blue" onClick={() => setIsActivityModalOpen(true)}>Add Activity</Button>
                        </Flex>
                    </Flex>
                    <Flex gap={6} mb={8} flexDirection="column">
                        <Box>
                            <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Add Activity</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <FormControl isRequired>
                                                <FormLabel>Title</FormLabel>
                                                <Input
                                                    placeholder="Title"
                                                    value={activity.title}
                                                    onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Date & Time</FormLabel>
                                                <Input
                                                    type="datetime-local"
                                                    value={activity.date_time}
                                                    onChange={(e) => {
                                                        const selectedDate = new Date(e.target.value);
                                                        const startDate = new Date(trip_start_date);
                                                        const endDate = new Date(trip_end_date);
                                                        if (selectedDate >= startDate && selectedDate <= endDate) {
                                                            setActivity({ ...activity, date_time: e.target.value });
                                                        } else {
                                                            toast({
                                                                title: 'Invalid Date',
                                                                description: `Please select a date between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()}.`,
                                                                status: 'error',
                                                                duration: 3000,
                                                                isClosable: true,
                                                            });
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Category</FormLabel>
                                                <Input
                                                    placeholder="Category"
                                                    value={activity.category}
                                                    onChange={(e) => setActivity({ ...activity, category: e.target.value })}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Estimated Cost</FormLabel>
                                                <Input
                                                    type="number"
                                                    placeholder="Estimated Cost"
                                                    value={activity.estimated_cost}
                                                    onChange={(e) => setActivity({ ...activity, estimated_cost: e.target.value })}
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Notes</FormLabel>
                                                <Textarea
                                                    placeholder="Notes"
                                                    value={activity.notes}
                                                    onChange={(e) => setActivity({ ...activity, notes: e.target.value })}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button variant="ghost" onClick={() => setIsActivityModalOpen(false)}>Cancel</Button>
                                        <Button colorScheme="blue" onClick={handleAddActivity}>Add</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>
                        <Box>
                            <Tabs variant="soft-rounded" colorScheme="blue">
                                <TabList mb={4}>
                                    <Tab>Itinerary</Tab>
                                    {/* <Tab>All Activities</Tab> */}
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        {/* Itinerary content */}
                                        <Stack spacing={4}>
                                            {activityList && activityList
                                                .sort((a, b) => new Date(a.activity_date) - new Date(b.activity_date))
                                                .map((activity, index) => (
                                                    <ActivityCard trip_start_date={trip_start_date} trip_code={trip_code} trip_end_date={trip_end_date} isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} activityData={activity} key={index} setReload={setReload} reload={reload} />
                                                ))}
                                        </Stack>
                                    </TabPanel>
                                    <TabPanel>
                                        <Text>All activities listed here...</Text>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Flex>
                </Box>

                {/* Right Side */}
                <Box flex={1}>
                    {/* Trip Details */}
                    <Box bg="white" p={6} rounded="md" shadow="md" mb={6}>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>Trip Details</Text>

                        <Flex justify="space-between" align="center" mb={2}>
                            <Text fontWeight="medium">Trip Code</Text>
                            <Flex align="center" gap={2}>
                                <Text fontFamily="mono" fontSize="sm">{trip_code}</Text>
                                <IconButton
                                    size="xs"
                                    icon={<CopyIcon />}
                                    aria-label="Copy Code"
                                    onClick={() => {
                                        navigator.clipboard.writeText(trip_code);
                                        toast({
                                            title: 'Copied to clipboard',
                                            description: 'Trip code has been copied to your clipboard.',
                                            status: 'success',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    }}
                                />
                            </Flex>
                        </Flex>

                        <Divider my={2} />

                        <Flex align="center" gap={2} mb={2}>
                            <Text fontSize="sm">📅 {new Date(trip_start_date).toLocaleDateString()} - {new Date(trip_end_date).toLocaleDateString()}</Text>
                        </Flex>

                        <Divider my={2} />

                        <Stack spacing={2} fontSize="sm">
                            <Flex justify="space-between">
                                <Text>Total Budget:</Text><Text>${trip_budget}</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text>Total Spent:</Text><Text>${budgetData?.spentBudget}</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text>Remaining:</Text><Text>${budgetData?.remainingBudget}</Text>
                            </Flex>
                        </Stack>

                        <Progress
                            value={100 - (budgetData?.remainingBudget / trip_budget) * 100}
                            colorScheme={
                                (100 - (budgetData?.remainingBudget / trip_budget) * 100) < 50
                                    ? 'green'
                                    : (100 - (budgetData?.remainingBudget / trip_budget) * 100) < 75
                                    ? 'yellow'
                                    : 'red'
                            }
                            mt={4}
                        />
                        {100 - (budgetData?.remainingBudget / trip_budget) * 100 > 100 && 
                            toast({
                                title: 'Budget Exceeded',
                                description: 'You have exceeded the trip budget!',
                                status: 'error',
                                duration: 1500,
                                isClosable: true,
                            })
                        }
                    </Box>
                    <Box bg="white" p={6} rounded="md" shadow="md">
                        <Text fontSize="lg" fontWeight="bold" mb={4}>Participants</Text>

                        <Stack spacing={3}>
                            {trip_participants && trip_participants?.map((participant, index) => (
                                <Flex key={index} justify="space-between" align="center">
                                    <Flex align="center" gap={3}>
                                        <Avatar size="sm" name={participant} />
                                        <Box>
                                            <Text fontWeight="medium">{participant}</Text>
                                        </Box>
                                    </Flex>
                                    {participant === trip_created_by && <Badge colorScheme="green">Creator</Badge>}
                                </Flex>
                            ))}
                        </Stack>

                        <Button onClick={() => {
                            navigator.clipboard.writeText(trip_code);
                            toast({
                                title: 'Copied to clipboard',
                                description: 'Trip code has been copied to your clipboard.',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            });
                        }} mt={6} w="full" leftIcon={<CopyIcon />} colorScheme="blue">
                            Invite More
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default TripPage;
