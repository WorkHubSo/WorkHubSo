import mongoose from 'mongoose'
export async function WorkHubSoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/WorkHubSo', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => {
                 console.log('Connected db saccessfully') })
            .catch((error) => {
                console.log('error connecting db', error);
            })
    } catch (error) {
        console.log('error', error.message);
    }
}