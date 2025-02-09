"use server"

import { IProduct } from "@/types";
import axios from "axios";

export async function getAllProducts() {
    try {
        const res = await axios.get("https://fakestoreapi.com/products")
        const products = res.data
        return products as IProduct[];

    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch products');
    }
}