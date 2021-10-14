const handlers = require('./index');

/*
En esta clase lo que haremos será testear el archivo que nosotros creamos que se encuentra dentro de
users points Index puntos JS Que es el que contiene nuestros canales.
Lo que nosotros vamos a hacer es de que vamos a importar los canales que se encuentran aquí que los
estamos exportando vía módulo punto export.
Vamos a inyectar un Mock de accesos y finalmente vamos a llamar al método de gheto.
Entonces dentro de esta misma clase nosotros vamos a ver lo que son los Mox y también vamos a construir
un par de espías tanto para status y también para sentada.

Entonces para eso vamos a crear un nuevo archivo índex puntos.

https://www.udemy.com/course/tdd-en-nodejs-guia-de-tests-con-jest/learn/lecture/12871440
*/

describe('#Endpoints', () => {
  describe('users', () => {
    describe('get', () => {
      it('return to user json', async () => {
        /* 
          crear un mock de axios, y le adicionamos el metodo get, que es el que se usa en handlers
          al metodo de get le estamos asignando que devuelva una promesa
          y le decimos que devuelva un objeto que tenga un campo data con valor de 1
          en este ejemplo el valor que me va a devolver el metodo get no es tan relevante, ya que se responde al
          usuario, lo que si es relevante es que es un objeto que tiene la propiedad de data, le ponemos un valor de 1
          lo que nos aseguramos es que send se llamo con el valor de 1
        */
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 })
        }


        /*
          usamos el handler enviandole la inyeccion de dependencias, y de handler
          usamos el metodo get, que este recibe dos parametros, req y res, en este ejemplo
          el parametro req no es necesario ya que no se usa, entonces se envia {}
          el parametro res si se usa, de este se estan usando 2 metodo, el status y el send
          estos se tiene que mockear, en las lineas anteriores se observa como se crea res

         construir mock de objeto response
         este objeto necesita tener un metodo estatus y un metodo send, ya que esto se usa 
         en el handler.
         cuando mockeamos el metodo status tenemos que asegurarnos de que va a retornar res, entonces
         se usa mockReturnThis para retornar el mismo objeto que se esta mandando
         send va ser un fn, lo unico que nos interesa es poder espiarlo, no necestiamos obtener nada
       */
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }
        await handlers({ axios }).get({}, res);

        /*
          cosas que nos interesan status se debe llamar con 200 y send se tiene que llamar con 1
          res almacena estos resultados.
          para obtener esto valores se usa el metodo o propiedad que se creo y luego .mock.calls, esto devuelve
          un array que cada uno de sus valores son los argumentos con la cual la funcion se llamo
          res.status.mock.calls
        */

        // console.log(res.status.mock.calls); // out [[200]]

        /* 
          la funcion handler retorna 200, y el y body, en este ejemplo
          cuando se defdinio el mock de axios.get get: jest.fn().mockResolvedValue({ data: 1 })
        */
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);

        /*
         cosas que nos interesan, es que status se tiene que haber llamado con 200 y send con 1
        */

        // console.log(axios.get);
        // out
        // [Function: mockConstructor] {
        //   _isMockFunction: true,
        //   getMockImplementation: [Function (anonymous)],
        //   mock: [Getter/Setter],
        //   mockClear: [Function (anonymous)],
        //   mockReset: [Function (anonymous)],
        //   mockRestore: [Function (anonymous)],
        //   mockReturnValueOnce: [Function (anonymous)],
        //   mockResolvedValueOnce: [Function (anonymous)],
        //   mockRejectedValueOnce: [Function (anonymous)],
        //   mockReturnValue: [Function (anonymous)],
        //   mockResolvedValue: [Function (anonymous)],
        //   mockRejectedValue: [Function (anonymous)],
        //   mockImplementationOnce: [Function (anonymous)],
        //   mockImplementation: [Function (anonymous)],
        //   mockReturnThis: [Function (anonymous)],
        //   mockName: [Function (anonymous)],
        //   getMockName: [Function (anonymous)]
        // }
      })

    });
    describe('post', () => {
      it('insert user json', async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 })
        }

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }

        const req = {
          body: 'request body'
        }

        await handlers({ axios }).post(req, res);

        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);

        /** 
         * en la funcion post, se tiene const:
         *   { data } = await axios.post('https://jsonplaceholder.typicode.com/users', body);
         * a post se le estan enviando dos parametros, estos quedan almacenados en mock.calls en un array en el orden que se envian
         */
        expect(axios.post.mock.calls).toEqual([[
          'https://jsonplaceholder.typicode.com/users',
          'request body'
        ]]);
      })
    });
  });
});