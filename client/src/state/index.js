import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "patient",
    docInfo: [],
    doctors: [],
    patInfo: [],
    patients: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload.page
        },
        setDoc: (state, action) => {
            state.docInfo = action.payload.docInfo
        },
        setPat: (state, action) => {
            state.patInfo = action.payload.patInfo
        },
        setDoctors: (state, action) => {
            state.doctors = action.payload.doctors
        },
        setPatients: (state, action) => {
            state.patients = action.payload.patients
        }
        // setLogout: (state) => {
        //     state.user = null
        //     state.token = null
        // },
        // setFriends: (state, action) => {
        //     if (state.user) {
        //         state.user.friends = action.payload.friends
        //     } else {
        //         console.error("User friends non-existent :(")
        //     }
        // },
        // setPosts: (state, action) => {
        //     state.posts = action.payload.posts
        // },
        // setPost: (state, action) => {
        //     const updatedPosts = state.posts.map((post) => {
        //         if (post._id === action.payload.post._id) return action.payload.post
        //         return post
        //     })
        //     state.posts = updatedPosts
        // }
    }
})

export const { setPage, setDoc, setPat, setDoctors, setPatients } = authSlice.actions
export default authSlice.reducer