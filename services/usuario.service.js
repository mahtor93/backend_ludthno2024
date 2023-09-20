const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class userService{
    constructor(){
        //cada vez que generemos una instancia del servicio se correrán estas funciones
        this.users = [];
        this.generate();
    }
    //Esto se borra posteriormente, también la importación de faker
    generate(){
        const limit = 100;
        for(let index =0;index<limit;index++){
            this.users.push({
                id:index+1,
                name:faker.person.firstName(),
                email:faker.internet.email(),
                image:faker.image.imageUrl(),
                isBlock:faker.datatype.boolean(),
            });
        }
    }  

    async create(data){
        const nuevoUsuario ={
            id:faker.datatype.uuid(),
            ...data
        }
        this.users.push(nuevoUsuario);
        return nuevoUsuario;
    }

    async find(){
            return this.users;
    }

    async findOne(id){
        const user = await this.users.find(user=>user.id == id);
            if(!user){
                throw boom.notFound('Usuario no encontrado');
            }
            if(user.isBlock){
                throw boom.conflict('Usuario bloqueado');
            }
        return user;
    }

    async update(id,cambios){
        const index = this.users.findIndex(item=>item.id ==id);
        if(index == -1){
            throw boom.notFound('Usuario No encontrado :(');
        }
        const persist = this.users[index];
        this.users[index] = { ...persist, ...cambios };
        return this.users[index];
    }

    async delete(id){
        const index = this.users.findIndex(item=>item.id ===id);
        if(index === -1){
            throw boom.notFound('Usuario No encontrado');
        }
        this.user.splice(id,1);
        return {message:true}
    }

}

module.exports = userService;