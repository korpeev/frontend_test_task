import { Button } from "components/ui/Button";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { UploadImage } from "./components/upload-image";
import { CitiesPrice } from "components/product/components/CitiesPrice/CitiesPrice";
import { Product as ProductModel } from "common/entity.types";
import { productService } from "services/product.service";
import { useAlertContext, useProductContext } from "hooks/context";
import { AlertPosition, AlertVariant } from "common/other.types";
import { useNavigate, useParams } from "react-router-dom";

export const Product = ({ isEdit }: { isEdit: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addProduct, editProduct, cities, setCities } = useProductContext();
  const { openAlert } = useAlertContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const [isActive, setActive] = useState("active");
  const [values, setValues] = useState({
    title: "",
    onePriceAllCities: true,
    price: "" as string | null,
  });
  const onChangeActive = (event: ChangeEvent<HTMLSelectElement>) => {
    setActive(event.target.value as "active" | "inactive");
  };
  const onChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, validity } = event.target;
    if (name === "price" && !validity.valid) return;
    setValues((prev) => ({
      ...prev,
      [name]: name === "onePriceAllCities" ? checked : value,
    }));
  };
  const removeZeroValuesInputs =
    (type: "focus" | "blur") => (event: FocusEvent<HTMLInputElement>) => {
      if (type === "focus") {
        setValues((prev) => {
          if (event.target.value.length === 1 && +event.target.value === 0) {
            return { ...prev, price: "" };
          }
          return prev;
        });
      }
      if (type === "blur") {
        setValues((prev) => {
          if (event.target.value === "") {
            return { ...prev, price: "0" };
          }
          return prev;
        });
      }
    };
  useEffect(() => {
    if (isEdit) {
      productService.getOne(Number(id)).then(([product]) => {
        setActive(product.isActive);
        setCities(Array.isArray(product.price) ? product.price : cities);
        setBase64Files(product.media);
        setValues({
          title: product.title,
          price: typeof product.price === "number" ? `${product.price}` : null,
          onePriceAllCities: product.onePriceAllCities,
        });
        const blocksFromHTML = convertFromHTML(product.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
      });
    }
    return () => {
      setCities((prev) => prev.map((city) => ({ ...city, price: 0 })));
    };
  }, [isEdit]);
  const onAddSubmit = () => {
    const description = stateToHTML(editorState.getCurrentContent());
    const priceByCitiesIsValid = cities.some(({ price }) => price > 0);
    const isPriceValid = values.onePriceAllCities
      ? Number(values.price) > 0
      : priceByCitiesIsValid;
    const isDescriptionValid = description.length > 0;
    const mediaIsValid = base64Files.length > 0;
    const isNotValid = [isDescriptionValid, mediaIsValid, isPriceValid].some(
      (value) => !value
    );
    if (isNotValid) {
      openAlert({
        isOpen: true,
        interval: 1000,
        variant: AlertVariant.Danger,
        position: AlertPosition.Top,
        message: "Ошибка валидаций заполните форму",
      });
      return;
    }
    const { title, price, onePriceAllCities } = values;
    const data: Omit<ProductModel, "id"> = {
      title,
      price: onePriceAllCities ? Number(price) : cities,
      description,
      media: base64Files,
      isActive,
      onePriceAllCities,
    };
    if (isEdit) {
      editProduct(Number(id), data);
      navigate("/products");
    } else {
      addProduct(data);
      navigate("/products");
    }
  };
  return (
    <div className="w-1/2 rounded shadow-md p-5 ">
      <div className="flex space-x-3">
        <Button onClick={() => navigate("/products")}>Назад</Button>
        <h1 className="text-2xl font-bold">
          {isEdit ? "Изменить" : "Добавить"} товар
        </h1>
      </div>
      <div className="h-[1px] mt-5 w-full bg-gray-400" />
      <div className="flex flex-col mt-5">
        <div className="flex space-x-2">
          <div className="flex flex-col flex-1 justify-center">
            <label>Название товара</label>
            <input
              value={values.title}
              onChange={onChangeValues}
              name={"title"}
              className={"border rounded p-2 "}
            />
          </div>
          <select
            onChange={onChangeActive}
            value={isActive}
            className="min-w-[200px]">
            <option value={"active"}>Активный</option>
            <option value={"inactive"}>Неактивный</option>
          </select>
        </div>
        <div className="mt-5">
          <span>Описание</span>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorStyle={{
              height: "200px",
              border: "2px solid gray",
              borderRadius: "5px",
              padding: "10px",
            }}
          />
        </div>
        <UploadImage
          setBase64Files={setBase64Files}
          base64Files={base64Files}
        />
        <div className="mt-10 max-w-[600px]">
          <h1 className="text-xl font-bold">Цена</h1>
          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                id="input-price"
                type="checkbox"
                name="onePriceAllCities"
                checked={values.onePriceAllCities}
                onChange={onChangeValues}
              />
              <label className="cursor-pointer" htmlFor="input-price">
                Одна цена для городов
              </label>
            </div>
            {values.onePriceAllCities && (
              <input
                value={values.price as string}
                onChange={onChangeValues}
                name="price"
                onFocus={removeZeroValuesInputs("focus")}
                onBlur={removeZeroValuesInputs("blur")}
                className="border-2"
                pattern="[0-9]*"
                type="text"
              />
            )}
          </div>
        </div>
        {!values.onePriceAllCities && <CitiesPrice />}
        <div className="flex items-center justify-between mt-5">
          <Button onClick={() => navigate("/products")} className="bg-red-400">
            Отмена
          </Button>
          <Button onClick={onAddSubmit}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};
