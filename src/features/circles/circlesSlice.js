import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// Fetch all circles
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

export const fetchCircleById = createAsyncThunk(
    'circles/fetchCircleById',
    async (circleId) => {
        const db = getFirestore();
        const circleDoc = doc(db, 'circles', circleId);
        const snapshot = await getDoc(circleDoc);
        if (!snapshot.exists()) {
            throw new Error("Circle not found");
        }
        const data = snapshot.data();
        return {
            ...data,
            id: snapshot.id,
            expirestAt: data.expirestAt?.toDate().toISOString() || null,
            createdAt: data.createdAt?.toDate()?.toISOString() || null,
        };
    }
);

const circlesSlice = createSlice({
    name: "circles",
    initialState: {
        circles: [],
        status: 'idle',
        selectedCircle: null,
        error: null,
    },
    reducers: {
        setSelectedCircle(state, action) {
            state.selectedCircle = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchCircles
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

            //  fetchCircleById
            .addCase(fetchCircleById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.selectedCircle = null;
            })
            .addCase(fetchCircleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCircle = action.payload;
            })
            .addCase(fetchCircleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log(state.error);
            });
    },
});

export default circlesSlice.reducer;
export const { setSelectedCircle } = circlesSlice.actions;
