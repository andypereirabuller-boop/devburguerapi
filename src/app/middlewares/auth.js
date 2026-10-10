import jwt from "jsonwebtoken";
import authConfig from '../../config/auth.js';

const authMiddleware = (request, response, next) => {
    // 1. Tenta o header padrão 'Authorization' (recomendado) ou 'authtoken' (retrocompatibilidade)
    const authHeader = request.headers.authorization || request.headers.authtoken;

    if (!authHeader) {
        return response.status(401).json({ error: 'Token não fornecido' });
    }

    // 2. Extrai o token: aceita tanto "Bearer <token>" quanto apenas o token puro
    const [scheme, tokenFromHeader] = authHeader.split(' ');

    // Se vier com "Bearer <token>", usa a segunda parte; senão usa o valor inteiro
    const token = tokenFromHeader || scheme || '';

    try {
        // 3. Verifica a validade do token de forma síncrona
        const decoded = jwt.verify(token.trim(), authConfig.secret);

        // 4. Injeta os dados do usuário decodificados na requisição
        request.userId = decoded.id;
        request.userName = decoded.name;
        request.userAdmin = decoded.admin;

        // 5. Libera a continuação apenas com token válido
        return next();
    } catch (_error) {

        

        return response.status(401).json({ error: 'Token inválido' });
    }
};

export default authMiddleware;
