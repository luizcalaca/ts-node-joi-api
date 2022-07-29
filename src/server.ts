import app from './app';
import 'express-async-errors';

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});