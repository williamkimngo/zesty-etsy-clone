import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEditCart } from "../../store/cart";
import { fetchGetCart } from "../../store/cart";
import { fetchDeleteCart } from "../../store/cart";
import './cart.css';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [quantity, setQuantity] = useState(Number(item?.quantity));
    let [revenue, setRevenue] = useState(Number(item?.quantity * item?.Product?.price))
    console.log(item, "ITEM???")
    const stock = item?.Product.quantity

    const options = [];
    for (let i = 1; i <= stock; i++) {
        options.push(i);
    }

    useEffect( () => {
        dispatch(fetchEditCart(item.id, quantity)).then(async () => {
            console.log("INHERE!?!??!?!?!?!?!?")
            console.log(quantity, "QUANTITY????????")
            const allItems = await dispatch(fetchGetCart());
            const cartDetails = allItems.Carts
            const editedItem = cartDetails.find(editItem => editItem.id === item.id);
            if(editedItem.quantity > stock) editedItem.quantity = stock
            setRevenue(Number(editedItem?.quantity) * Number(editedItem?.Product.price));
        });
    }, [quantity]);

    const deleteCartItem = async () => {
        if (window.confirm('Are you sure you want to delete this item?')){
        await dispatch(fetchDeleteCart(item.id))}
        await dispatch(fetchGetCart());
    }

    return (
        <>
        <div className="cart-item-container-div">
            <div className="cart-image-container" onClick={() => history.push(`/products/${item.Product.id}`)}>
                <img src={item?.Product?.previewImage} alt='product' />
            </div>
            <div className="right-partof-leftpart">
             <div className="cart-item-name" onClick={() => history.push(`/products/${item.Product.id}`)}>{item?.Product?.name}</div>
              <div className="other-people-message">
                 {item?.quantity == stock && <div>You have reached the maximum stock for this product.</div>}
              </div>
              <button className='cart-item-remove-item-button' onClick={() => deleteCartItem()}> Remove</button>
            </div>
            <div className="cart-product-name-remove">

                <div className="cart-item-quantity-select">
                    <select className="cart-quantity-options" value={quantity} onChange={e => setQuantity(e.target.value)}>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                 </div>
            <div className="quantity-price-box">
                <div className="item-total-container">
                    <p>$ {revenue.toFixed(2)}</p>
                    x{quantity}
                    <p>(${item?.Product?.price.toFixed(2)} each)</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default CartItem
