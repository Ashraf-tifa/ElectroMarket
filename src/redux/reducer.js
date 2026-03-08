const initialState = {
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // Ajouter dans le panier
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        // ila kan l produit f l panier makanzidohch
        return state;
      }

      // ila makanch le produit f l panier kanzidoh
      return {
        ...state, cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };

    // Suppremer dans le panier   
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    //  kanbedlo l Quantité dyal produit fl panier
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1) {
        return state; // ila kant 9el mn whd makan9blohach
      }

      return {
        ...state, cart: state.cart.map((item) => item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default rootReducer;
