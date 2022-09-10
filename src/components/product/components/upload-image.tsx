import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo } from "react";
import { toBase64 } from "utils/toBase64";

interface Props {
  setBase64Files: Dispatch<SetStateAction<string[]>>;
  base64Files: string[];
}
export const UploadImage: FC<Props> = ({ setBase64Files, base64Files }) => {
  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    const base64 = await toBase64(file);
    setBase64Files((prev) => [...prev, base64]);
  };

  const onRemoveImg = (base64: string) => () => {
    setBase64Files((prev) => prev.filter((element) => element !== base64));
  };

  const renderImgCard = useMemo(() => {
    if (base64Files.length) {
      return base64Files.map((base64Url) => (
        <div className="relative" key={base64Url}>
          <img className="h-32 w-32 rounded" src={base64Url} />
          <span
            onClick={onRemoveImg(base64Url)}
            className="cursor-pointer absolute top-1 left-1 text-white bg-red-400 px-1 rounded">
            &times;
          </span>
        </div>
      ));
    }
    return <span>Вы пока ничего не загрузили</span>;
  }, [base64Files]);

  return (
    <div className="mt-10 flex flex-col">
      <div>
        <label
          htmlFor="input-file"
          className="cursor-pointer rounded bg-emerald-400 p-2 text-white font-bold">
          Загрузить медию
        </label>
        <input
          id="input-file"
          onChange={uploadHandler}
          className="hidden"
          type="file"
          multiple
        />
      </div>
      <div className="mt-5 flex items-center space-x-5">{renderImgCard}</div>
    </div>
  );
};
