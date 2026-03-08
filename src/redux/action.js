// إضافة منتج إلى السلة
const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

// حذف منتج من السلة
const removeFromCart = (productId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: productId,
  };
};

// تحديث الكمية في السلة
const updateQuantity = (id, quantity) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: { id, quantity },
  };
};



export { addToCart, removeFromCart, updateQuantity };
