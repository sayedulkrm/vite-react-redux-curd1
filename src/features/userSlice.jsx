import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://645a23b065bd868e9312083e.mockapi.io/reduxcurd";

// Action Creating ==========================>
export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// <================    Add Users =================>

export const addNewUser = createAsyncThunk(
    "users/addNewUser",
    async (data, { rejectWithValue }) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// <================    Delete Users =================>

export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${url}/${id}`, { method: "DELETE" });
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// <================    Update Users =================>

export const updateUser = createAsyncThunk(
    "users/update",
    async (data, { rejectWithValue }) => {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(`${url}/${data.id}`, options);
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Slice ===========================>

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isLoading: false,
        users: [],
        error: null,
    },
    extraReducers: (builder) => {
        // Get All Users ===================>
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });

        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Add New User ===================>

        builder.addCase(addNewUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(addNewUser.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.users.push(action.payload);
            state.users = [...state.users, action.payload];
        });

        builder.addCase(addNewUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Delete User ===================>

        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter(
                (user) => user.id !== action.payload.id
            );
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Update User ===================>

        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default userSlice.reducer;
