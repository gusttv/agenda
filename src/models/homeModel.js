import { Schema, model } from 'mongoose';

const HomeSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const HomeModel = model('Home', HomeSchema);

class Home {

}

export default Home;