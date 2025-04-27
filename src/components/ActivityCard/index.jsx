import React, { useState } from 'react';
// import { Box, Flex, Text, Badge, IconButton, Button, useToast } from '@chakra-ui/react';
import { FaThumbsUp } from 'react-icons/fa';
import api from '../../services/api';
import {
    Box, Flex, Text, Button, Stack, Badge, Divider,
    Avatar, AvatarGroup, Progress, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel,
    useToast, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel,
    FormErrorMessage, FormHelperText, useBreakpointValue,
    useMediaQuery,
    HStack,
} from '@chakra-ui/react';

const ActivityCard = ({ activityData, trip_start_date, trip_end_date, reload, setReload, isOpen, onClose }) => {
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [activity, setActivity] = useState({
        title: activityData.activity_name,
        date_time: activityData.activity_date,
        category: activityData.category,
        estimated_cost: activityData.estimated_cost,
        notes: activityData.notes,
        votes: activityData.votes,
    });

    const formattedDate = new Date(activityData.activity_date).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    console.log("activityData", activityData)
    const toast = useToast();

    const handleAddActivity = () => {
        const selectedDate = new Date(activity.date_time);
        const startDate = new Date(trip_start_date);
        const endDate = new Date(trip_end_date);


        console.log('Activity added:', activity);
        const addActivity = async () => {
            const response = await api.updateActivity({
                "trip_code": activityData.trip_code,
                "activity_id": activityData.activity_id,
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
        <Box mb={6}>
            <Flex align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold">{formattedDate}</Text>
                {/* <Badge ml={2} colorScheme="green">{activityData?.category}</Badge> */}
            </Flex>

            {/* Activity */}
            <Box bg="white" p={4} rounded="md" shadow="sm" mb={4}>
                <Flex justify="space-between" mb={2}>
                    <Badge colorScheme="green">{activityData.category || "General"}</Badge>
                    <Text fontSize="sm" color="gray.500">{new Date(activityData.activity_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || "9:00 AM"}</Text>
                </Flex>
                <Text fontWeight="bold">{activityData.activity_name}</Text>
                <Text fontSize="sm" color="gray.500" mb={2}>{activityData.notes || "No additional notes"}</Text>
                <Flex justify="space-between" align="center" fontSize="sm">
                    <Text>${activityData.estimated_cost}</Text>
                    <Flex align="center" gap={1}>
                        <Text color="gray.500">Added by {activityData.created_by}</Text>
                        <IconButton icon={<FaThumbsUp />} size="xs" aria-label="Like" />
                        <Text>{activityData.votes}</Text>
                    </Flex>
                </Flex>
                <Flex mt={4} gap={2} flexDirection={"row-reverse"} justify="">
                    <Box
                        as="button"
                        bg="red.500"
                        color="white"
                        px={4}
                        py={2}
                        rounded="md"
                        _hover={{ bg: "red.600" }}
                    >
                        <div onClick={() => {
                            // Handle delete action
                            console.log("Delete activity");
                            async function deleteActivity() {
                                // Implement the delete logic here
                                const response = await api.deleteActivity({
                                    trip_code: activityData.trip_code,
                                    activity_id: activityData.activity_id,
                                });
                                console.log("response", response);
                                if (response && response.data) {
                                    toast({
                                        title: 'Activity deleted successfully.',
                                        description: 'Your activity has been deleted.',
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                    setReload(!reload);
                                } else {
                                    toast({
                                        title: 'Error',
                                        description: 'An error occurred while deleting the activity.',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }
                            }
                            deleteActivity();
                        }}>
                            Delete
                        </div>
                    </Box>
                    <Box
                        as="button"
                        bg="blue.500"
                        color="white"
                        px={4}
                        py={2}
                        rounded="md"
                        _hover={{ bg: "blue.600" }}
                    >
                        <div onClick={() => {
                            setIsActivityModalOpen(true)
                        }}>
                            Edit
                        </div>
                    </Box>
                    <Box>
                        <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit Activity</ModalHeader>
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
                                    <Button colorScheme="blue" onClick={handleAddActivity}>Save</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default ActivityCard;
