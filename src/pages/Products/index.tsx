import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData } from "../../products/productsSlice";
import useGetData from "../../hooks";
import { ErrorStatus, Product, RootState } from "../../components/types";
import { Link } from "react-router-dom";

function Products() {
  // const [search, setSearch] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.products);

  // Specify collectionName here
  const { data, isPending, error, deleteProduct } = useGetData(
    "products",
    refresh
  );

  useEffect(() => {
    if (data) {
      dispatch(getData(data as []));
    }
  }, [data, dispatch]);

  // useEffect(() => {
  //   dispatch(searchData(search));
  // }, [search, dispatch]);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setRefresh((prev) => !prev);
    dispatch(deleteData({ id }));
  };

  return (
    <section>
      <div className="container">
        <div className="title sm:flex flex-col justify-between items-start pb-4 border-b-2">
          <h2 className="text-2xl mb-4 sm:mb-0">Recipes</h2>
          {/* <label className="input input-bordered flex items-center gap-2">
            <input 
              type="text"
              className="grow w-fit"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label> */}
        </div>
        <div className="pt-0">
          {isPending && (
            <div className="mt-10 mb-10 flex items-center justify-center">
              <span
                style={{ zoom: "5" }}
                className="loading loading-spinner text-warning"
              ></span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center">
              <span className="text-error">
                {(error as ErrorStatus).message}
              </span>
            </div>
          )}
          {!isPending && state?.data?.length > 0 && (
            <div className="grid items-center justify-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-5">
              {state.data.map((item: Product) => {
                const { id, name, images, time, description } = item;
                return (
                  <Link to={`/details/${id}`} key={id}>
                    <div className="card card-compact text-center w-[300px] bg-base-100 shadow-sm shadow-white border border-white dark:shadow-black">
                      <div className="card-body box-border relative">
                        <h2 className="card-title">{name}</h2>
                        <p className="text-sm w-full text-left h-20 overflow-hidden">
                          {description}
                        </p>
                        <div className="flex justify-end items-end gap-2">
                          <p className="badge badge-primary text-sm w-fit p-2 m-0">
                            I NEW
                          </p>
                          <p className="badge badge-secondary w-fit p-0 m-0">
                            {time} minutes
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(id)}
                          className="p-2 text-red-600 absolute top-0 right-0 hover:text-red-800 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <figure className="bg-slate-100">
                        <img
                          className="w-full h-[170px] object-cover"
                          src={typeof images[0] === "string" ? images[0] : ""}
                          alt={typeof name === "string" ? name : ""}
                          loading="lazy"
                          width={300}
                          height={170}
                        />
                      </figure>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
