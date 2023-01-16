import React from 'react';
import { useState, createContext } from "react";

export const OrderListContext = createContext({});

export const OrderListProvider = props =>{
    const { children } = props;
    const [orderList, setOrderList] = useState({orders:[]});
    return(
        <OrderListContext.Provider value={{ orderList, setOrderList }}>
            {children}
        </OrderListContext.Provider>
    );
}