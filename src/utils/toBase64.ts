export const toBase64 = (file: File | undefined) =>
  new Promise<string>((resolve, reject) => {
    if (!file) return reject("file is undefined");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
