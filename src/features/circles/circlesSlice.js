import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const fetchCircles = createAsyncThunk(
    'circles/fetchCircles',
    async () => {
        const db = getFirestore();
        const circlesCol = collection(db, 'circles');
        const snapshot = await getDocs(circlesCol);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            const transformedData = {
                ...data,
                id: doc.id,
                expirestAt: data.expirestAt?.toDate().toISOString() || null,
                createdAt: data.createdAt?.toDate()?.toISOString() || null,
            };

            return transformedData;
        });
    }
);
const circlesSlice = createSlice({
    name: "circles",
    initialState: {
        circles: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCircles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCircles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.circles = action.payload;
            })
            .addCase(fetchCircles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log(state.error);

            })

    },
});

export default circlesSlice.reducer;
