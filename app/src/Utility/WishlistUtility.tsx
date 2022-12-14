import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../models/Product";
import WishlistView from "../renderers/views/Wishlist";

interface WishlistContext {
    wishlistItems: string[], 
    wishlistQuanitity: number, 
    toggleItem: (product: Product) => void,
    isWishlisted: (product: Product) => boolean
}

const Context = createContext<WishlistContext | null>(null);

export const useWishlist = () =>
    useContext(Context);

type Param = {
    children: ReactNode
}
    
export const WishlistProvider: React.FC<Param> = ({ children }) => {

    const [wishlistItems, setWishlistItems] = useState<string[]>([]);

    const wishlistQuanitity = wishlistItems?.length ?? 0;
    const isWishlisted = (product: Product): boolean => wishlistItems?.find(_id => _id === product?._id) != null;

    const toggleItem = (product: Product) => {

        let items:string[] = [...wishlistItems];

        var index = items.indexOf(product._id);

        if (index === -1) {
            items.push(product._id);
        } else {
            items.splice(index, 1);
        }
        
        setWishlistItems(items);

    }

    return (
        <Context.Provider value={{ wishlistItems, wishlistQuanitity, toggleItem, isWishlisted }}>
            {children}
            <WishlistView/>
        </Context.Provider>
    )
    
}

