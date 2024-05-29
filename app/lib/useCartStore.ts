import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartProduct, Product } from "./types"

interface State {
	cart: CartProduct[]
	totalItems: number
	totalPrice: number
}

interface Actions {
	addToCart: (Item: CartProduct) => void
	removeFromCart: (Item: CartProduct) => void
	updateProduct: (Item: CartProduct) => void
}

const INITIAL_STATE: State = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
}

// does using these functions instead of a numeric formula
// tailored to adding / updating / deleting an item add 
// needless iteration? Yes. Is it also way cleaner? Yes.

function addTotalItems(cart: CartProduct[]): number {
    return cart.reduce((total, product) => total + product.quantity, 0);
}

function addTotalPrice(cart: CartProduct[]): number {
    return cart.reduce((total, product) => total + (product.quantity * product.price), 0);
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
						item.id === product.id ? { ...item, quantity: (item.quantity as unknown as number) + product.quantity } : item
					)
					set(state => ({
						cart: updatedCart,
						totalItems: addTotalItems(updatedCart),
						totalPrice: addTotalPrice(updatedCart)
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: product.quantity }]

					set(state => ({
						cart: updatedCart,
						totalItems: addTotalItems(updatedCart),
						totalPrice: addTotalPrice(updatedCart),
					}))
				}
			},

			updateProduct: (product: CartProduct) => {
				const cart = get().cart
				const cartItem = cart.find(item => item.id === product.id)

				if(cartItem) {
					const updatedCart = cart.map(item =>
						item.id === product.id ? { ...item, quantity: product.quantity } : item
					)

					set(state => ({
						cart: updatedCart,
						totalItems: addTotalItems(updatedCart),
						totalPrice: addTotalPrice(updatedCart),
					}))
				}
				
				//No else: if the item isn't in the cart, there's nothing
				//to update and we simply ignore the call.
			},

			removeFromCart: (product: CartProduct) => {
				const cart = get().cart
				const updatedCart = cart.filter(item => item.id !== product.id)
				
				set(state => ({
					cart: updatedCart,
					totalItems: addTotalItems(updatedCart),
					totalPrice: addTotalPrice(updatedCart),
				}))
			},
		}),
		{
			name: "cart-storage",
		}
	)
)