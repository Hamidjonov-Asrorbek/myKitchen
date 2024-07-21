import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// Define types
type Product = {
  id: string;
  [key: string]: any;
};

type ErrorState = {
  status: boolean;
  message: string;
};

function useGetData(collectionName: string, refresh: any) {
  const [data, setData] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState>({
    status: false,
    message: "",
  });

  useEffect(() => {
    const getData = async () => {
      const documents: Product[] = [];
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id } as Product);
        });
        setData(documents);
      } catch (error: any) {
        setError({ status: true, message: error.message });
      } finally {
        setIsPending(false);
      }
    };
    getData();
  }, [collectionName, refresh]);

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData((prevData) => prevData.filter((product) => product.id !== id));
    } catch (error: any) {
      setError({ status: true, message: error.message });
    }
  };

  return { data, isPending, error, deleteProduct };
}

export default useGetData;
