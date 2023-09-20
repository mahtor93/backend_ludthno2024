const { faker } = require('@faker-js/faker');
const { boom } = require('@hapi/boom');
class misionService{

    constructor(){
        this.mision = [];
        this.generate();
    }

    //Esto se borra posteriormente, también la importación de faker
    generate(){
        const limit = 10;
        for(let index =0;index<limit;index++){
            this.mision.push({
                id:index+1,
                id_usr:faker.datatype.uuid(),
                name:faker.person.firstName(),
                image:faker.image.imageUrl(),
            });
        }
    } 

    async create(data){

            const nuevaMision ={
                id:faker.datatype.uuid(),
                ...data
            }
            this.mision.push(nuevaMision);
            return nuevaMision;

    }

    async find(){

            return this.mision;

    }

    async findOne(id){

            const mision = this.mision.find(mision=>mision.id == id);
            if(!mision){
                throw boom.notFound('Mision no encontrada');
            }
            return mision;
    }

    async update(id, cambios){

            const index = this.mision.findIndex(item=>item.id ===id);
            if(index === -1){
                throw boom.notFound('Mision no encontrada');
            }
            this.mision[index] = cambios;
            return this.mision[index];

    }

    async delete(id){

            const index = this.mision.findIndex(item=>item.id ===id);
            if(index === -1){
                throw boom.notFound('Mision no encontrada');
            }
            this.mision.splice(id,1);
            return {message:true}

    }

}

module.exports = misionService;