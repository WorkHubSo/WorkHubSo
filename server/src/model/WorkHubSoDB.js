import mongoose from 'mongoose'
export async function WorkHubSoDB() {
    try {
        await mongoose.connect('mongodb+srv://miirshe:miirshe123@cluster.9rwb442.mongodb.net/WorkHubSo', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => { console.log('connected db saccessfully') })
            .catch((error) => {
                console.log('error connecting db', error);
            })
    } catch (error) {
        console.log('error', error.message);
    }
}