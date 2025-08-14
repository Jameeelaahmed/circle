import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Fetch members for a specific circle
export const fetchCircleMembers = createAsyncThunk(
    "members/fetchCircleMembers",
    async (circleId) => {
        const db = getFirestore();
        const membersCol = collection(db, "circles", circleId, "members");
        const snapshot = await getDocs(membersCol);
        return {
            circleId,
            members: snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    joinedAt: data.joinedAt ? data.joinedAt.toDate().toISOString() : null,
                    // updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt ?? null,
                };
            }),
        };
    }
);

const circleMembersSlice = createSlice({
    name: "circleMembers",
    initialState: {
        membersByCircle: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCircleMembers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCircleMembers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.membersByCircle[action.payload.circleId] = action.payload.members;
            })
            .addCase(fetchCircleMembers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default circleMembersSlice.reducer;