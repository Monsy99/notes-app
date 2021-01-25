import axios from "axios";

const apiAdress = "http://localhost:3000/api";

const getNotes = async () => {
  const data = await axios.get(`${apiAdress}/notes`).then((response) => {
    const responseInfo = response.data;
    return responseInfo.data;
  });
  return data;
};
const getDeletedNotes = async () => {
  const data = await axios.get(`${apiAdress}/deleted`).then((response) => {
    const responseInfo = response.data;
    return responseInfo.data;
  });
  return data;
};
const getNote = async ({ id }) => {
  const data = await axios.get(`${apiAdress}/note/${id}`).then((response) => {
    const responseInfo = response.data;
    return responseInfo.data;
  });
  return data;
};
const getAnyNote = async ({ id }) => {
  const data = await axios
    .get(`${apiAdress}/history/${id}`)
    .then((response) => {
      const responseInfo = response.data;
      return responseInfo.data;
    });
  return data;
};
const deleteNote = async ({ id }) => {
  const response = axios.delete(`${apiAdress}/note/${id}`).then((response) => {
    console.log(response.data.success);
    const responseInfo = response.data;
    return responseInfo;
  });
  return response;
};
const updateNote = async ({ note, id }) => {
  const response = await axios
    .put(`${apiAdress}/note/${id}`, note)
    .then((response) => {
      console.log(response.data.success);
      const responseInfo = response.data;
      return responseInfo;
    });
  return response;
};
const createNote = async (payload) => {
  const response = axios.post(`${apiAdress}/note`, payload).then((response) => {
    console.log(response.data.success);
    const responseInfo = response.data;
    return responseInfo;
  });
  return response;
};

export {
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  createNote,
  getDeletedNotes,
  getAnyNote,
};
