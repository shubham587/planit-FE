import React from 'react'
import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    return (
        <Box bg="gray.100" w="100%" position="fixed" top="0" zIndex="20">
            <Flex justify="space-between" align="center" p={4} px={8} boxShadow="md">
                <Link to="/">
                    <Heading size="md" color="#3182CE">
                        JourneyShare
                    </Heading>
                </Link>
                <HStack spacing={6}>
                    {
                        localStorage.getItem("token") ? (
                            <>
                                <NavLink
                                    to="/trips"
                                    style={({ isActive }) => ({
                                        fontWeight: "bold",
                                        color: isActive ? "#3182CE" : "inherit",
                                    })}
                                >
                                    My Trips
                                </NavLink>
                                <NavLink
                                    to="/newtrip"
                                    style={({ isActive }) => ({
                                        fontWeight: "bold",
                                        color: isActive ? "#3182CE" : "inherit",
                                    })}
                                >
                                    New Trip
                                </NavLink>
                                <Button
                                    onClick={() => {
                                        localStorage.removeItem("token")
                                        window.location.reload()
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (<><NavLink
                            to="/login"
                            style={({ isActive }) => ({
                                fontWeight: "bold",
                                color: isActive ? "#3182CE" : "inherit",
                            })}
                        >
                            Login
                        </NavLink>
                            <NavLink
                                to="/signup"
                                style={({ isActive }) => ({
                                    fontWeight: "bold",
                                    color: isActive ? "#3182CE" : "inherit",
                                })}
                            >
                                Sign Up
                            </NavLink></>)
                    }

                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar