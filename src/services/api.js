import axios from "axios";

const instance = axios.create({
    baseURL: "https://planit-be-production.up.railway.app"
})


const getProject = (data) =>
    instance({
        method: "GET",
        url: "/get_AllProjects",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        params: { project_name: "RDKECOREMW" }
    }).then((response) => {
        console.log("getProject", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const userLogin = (data) =>
    instance({
        method: "POST",
        url: "/login",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data
    }).then((response) => {
        console.log("userLogin", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })


const userSignup = (data) =>
    instance({
        method: "POST",
        url: "/register",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data
    }).then((response) => {
        console.log("userSignup", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const userLogout = (data) => 
    instance({
        method: "POST",
        url: "/signup",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
    }).then((response) => {
        console.log("userLogout", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const postTrip = (data) =>
    instance({
        method: "POST",
        url: "/post_trip",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
    }).then((response) => {
        console.log("postTrip", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const getAllTrip = (data) =>
    instance({
        method: "GET",
        url: "/get_all_trips",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        // params: { "": data }
    }).then((response) => {
        console.log("getTrip", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const getTripById = (data) =>
    instance({
        method: "GET",
        url: "/get_trip",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: { trip_code: data }
    }).then((response) => {
        console.log("getTripById", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const getActitvityById = (data) =>
    instance({
        method: "GET",
        url: "/get_trip_activities",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: { trip_code: data }
    }).then((response) => {
        console.log("getActitvityById", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const addActivity = (data) =>
    instance({
        method: "POST",
        url: "/add_trip_activity",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
    }).then((response) => {
        console.log("addActivity", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const deleteActivity = (data) =>
    instance({
        method: "DELETE",
        url: "/delete_trip_activity",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: data
    }).then((response) => {
        console.log("deleteActivity", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const updateActivity = (data) =>
    instance({
        method: "PUT",
        url: "/update_trip_activity",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
    }).then((response) => {
        console.log("updateActivity", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const remainingBudget = (data) =>
    instance({
        method: "GET",
        url: "/calculate_remaining_budget",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: data
    }).then((response) => {
        console.log("remainingBudget", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const addUserToTrip = (data) =>
    instance({
        method: "POST",
        url: "/post_trip_participants",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
    }).then((response) => {
        console.log("addUserToTrip", response)
        return response
    }
    ).catch((error) => {
        console.log(error)
        return error
    })

const api = {
    // getProject,
    userLogin,
    userLogout,
    userSignup,
    postTrip,
    getAllTrip,
    getTripById,
    getActitvityById,
    addActivity,
    deleteActivity,
    updateActivity,
    remainingBudget,
    addUserToTrip
}

export default api 