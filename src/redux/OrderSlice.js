
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { all } from "axios";

 export const fetchAllOrders = createAsyncThunk('orders/fetchOrders', async () => {
   const response = await axios.get('http://localhost:5000/orders');   
    return response.data;

 });

export const saveOrder = createAsyncThunk("order/saveOrder", async (order, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/orders", order);
      return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
  export const fetchOrders = createAsyncThunk("order/fetchOrders", async (username, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders?username=${username}`); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ orderId, newStatus }) => {
      const response = await fetch(`http://localhost:5000/orders/${orderId}/status`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
  console.log(response,orderId,newStatus);
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
  
      return await response.json(); 
    }
  );
  
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: [],
    loading: false,
    error: null,
    allOrders: [],
  },
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = [action.payload];
    },
    clearOrderDetails: (state) => {
      state.orderDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = [action.payload];
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      // .addCase(fetchAllOrders.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || "Something went wrong";
      // })  .addCase(updateOrderStatus.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateOrderStatus.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const updatedOrder = action.payload;
      //   const index = state.allOrders.findIndex((order) => order.id === updatedOrder.orderId);
      //   if (index !== -1) {
      //     state.allOrders[index].status = updatedOrder.newStatus;
      //   }
      // })
      // .addCase(updateOrderStatus.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || action.error.message;
      // });
  },
});
      
  


export const { setOrderDetails, clearOrderDetails ,} = orderSlice.actions;
export default orderSlice.reducer;
