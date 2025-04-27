import React from 'react';
import { Box, Flex, Text, Badge, AvatarGroup, Avatar, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TripCard = ({ trips }) => {
    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
            {trips && trips.map((trip, index) => {
                const currentDate = new Date();
                const startDate = new Date(trip.trip_start_date);
                const endDate = new Date(trip.trip_end_date);

                let status = "Upcoming";
                if (currentDate > endDate) {
                    status = "Past";
                } else if (currentDate >= startDate && currentDate <= endDate) {
                    status = "Ongoing";
                }

                return (
                    <Box
                        key={index}
                        bg="white"
                        p={6}
                        rounded="md"
                        shadow="md"
                        maxW="400px"
                    >
                        <Flex justify="space-between" align="center" mb={4}>
                            <Text fontSize="lg" fontWeight="bold">{trip.trip_name}</Text>
                            <Badge colorScheme={status === "Upcoming" ? "blue" : status === "Ongoing" ? "green" : "gray"} fontSize="0.8em">
                                {status}
                            </Badge>
                        </Flex>

                        <Text fontSize="sm" color="gray.500" mb={4}>
                            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                        </Text>

                        <Flex align="center" mb={4}>
                            <AvatarGroup size="sm" max={3}>
                                {trip.trip_participants.map((participant, idx) => (
                                    <Avatar key={idx} name={participant} />
                                ))}
                            </AvatarGroup>
                            <Text fontSize="sm" ml={2}>{trip.trip_participants.length} people</Text>
                        </Flex>

                        <Stack direction="row" spacing={4} fontSize="sm" mb={6}>
                            <Text fontWeight="bold">Location: {trip.trip_location}</Text>
                            <Text>Budget: <b>${trip.trip_budget}</b></Text>
                        </Stack>

                        <Link to={`/tripdetails/${trip.trip_code}`}>
                            <Button colorScheme="orange" w="full">
                                View Details
                            </Button>
                        </Link>
                    </Box>
                  );
            })}
            {trips.length === 0 && (
                <Box
                    bg="white"
                    p={6}
                    rounded="md"
                    shadow="md"
                    maxW="400px"
                    textAlign="center"
                >
                    <Text fontSize="lg" fontWeight="bold">No Trips Found</Text>
                    <Text color="gray.500">Create a new trip to get started!</Text>
                </Box>
            )}
        </Box>
    );
};

export default TripCard;