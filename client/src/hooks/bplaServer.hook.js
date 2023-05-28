import { useRef, useState } from "react";
import http from "../axios.common";
import { useAuth } from "./auth.hook";

export default function useBplaServer() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const formData = useRef(new FormData());

  function createBpla(onUploadProgress) {
    setIsLoading(true);
    return http
      .post("/upload", formData.current, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth.token,
        },
        onUploadProgress,
      })
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        throw Error("Помилка при додаванні даних. Можливо такі вже є");
      });
  }

  function getBplas(query = "") {
    setIsLoading(true);
    return http.get("/bpla" + query).then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  function getBplaId(id) {
    setIsLoading(true);
    return http.get("/bpla/" + id).then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  function deleteBplaById(id) {
    setIsLoading(true);
    return http
      .delete("/bpla/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => "Не вдалося видалити БПЛА. Спробуй пізніше.")
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateBplaById(id, updatedData) {
    setIsLoading(true);
    return http
      .put("/bpla/" + id, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        throw Error("Помилка при оновленні БПЛА. Спробуйте пізніше.");
      });
  }

  return {
    formData,
    createBpla,
    getBplas,
    getBplaId,
    deleteBplaById,
    updateBplaById,
    isLoading,
  };
}
