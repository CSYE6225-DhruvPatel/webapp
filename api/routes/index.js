import healthzRoutes from './healthz-routes.js';

export const routes = (app) => {
    app.use('/healthz', healthzRoutes);

    app.use((req, res) => {
        console.log('Wrong path - status 404.')
        res.status(404).send();
    });
}