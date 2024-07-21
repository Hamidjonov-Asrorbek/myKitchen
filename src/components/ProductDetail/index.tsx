import { Link } from "react-router-dom";
import { Product } from "../types";
import { addToCart } from "../../cart/cartSlice";
import { useDispatch } from "react-redux";

type ProductDetailProps = {
  data: Product;
};

export default function ProductDetail({ data }: ProductDetailProps) {
  const dispatch = useDispatch();
  const handleAddToCart = (data: Product) => {
    dispatch(addToCart(data));
  };
  // console.log(data);
  return (
    <>
      <section className="pb-16 pt-4">
        <div className="container">
          <h1 className="text-2xl mb-5">Recipe Elements</h1>
          {/* Images */}
          <div className="images grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 items-center justify-center mb-5">
            {data.images.map((image, index) => (
              <img
                className="w-72 h-40 rounded-lg"
                key={index}
                src={image}
                alt={`image-${index}`}
              />
            ))}
          </div>
          <div className="content relative">
            {/* Name */}
            <h2 className="text-xl mb-4">{data.name}</h2>
            {/* Ingredients */}
            <div className="flex flex-col items-start mb-4 gap-4 sm:flex-row sm:items-center">
              <p className="text-lg font-semibold">Ingredients:</p>
              <div className="flex gap-2 flex-col sm:flex-row">
                {data.ingredients.map((ingredient, index) => (
                  <p className="badge badge-secondary" key={index}>
                    {ingredient}
                  </p>
                ))}
              </div>
            </div>
            {/* Time */}
            <div className="flex items-center mb-4 gap-4">
              <p className="text-lg font-semibold">Cooking Time:</p>
              <p className="text-lg">{data.time} minutes</p>
            </div>
            {/* Price */}
            <div className="flex items-center mb-4 gap-4">
              <p className="text-lg font-semibold">Price:</p>
              <p className="text-lg">${data.price}</p>
            </div>
            {/* Description */}
            <div className="mb-4 gap-4">
              <p className="text-2xl mb-3">Method</p>
              <p className="text-lg">{data.description}</p>
            </div>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleAddToCart(data)}
            >
              Add Cart
            </button>
            {/* Back */}
            <button className="btn btn-primary flex justify-end absolute right-0">
              <Link to="/">Back</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
