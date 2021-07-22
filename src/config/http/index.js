import axios from "axios";

const POST = async (url, data) => {
  const head = {
    headers: {},
  };
  const res = await axios.post(url, data, head);

  return res;
};

const PUT = async (url, data) => {
  const head = {
    headers: {},
  };
  const res = await axios.put(url, data, head);

  return res;
};

const DELETE = async (url, data) => {
  const head = {
    headers: {},
  };
  const res = await axios.delete(url, {
    ...data,
    ...head,
  });

  return res;
};

const GET = async (url) => {
  const head = {
    headers: {},
  };
  const res = await axios.get(url, head);

  return res;
};

const HTTP_Methods = {
  POST,
  GET,
  PUT,
  DELETE,
}

export default HTTP_Methods;
