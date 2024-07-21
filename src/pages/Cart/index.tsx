import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart } from "../../cart/cartSlice";
import { RootState } from "../../store";
import { message } from "antd";

type Product = {
  id: string;
  price: number;
  name: string;
  images: string[];
  time: number;
};

type CartState = {
  products: Product[];
};

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart) as CartState;

  const initialQuantities = cart.products.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {} as Record<string, number>);

  const [quantities, setQuantities] =
    useState<Record<string, number>>(initialQuantities);

  const handleQuantityChange = (id: string, value: number) => {
    if (value == 10) {
      message.warning("You can't add more than 10 items");
    }
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const totalprice = cart.products.reduce((acc, item) => {
    acc += item.price * quantities[item.id];
    return acc;
  }, 0);

  // console.log(totalprice);

  return (
    <section>
      <div className="container">
        <h1 className="text-3xl text-center sm:text-left">Shopping Cart</h1>
        <hr className="my-4" />

        <div className="cards flex flex-col lg:flex-row justify-between">
          <div className="cart flex flex-col gap-5">
            {cart.products.length ? (
              cart.products.map((item) => (
                <div
                  className="cart-item sm:w-full lg:w-[700px] flex flex-col sm:flex-row justify-center sm:justify-between items-center"
                  key={item.id}
                >
                  <img
                    className="w-64 h-48  sm:w-[128px] sm:h-[128px] border-2 rounded-lg"
                    src={item.images[0]}
                    alt={item.name}
                  />
                  <div className="details w-[150px] text-left flex items-center justify-center flex-col">
                    <h3 className="text-2xl font-bold text-center mt-3 sm:mt-0 mb-5">
                      {item.name}
                    </h3>
                    <p className="text-xl w-full sm:text-sm text-center">
                      <span className="font-bold">Time:</span> {item.time}{" "}
                      minutes
                    </p>
                  </div>
                  <div className="amount text-center flex flex-col gap-3">
                    <p className="text-xl font-bold mt-3 sm:mt-o">Amount</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] - 1)
                        }
                        disabled={quantities[item.id] <= 1}
                      >
                        <span className="text-lg">-</span>
                      </button>

                      <input
                        type="number"
                        min={1}
                        max={10}
                        className="input input-bordered w-20 text-center border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                        value={quantities[item.id]}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />

                      <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] + 1)
                        }
                        disabled={quantities[item.id] >= 10}
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>

                    <a
                      className="cursor-pointer text-cyan-400"
                      onClick={() => dispatch(deleteToCart(item))}
                    >
                      Remove
                    </a>
                  </div>
                  <div className="price flex items-center justify-center">
                    <p className="text-2xl mt-2 sm-mt-0">
                      {Math.floor(quantities[item.id] * item.price)} $
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-2xl">Cart is empty 😥 !</p>
            )}
          </div>
          <div className="total flex flex-col items-center">
            <div className="total_price p-8 flex flex-col gap-5 b-radius-lg rounded-md h-[250px]">
              <div className="subtotal flex justify-between border-b-2 w-52">
                <p>Subtotal</p>
                <p>{Math.floor(totalprice)} $</p>
              </div>
              <div className="shipping flex justify-between border-b-2 w-52">
                <p>Shipping</p>
                <p>{Math.floor(totalprice * 0.005)} $</p>
              </div>
              <div className="tax flex justify-between border-b-2 w-52">
                <p>Tax</p>
                <p>{Math.floor(totalprice * 0.1)} $</p>
              </div>
              <div className="order-total flex justify-between w-52 mt-4">
                <p className="text-md">Order Total</p>
                <p>
                  {Math.floor(
                    totalprice + totalprice * 0.005 + totalprice * 0.1
                  )}{" "}
                  $
                </p>
              </div>
            </div>
            <button className="btn btn-primary w-52">Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
