
// const handlers = {
// para poder usar la inyeccion de dependencias cambiamos a una funcion  
// se tiene que envolver en un parentesis despues de => porque si no lo toma como una funcion
const handlers = ({ axios }) => ({
  get: async (req, res) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).send(data)
  },

  post: async (req, res) => {
    const { body } = req;
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', body);
    res.status(201).send(data);
  },

  put: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      console.log(url);
      const { data } = await axios.put(url, body);
    } catch (e) {
      console.log(e);
    }
    res.sendStatus(204);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  },
});

module.exports = handlers;