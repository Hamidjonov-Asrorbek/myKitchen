import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import ProductDetail from "../../components/ProductDetail";
import { Product } from "../../components/types";
import loader from "../../assets/loader.gif";

type Params = {
  id: string;
};

export default function Details() {
  const { id } = useParams<Params>();
  const [data, setData] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No such document!");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as Product);
        } else {
          console.log("No such document!");
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Error fetching document");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className=" container flex justify-center items-center">
        <img src={loader} alt="loader" />
      </div>
    );
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section>
      <div className="container">
        <ProductDetail data={data} />
      </div>
    </section>
  );
}
