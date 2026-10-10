

const adminMiddleware = (request, response, next) => {
    
    const isUserAdmin = request.userAdmin;

if (!isUserAdmin) {
        return response.status(401).json({ error: 'Você não tem permissão para acessar este recurso!' });
    }

        return next();
    
};

export default adminMiddleware;
