import React, { useEffect, useRef, useState, FormEvent } from "react";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Define types using `type` keyword
type ProductData = {
  name: string;
  time: number;
  price: number;
  description: string;
  images: string[];
  ingredients: string[];
};

type Errors = {
  name?: string;
  price?: string;
  description?: string;
  images?: string;
  ingredients?: string;
  time?: string; // Added time to the Errors type
};

interface ProductAddProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductAdd({ setRefresh }: ProductAddProps) {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    time: 0,
    price: 0,
    description: "",
    images: [],
    ingredients: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    setProductData((prev) => ({ ...prev, images }));
  }, [images]);

  useEffect(() => {
    setProductData((prev) => ({ ...prev, ingredients }));
  }, [ingredients]);

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!productData.name) errors.name = "Product name is required";
    if (!productData.price || productData.price <= 0)
      errors.price = "Product price must be a positive number";
    if (!productData.description)
      errors.description = "Product description is required";
    if (!productData.time) errors.time = "Cooking time is required"; // Added time validation
    if (productData.images.length === 0)
      errors.images = "At least one image is required";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
      });

      navigate("/");
      setProductData({
        name: "",
        price: 0,
        time: 0,
        description: "",
        images: [],
        ingredients: [],
      });
      setImages([]);
      setIngredients([]);
      setErrors({});
      setShowPreview(false);
      console.log("Document written with ID: ", docRef.id);
      setRefresh(true); // Optionally trigger refresh if needed
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <h3 className="font-bold text-2xl text-center">Add New Recipe!</h3>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        {/* Title */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            type="text"
            placeholder="Enter your meal name"
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </label>

        {/* Cooking time */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Cooking time:</span>
          </div>
          <input
            value={productData.time}
            onChange={(e) =>
              setProductData({
                ...productData,
                time: parseFloat(e.target.value),
              })
            }
            type="number"
            placeholder="Enter preparation time of your meal"
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.time && <span className="text-red-500">{errors.time}</span>}
        </label>

        {/* Ingredients */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Ingredients:</span>
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter ingredients of meal"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (inputRef.current && inputRef.current.value) {
                  setIngredients([...ingredients, inputRef.current.value]);
                  inputRef.current.value = "";
                }
              }}
            >
              Add
            </button>
          </div>
          {errors.ingredients && (
            <span className="text-red-500">{errors.ingredients}</span>
          )}
          <p className="mt-2">
            Ingredients :{" "}
            {ingredients.length ? (
              ingredients.map((ingredient, ind) => (
                <span key={ind} className="badge badge-primary">
                  {ingredient}
                </span>
              ))
            ) : (
              <span className="badge badge-primary">! No ingredients yet</span>
            )}
          </p>
        </label>

        {/* Images */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Image URL:</span>
          </div>
          <div className="flex gap-1">
            <input
              type="url"
              ref={imagesRef}
              placeholder="Enter image URL"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (imagesRef.current && imagesRef.current.value) {
                  setImages([...images, imagesRef.current.value]);
                  imagesRef.current.value = "";
                }
              }}
            >
              Add
            </button>
          </div>
          {errors.images && (
            <span className="text-red-500">{errors.images}</span>
          )}
          <div className="flex mt-2 gap-2">
            <p className="mt-2">Images : </p>
            <div className="grid grid-cols-2 gap-2">
              {images.length ? (
                images.map((img, ind) => (
                  <img src={img} key={ind} alt="img" width={100} height={100} />
                ))
              ) : (
                <span className="badge badge-primary">! No images yet</span>
              )}{" "}
            </div>
          </div>
        </label>

        {/* Price */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price:</span>
          </div>
          <input
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: +e.target.value })
            }
            type="number"
            placeholder="Enter price of meal"
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </label>

        {/* Product description */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Method</span>
          </div>
          <textarea
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            placeholder="Enter method of meal"
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </label>

        {/* BUTTON */}
        <div className="flex flex-col w-full max-w-xs sm:flex-row sm:gap-2 items-center sm:items-start justify-between">
          <button
            type="submit"
            className="btn mt-5 w-full sm:w-auto sm:flex-grow max-w-xs btn-primary"
          >
            Apply
          </button>
          <button
            type="button"
            className="btn mt-5 w-full sm:w-auto sm:flex-grow max-w-xs btn-error"
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <dialog open className="modal overflow-hidden backdrop-blur-lg">
          <div className="modal-box flex flex-col gap-2">
            <h1 className="text-center">Recipe elements :</h1>
            <h2>Title: {productData.name}</h2>
            <p>Cooking time: {productData.time} min</p>
            <p>
              Ingredients:{" "}
              {productData.ingredients.map((ingredient, ind) => (
                <span key={ind} className="badge badge-primary mr-1">
                  {ingredient}
                </span>
              ))}
            </p>
            <p>Images:</p>
            <div className="flex gap-1">
              {productData.images.map((img, ind) => (
                <img src={img} key={ind} alt="img" width={100} height={100} />
              ))}
            </div>
            <p>Price: {productData.price} $</p>
            <p>Method: {productData.description}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowPreview(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default ProductAdd;
