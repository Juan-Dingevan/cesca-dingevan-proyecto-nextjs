import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "./types"

// https://github.com/ljaviertovar/shopping-cart-nextjs-zustand/blob/main/src/stores/useCartStore.ts

interface CartProduct {
    quantity: number;
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    vegan: boolean;
    gluten_free: boolean;
    date_added: Date;
    img_link: string;
}

interface State {
	cart: CartProduct[]
	totalItems: number
	totalPrice: number
}

interface Actions {
	addToCart: (Item: CartProduct) => void
	removeFromCart: (Item: CartProduct) => void
}

const INITIAL_STATE: State = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
}

export const useCartStore = create(
	persist<State & Actions>(
		(set, get) => ({
			cart: INITIAL_STATE.cart,
			totalItems: INITIAL_STATE.totalItems,
			totalPrice: INITIAL_STATE.totalPrice,
			
            addToCart: (product: CartProduct) => {
				const cart = get().cart
				const cartItem = cart.find(item => item.id === product.id)

				if (cartItem) {
					const updatedCart = cart.map(item =>
						item.id === product.id ? { ...item, quantity: (item.quantity as unknown as number) + 1 } : item
					)
					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: 1 }]

					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				}
			},
			removeFromCart: (product: CartProduct) => {
				set(state => ({
					cart: state.cart.filter(item => item.id !== product.id),
					totalItems: state.totalItems - 1,
					totalPrice: state.totalPrice - product.price,
				}))
			},
		}),
		{
			name: "cart-storage",
		}
	)
)