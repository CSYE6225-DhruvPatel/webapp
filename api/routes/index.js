import healthzRoutes from './healthz-routes.js';
import userRoutes from './user-routes.js';
import emailVerificationRoutes from './verify-email-routes.js';

export const routes = (app) => {
    app.use('/healthz', healthzRoutes);

    app.use('/v1/user', userRoutes);

    app.use('/verify-email', emailVerificationRoutes);

    app.use((req, res) => {
        console.log('Wrong path - status 404.')
        res.status(404).send();
    });
}