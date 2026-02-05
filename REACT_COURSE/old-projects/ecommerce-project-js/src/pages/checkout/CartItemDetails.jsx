import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export const CartItemDetails = ({ cartItem, loadCart }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleOnKeyDown = (event) => {
    switch (event.key) {
      case "Enter": {
        handleUpdateClick();
        return;
      }
      case "Escape": {
        setQuantity(cartItem.quantity);
        setIsUpdating(false);
        return;
      }
    }
  };

  const handleUpdateClick = async () => {
    if (!isUpdating) {
      setIsUpdating(!isUpdating);
      return;
    }

    await axios.put(`api/cart-items/${cartItem.productId}`, { quantity });
    await loadCart();
    setIsUpdating(false);
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      {" "}
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdating && (
              <input
                className="quantity-input"
                type="text"
                value={quantity}
                onChange={updateQuantity}
                onKeyDown={handleOnKeyDown}
              />
            )}
            {!isUpdating && (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdateClick}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};
