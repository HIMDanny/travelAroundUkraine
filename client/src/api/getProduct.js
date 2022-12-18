import axiosConfig from '../axiosConfig';

const getProduct = async (tourId) => {
  try {
    const { data, status } = await axiosConfig(`/products/${tourId}`);

    if (status === 200) {
      return data;
    }
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export default getProduct;
