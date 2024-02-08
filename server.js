import app from './api/app.js';
import { bootstrapdb } from './api/dao/sequelize.js';

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    await bootstrapdb();
    console.log(`Server listening on port ${port}`);
});